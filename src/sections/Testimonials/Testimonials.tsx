import { useEffect, useMemo } from "react";
import styles from "./Testimonials.module.css";
import { Container } from "../../components/Container";
import { SectionHeading } from "../../components/SectionHeading";
import { AnimatedButton } from "../../components/AnimatedButton";
import { AnimatedCard } from "../../components/AnimatedCard";
import { Icon } from "../../components/Icon";
import { ReviewCard } from "../../components/ReviewCard/ReviewCard";
import { useGoogleReviews } from "../../hooks/useGoogleReviews";
import { contactInfo } from "../../data/contactInfo";

const SKELETON_COUNT = 3;

const ratingFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function Testimonials() {
  const { status, reviews, meta, errorMessage } = useGoogleReviews();

  // useMemo evita recriar o array de placeholders a cada renderização
  // do componente (ex.: quando o estado de outro hook mudar no futuro).
  const skeletonItems = useMemo(() => Array.from({ length: SKELETON_COUNT }, (_, i) => i), []);

  // O detalhe técnico do erro vai para o console (útil para quem mantém o
  // site); o visitante recebe só uma orientação do que fazer.
  useEffect(() => {
    if (status === "error" && errorMessage) console.warn("[Depoimentos]", errorMessage);
  }, [status, errorMessage]);

  const hasSummary =
    status === "success" && meta?.overallRating != null && (meta.totalReviewCount ?? 0) > 0;

  return (
    <section className={styles.section} id="testimonials" aria-labelledby="testimonials-heading">
      <Container>
        <div className={styles.top}>
          <SectionHeading
            id="testimonials-heading"
            eyebrow="Depoimentos"
            title="O que dizem no Google"
            lead="Avaliações reais de pacientes, publicadas automaticamente a partir do perfil do consultório no Google."
          />

          {hasSummary && meta && (
            <div className={styles.summary}>
              <span className={styles.summaryValue}>
                {ratingFormatter.format(meta.overallRating ?? 0)}
              </span>
              <div className={styles.summaryDetails}>
                <span
                  className={styles.summaryStars}
                  role="img"
                  aria-label={`Nota média ${ratingFormatter.format(meta.overallRating ?? 0)} de 5`}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <Icon
                      key={index}
                      name="star"
                      size={18}
                      className={
                        index < Math.round(meta.overallRating ?? 0)
                          ? styles.starFilled
                          : styles.starEmpty
                      }
                    />
                  ))}
                </span>
                <span className={styles.summaryCount}>
                  Média de {meta.totalReviewCount}{" "}
                  {meta.totalReviewCount === 1 ? "avaliação" : "avaliações"} no Google
                </span>
              </div>
            </div>
          )}
        </div>

        {status === "loading" && (
          <div className={styles.grid} aria-hidden="true">
            {skeletonItems.map((i) => (
              <div className={styles.skeletonCard} key={i}>
                <div className={styles.skeletonHeader}>
                  <div className={styles.skeletonAvatar} />
                  <div className={styles.skeletonLines}>
                    <div className={styles.skeletonLine} style={{ width: "60%" }} />
                    <div className={styles.skeletonLine} style={{ width: "40%" }} />
                  </div>
                </div>
                <div className={styles.skeletonLine} style={{ width: "90%" }} />
                <div className={styles.skeletonLine} style={{ width: "75%" }} />
              </div>
            ))}
            <span className="visually-hidden">Carregando avaliações do Google…</span>
          </div>
        )}

        {status === "error" && (
          <p className={styles.stateMessage} role="status">
            As avaliações não puderam ser carregadas agora. Você pode lê-las diretamente no perfil
            do consultório no Google, pelo botão abaixo.
          </p>
        )}

        {status === "success" && reviews.length === 0 && (
          <p className={styles.stateMessage}>
            As avaliações mais recentes estão no perfil do consultório no Google, pelo botão abaixo.
          </p>
        )}

        {status === "success" && reviews.length > 0 && (
          <div className={styles.grid}>
            {reviews.map((review, index) => (
              // hover={false}: o ReviewCard já tem sua própria microinteração
              // de hover (ver ReviewCard.module.css); duplicar aqui somaria
              // dois efeitos de elevação no mesmo card.
              <AnimatedCard key={review.id} index={index} hover={false}>
                <ReviewCard review={review} />
              </AnimatedCard>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <AnimatedButton
            variant="secondary"
            icon="arrowRight"
            href={contactInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver todas as avaliações no Google
          </AnimatedButton>
          <p className={styles.attribution}>Avaliações e fotos de perfil fornecidas pelo Google.</p>
        </div>
      </Container>
    </section>
  );
}
