/**
 * Representa uma avaliação do Google já normalizada para o formato que o
 * frontend consome. O mapeamento do formato bruto da Google Places API
 * para este formato acontece inteiramente no backend (api/reviews.ts),
 * então o frontend nunca precisa conhecer os detalhes da API do Google.
 */
export interface GoogleReview {
  /** Identificador estável usado como `key` nas listas (derivado do autor + data). */
  id: string;
  /** Nome do autor da avaliação. Fallback: "Paciente do Google". */
  authorName: string;
  /** URL da foto de perfil do autor. Pode ser `null` (nem toda avaliação tem foto). */
  authorPhotoUrl: string | null;
  /** Nota de 1 a 5. A API já entrega somente notas 4 e 5 (ver filtragem no backend). */
  rating: number;
  /** Texto da avaliação. Pode ser `null` quando o autor não escreveu comentário. */
  text: string | null;
  /** Data de publicação em ISO 8601, conforme devolvida pela Google. */
  publishTime: string;
  /** Descrição relativa já traduzida pelo Google (ex.: "há 2 meses"), quando disponível. */
  relativeTime: string | null;
}

/** Metadados adicionais devolvidos junto das avaliações. */
export interface GoogleReviewsMeta {
  /** Nota média do perfil no Google (não apenas das avaliações filtradas). */
  overallRating: number | null;
  /** Total de avaliações do perfil no Google (não apenas das avaliações filtradas). */
  totalReviewCount: number | null;
  /** Se a resposta veio do cache ou de uma chamada nova à API do Google. */
  source: "cache" | "google";
  /** Instante (ISO 8601) em que os dados foram buscados na Google pela última vez. */
  fetchedAt: string;
}

/** Formato de sucesso devolvido por GET /api/reviews. */
export interface GoogleReviewsResponse {
  reviews: GoogleReview[];
  meta: GoogleReviewsMeta;
}

/** Formato de erro devolvido por GET /api/reviews. */
export interface GoogleReviewsErrorResponse {
  error: string;
}
