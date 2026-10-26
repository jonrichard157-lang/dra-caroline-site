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
 * Vários componentes podem usar o hook ao mesmo tempo: o serviço
 * reaproveita a mesma requisição (ver services/googleReviews.ts).
 */
export function useGoogleReviews(): UseGoogleReviewsResult {
  const [status, setStatus] = useState<Status>("loading");
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [meta, setMeta] = useState<GoogleReviewsMeta | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // A requisição é compartilhada, então não a cancelamos ao desmontar;
    // apenas ignoramos o resultado se este componente já saiu da tela.
    let isActive = true;

    fetchGoogleReviews()
      .then((data) => {
        if (!isActive) return;
        setReviews(data.reviews);
        setMeta(data.meta);
        setStatus("success");
      })
      .catch((error: unknown) => {
        if (!isActive) return;
        setErrorMessage(
          error instanceof Error ? error.message : "Não foi possível carregar as avaliações.",
        );
        setStatus("error");
      });

    return () => {
      isActive = false;
    };
  }, []);

  return { status, reviews, meta, errorMessage };
}
