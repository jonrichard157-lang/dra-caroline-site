import { memo, useMemo, useState } from "react";
import styles from "./ReviewCard.module.css";
import { Icon } from "../Icon";
import type { GoogleReview } from "../../types/review";

export interface ReviewCardProps {
  review: GoogleReview;
}

const MAX_STARS = 5;

/** Gera as iniciais do nome do autor para o avatar de fallback (ex.: "Maria Silva" -> "MS"). */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0]![0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]![0] ?? "" : "";
  return (first + last).toUpperCase();
}

/** Formata a data de publicação em português, com fallback quando ausente/ inválida. */
function formatPublishDate(publishTime: string, relativeTime: string | null): string {
  if (relativeTime) return relativeTime;

  const date = new Date(publishTime);
  if (Number.isNaN(date.getTime())) return "Data não informada";

  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(date);
}

/**
 * Card individual de avaliação do Google.
 * Componentizado com `React.memo` porque a lista de avaliações é
 * renderizada em grade e os dados de cada card são estáveis após o
 * carregamento — evita recomparações desnecessárias de subárvore.
 */
export const ReviewCard = memo(function ReviewCard({ review }: ReviewCardProps) {
  const [photoFailed, setPhotoFailed] = useState(false);

  const authorName = review.authorName || "Paciente do Google";
  const initials = useMemo(() => getInitials(authorName), [authorName]);
  const formattedDate = useMemo(
    () => formatPublishDate(review.publishTime, review.relativeTime),
    [review.publishTime, review.relativeTime],
  );
  const showPhoto = Boolean(review.authorPhotoUrl) && !photoFailed;

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        {showPhoto ? (
          <img
            className={styles.avatar}
            src={review.authorPhotoUrl ?? undefined}
            alt=""
            loading="lazy"
            width={48}
            height={48}
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          <span className={styles.avatarFallback} aria-hidden="true">
            {initials}
          </span>
        )}

        <div className={styles.identity}>
          <span className={styles.authorName}>{authorName}</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>
      </header>

      <div
        className={styles.stars}
        role="img"
        aria-label={`Avaliação de ${review.rating} de ${MAX_STARS} estrelas`}
      >
        {Array.from({ length: MAX_STARS }, (_, index) => (
          <Icon
            key={index}
            name="star"
            size={16}
            className={index < review.rating ? styles.starFilled : styles.starEmpty}
          />
        ))}
      </div>

      <p className={styles.text}>
        {review.text || <span className={styles.textFallback}>Avaliação sem comentário escrito.</span>}
      </p>
    </article>
  );
});
