import { useEffect, useState } from "react";
import { fetchGoogleReviews } from "../services/googleReviews";
import type { GoogleReview, GoogleReviewsMeta } from "../types/review";

type Status = "loading" | "success" | "error";

interface UseGoogleReviewsResult {
  status: Status;
  reviews: GoogleReview[];
  meta: GoogleReviewsMeta | null;
  errorMessage: string | null;
}

/**
 * Busca as avaliações do Google uma vez ao montar o componente.
 * Toda a lógica de cache (24h) já acontece no backend (`/api/reviews`);
 * este hook só administra o estado de carregamento/erro no cliente.
 */
export function useGoogleReviews(): UseGoogleReviewsResult {
  const [status, setStatus] = useState<Status>("loading");
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [meta, setMeta] = useState<GoogleReviewsMeta | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setStatus("loading");
      try {
        const data = await fetchGoogleReviews(controller.signal);
        setReviews(data.reviews);
        setMeta(data.meta);
        setStatus("success");
      } catch (error) {
        if (controller.signal.aborted) return;
        setErrorMessage(
          error instanceof Error ? error.message : "Não foi possível carregar as avaliações.",
        );
        setStatus("error");
      }
    }

    load();

    return () => controller.abort();
  }, []);

  return { status, reviews, meta, errorMessage };
}
