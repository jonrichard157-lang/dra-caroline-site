import type { GoogleReviewsErrorResponse, GoogleReviewsResponse } from "../types/review";

/**
 * Busca as avaliações do Google já filtradas e cacheadas, consumindo
 * exclusivamente a API serverless `/api/reviews`. Este serviço nunca
 * fala diretamente com a Google — a key da Places API existe apenas no
 * servidor (ver api/reviews.ts).
 *
 * A requisição é compartilhada: o Início (nota média) e a seção de
 * Depoimentos (cards) usam os mesmos dados, então a página faz uma única
 * chamada, não importa quantos componentes peçam as avaliações. Em caso
 * de erro a promise é descartada, permitindo uma nova tentativa depois.
 */
let pendingRequest: Promise<GoogleReviewsResponse> | null = null;

async function requestGoogleReviews(): Promise<GoogleReviewsResponse> {
  const response = await fetch("/api/reviews", {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as GoogleReviewsErrorResponse | null;
    throw new Error(body?.error || "Não foi possível carregar as avaliações do Google.");
  }

  return (await response.json()) as GoogleReviewsResponse;
}

export function fetchGoogleReviews(): Promise<GoogleReviewsResponse> {
  if (!pendingRequest) {
    pendingRequest = requestGoogleReviews().catch((error: unknown) => {
      pendingRequest = null;
      throw error;
    });
  }
  return pendingRequest;
}
