import type { GoogleReviewsErrorResponse, GoogleReviewsResponse } from "../types/review";

/**
 * Busca as avaliações do Google já filtradas e cacheadas, consumindo
 * exclusivamente a API serverless `/api/reviews`. Este serviço nunca
 * fala diretamente com a Google — a key da Places API existe apenas no
 * servidor (ver api/reviews.ts).
 */
export async function fetchGoogleReviews(signal?: AbortSignal): Promise<GoogleReviewsResponse> {
  const response = await fetch("/api/reviews", {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as GoogleReviewsErrorResponse | null;
    throw new Error(body?.error || "Não foi possível carregar as avaliações do Google.");
  }

  return (await response.json()) as GoogleReviewsResponse;
}
