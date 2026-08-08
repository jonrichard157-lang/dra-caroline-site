import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * GET /api/reviews
 * ------------------------------------------------------------------------
 * Busca as avaliações do Google Business Profile da clínica usando a
 * Google Places API (New) — endpoint "Place Details" — e devolve apenas
 * os campos necessários para os cards de avaliação, já filtrados (4-5
 * estrelas) e cacheados por 24h.
 *
 * Por que uma função serverless e não uma chamada direta do frontend?
 * A Google exige uma API Key para a Places API. Se essa chamada fosse
 * feita no navegador, a key ficaria visível no código-fonte da página e
 * qualquer pessoa poderia copiá-la e usá-la em outro lugar, gerando
 * custos indevidos na conta do Google Cloud. Por isso a key só existe
 * aqui, no servidor, lida via variável de ambiente.
 *
 * Estratégia de cache (ambiente serverless):
 * 1) Cache em memória do processo (melhor esforço): quando a mesma
 *    instância da função atende múltiplas requisições ("instância
 *    quente"), reaproveitamos o resultado sem nenhuma chamada de rede.
 *    Isso NÃO é garantido entre requisições (cold starts criam
 *    instâncias novas e sem esse cache).
 * 2) Cache durável (recomendado): Upstash Redis via REST API, que
 *    funciona bem em ambiente serverless (sem conexões persistentes).
 *    Ative configurando UPSTASH_REDIS_REST_URL e
 *    UPSTASH_REDIS_REST_TOKEN nas variáveis de ambiente da Vercel — o
 *    projeto free tier da Upstash é suficiente para este uso.
 * 3) Fallback (sem Upstash configurado): cabeçalhos de cache HTTP
 *    (`Cache-Control: s-maxage=...`). A CDN da Vercel armazena a
 *    resposta desta função por até 24h e serve as próximas requisições
 *    direto da borda, sem executar a função novamente. Limitação: esse
 *    cache é por rota/CDN e pode ser invalidado em novos deploys, então
 *    o Upstash é a opção mais previsível em produção.
 */

const GOOGLE_PLACES_ENDPOINT = "https://places.googleapis.com/v1/places";
const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24 horas
const CACHE_KEY = "google-reviews:v1";

// Campos pedidos à Google. Manter essa lista enxuta é a principal forma
// de reduzir custo por chamada (a Places API cobra por "field mask").
const FIELD_MASK = [
  "id",
  "displayName",
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "reviews.rating",
  "reviews.text",
  "reviews.authorAttribution",
  "reviews.publishTime",
  "reviews.relativePublishTimeDescription",
].join(",");

interface GoogleReview {
  id: string;
  authorName: string;
  authorPhotoUrl: string | null;
  rating: number;
  text: string | null;
  publishTime: string;
  relativeTime: string | null;
}

interface CachedPayload {
  reviews: GoogleReview[];
  overallRating: number | null;
  totalReviewCount: number | null;
  fetchedAt: string;
}

// Cache best-effort em memória do processo (ver ponto 1 acima).
let memoryCache: CachedPayload | null = null;
let memoryCacheExpiresAt = 0;

/** Formato bruto (parcial) da resposta da Google Places API (New). */
interface GooglePlaceApiResponse {
  rating?: number;
  userRatingCount?: number;
  reviews?: Array<{
    rating?: number;
    text?: { text?: string };
    publishTime?: string;
    relativePublishTimeDescription?: string;
    authorAttribution?: {
      displayName?: string;
      photoUri?: string;
    };
  }>;
}

function readEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

async function readFromUpstash(): Promise<CachedPayload | null> {
  const url = readEnv("UPSTASH_REDIS_REST_URL");
  const token = readEnv("UPSTASH_REDIS_REST_TOKEN");
  if (!url || !token) return null;

  try {
    const response = await fetch(`${url}/get/${CACHE_KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) return null;

    const data = (await response.json()) as { result: string | null };
    if (!data.result) return null;

    return JSON.parse(data.result) as CachedPayload;
  } catch {
    // Falha ao ler o cache não deve derrubar a resposta: apenas seguimos
    // como se não houvesse cache e buscamos direto na Google.
    return null;
  }
}

async function writeToUpstash(payload: CachedPayload): Promise<void> {
  const url = readEnv("UPSTASH_REDIS_REST_URL");
  const token = readEnv("UPSTASH_REDIS_REST_TOKEN");
  if (!url || !token) return;

  try {
    const body = encodeURIComponent(JSON.stringify(payload));
    await fetch(`${url}/set/${CACHE_KEY}/${body}?EX=${CACHE_TTL_SECONDS}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    // Se a escrita no cache falhar, a resposta atual já foi calculada
    // corretamente; apenas a próxima requisição pagará o custo de uma
    // nova chamada à Google. Não é motivo para retornar erro ao cliente.
  }
}

function mapGoogleReview(
  raw: NonNullable<GooglePlaceApiResponse["reviews"]>[number],
  index: number,
): GoogleReview {
  const authorName = raw.authorAttribution?.displayName?.trim() || "Paciente do Google";
  const publishTime = raw.publishTime ?? new Date().toISOString();

  return {
    // Nem sempre há um identificador estável exposto pela API; combinar
    // autor + data + índice é suficiente para uma key de lista estável
    // dentro de uma mesma resposta.
    id: `${authorName}-${publishTime}-${index}`,
    authorName,
    authorPhotoUrl: raw.authorAttribution?.photoUri ?? null,
    rating: raw.rating ?? 0,
    text: raw.text?.text?.trim() || null,
    publishTime,
    relativeTime: raw.relativePublishTimeDescription ?? null,
  };
}

async function fetchFromGoogle(apiKey: string, placeId: string): Promise<CachedPayload> {
  const url = `${GOOGLE_PLACES_ENDPOINT}/${placeId}?languageCode=pt-BR`;

  const response = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
  });

  if (!response.ok) {
    // Não repassamos o corpo do erro da Google ao cliente: ele pode
    // conter detalhes internos (e nunca deve conter a key, mas por
    // segurança preferimos controlar exatamente o que vaza para fora).
    const details = await response.text().catch(() => "");
    throw new Error(`Google Places API respondeu ${response.status}: ${details.slice(0, 300)}`);
  }

  const data = (await response.json()) as GooglePlaceApiResponse;

  const reviews = (data.reviews ?? [])
    // Requisito de negócio: só exibir avaliações de 4 ou 5 estrelas.
    .filter((review) => (review.rating ?? 0) >= 4)
    .map(mapGoogleReview);

  return {
    reviews,
    overallRating: data.rating ?? null,
    totalReviewCount: data.userRatingCount ?? null,
    fetchedAt: new Date().toISOString(),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Método não permitido." });
  }

  const apiKey = readEnv("GOOGLE_PLACES_API_KEY");
  const placeId = readEnv("GOOGLE_PLACE_ID");

  if (!apiKey || !placeId) {
    console.error(
      "[/api/reviews] Variáveis de ambiente ausentes: GOOGLE_PLACES_API_KEY e/ou GOOGLE_PLACE_ID.",
    );
    return res.status(500).json({
      error: "Integração com o Google não configurada. Contate o administrador do site.",
    });
  }

  // Cabeçalho de cache para a CDN da Vercel (fallback do item 3 acima).
  // stale-while-revalidate permite servir uma versão levemente
  // desatualizada enquanto uma nova é buscada em segundo plano.
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${CACHE_TTL_SECONDS}, stale-while-revalidate=${CACHE_TTL_SECONDS / 2}`,
  );

  try {
    const now = Date.now();

    // 1) Cache em memória da instância (mais rápido, melhor esforço).
    if (memoryCache && now < memoryCacheExpiresAt) {
      return res.status(200).json({
        reviews: memoryCache.reviews,
        meta: {
          overallRating: memoryCache.overallRating,
          totalReviewCount: memoryCache.totalReviewCount,
          source: "cache",
          fetchedAt: memoryCache.fetchedAt,
        },
      });
    }

    // 2) Cache durável (Upstash), quando configurado.
    const upstashCached = await readFromUpstash();
    if (upstashCached) {
      const age = now - new Date(upstashCached.fetchedAt).getTime();
      if (age < CACHE_TTL_SECONDS * 1000) {
        memoryCache = upstashCached;
        memoryCacheExpiresAt = now + CACHE_TTL_SECONDS * 1000 - age;

        return res.status(200).json({
          reviews: upstashCached.reviews,
          meta: {
            overallRating: upstashCached.overallRating,
            totalReviewCount: upstashCached.totalReviewCount,
            source: "cache",
            fetchedAt: upstashCached.fetchedAt,
          },
        });
      }
    }

    // 3) Cache expirado ou inexistente: busca nova na Google.
    const fresh = await fetchFromGoogle(apiKey, placeId);

    memoryCache = fresh;
    memoryCacheExpiresAt = now + CACHE_TTL_SECONDS * 1000;
    await writeToUpstash(fresh);

    return res.status(200).json({
      reviews: fresh.reviews,
      meta: {
        overallRating: fresh.overallRating,
        totalReviewCount: fresh.totalReviewCount,
        source: "google",
        fetchedAt: fresh.fetchedAt,
      },
    });
  } catch (error) {
    console.error("[/api/reviews] Falha ao buscar avaliações:", error);

    // Se já existir qualquer cache (mesmo vencido), é melhor devolver
    // dados um pouco velhos do que quebrar a seção no site.
    const staleFallback = memoryCache ?? (await readFromUpstash());
    if (staleFallback) {
      return res.status(200).json({
        reviews: staleFallback.reviews,
        meta: {
          overallRating: staleFallback.overallRating,
          totalReviewCount: staleFallback.totalReviewCount,
          source: "cache",
          fetchedAt: staleFallback.fetchedAt,
        },
      });
    }

    return res.status(502).json({ error: "Não foi possível carregar as avaliações do Google agora." });
  }
}
