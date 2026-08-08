import { useMemo } from "react";
import styles from "./Testimonials.module.css";
import { Container } from "../../components/Container";
import { SectionHeading } from "../../components/SectionHeading";
import { AnimatedButton } from "../../components/AnimatedButton";
import { AnimatedCard } from "../../components/AnimatedCard";
import { ReviewCard } from "../../components/ReviewCard/ReviewCard";
import { useGoogleReviews } from "../../hooks/useGoogleReviews";
import { contactInfo } from "../../data/contactInfo";

const SKELETON_COUNT = 3;

export function Testimonials() {
  const { status, reviews, errorMessage } = useGoogleReviews();

  // useMemo evita recriar o array de placeholders a cada renderização
  // do componente (ex.: quando o estado de outro hook mudar no futuro).
  const skeletonItems = useMemo(() => Array.from({ length: SKELETON_COUNT }, (_, i) => i), []);

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <Container>
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Depoimentos"
          title="O que dizem no Google"
          lead="Avaliações reais de pacientes, publicadas automaticamente a partir do perfil da clínica no Google."
        />

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
          <p className={styles.stateMessage} role="alert">
            {errorMessage ?? "Não foi possível carregar as avaliações do Google no momento."}
          </p>
        )}

        {status === "success" && reviews.length === 0 && (
          <p className={styles.stateMessage}>
            Ainda não há avaliações públicas de 4 ou 5 estrelas para exibir aqui.
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
        </div>
      </Container>
    </section>
  );
}
