import styles from "./Hero.module.css";
import { Container } from "../../components/Container";
import { AnimatedButton } from "../../components/AnimatedButton";
import { FramedPhoto } from "../../components/FramedPhoto";
import { Icon } from "../../components/Icon";
import { heroImage } from "../../data/images";
import { contactInfo, whatsappDefaultMessage } from "../../data/contactInfo";
import { buildWhatsappLink } from "../../utils/whatsapp";
import { useGoogleReviews } from "../../hooks/useGoogleReviews";
import { parallaxSoft } from "../../animations/motion";

const ratingFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function Hero() {
  const whatsappLink = buildWhatsappLink(contactInfo.whatsappNumber, whatsappDefaultMessage);
  // Mesma requisição usada pela seção de Depoimentos (compartilhada no serviço).
  const { status, meta } = useGoogleReviews();
  const hasRating =
    status === "success" && meta?.overallRating != null && (meta.totalReviewCount ?? 0) > 0;

  return (
    <section className={`${styles.hero} on-surface`} id="home">
      <Container>
        <div className={styles.grid}>
          <div className={styles.content} data-hero-enter>
            <p className={styles.location}>
              <Icon name="location" size={18} />
              Consultório no Centro de {contactInfo.city}
            </p>
            <h1 className={styles.title}>Seu sorriso merece cuidado, atenção e confiança.</h1>
            <p className={styles.lead}>
              Tratamentos odontológicos realizados com atendimento humanizado, planejamento
              individual e cuidado em todas as etapas.
            </p>

            <div className={styles.actions}>
              <AnimatedButton
                href={whatsappLink}
                variant="whatsapp"
                icon="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar pelo WhatsApp
              </AnimatedButton>
              <AnimatedButton href="#treatments" variant="secondary">
                Conhecer tratamentos
              </AnimatedButton>
            </div>

            {/* Altura reservada desde o primeiro render: a nota chega da API
                depois, e o bloco não pode empurrar o layout (CLS). */}
            <div className={styles.proof}>
              {hasRating && meta && (
                <a
                  className={styles.rating}
                  href={contactInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.ratingValue}>
                    {ratingFormatter.format(meta.overallRating ?? 0)}
                  </span>
                  <span className={styles.ratingDetails}>
                    <span
                      className={styles.stars}
                      role="img"
                      aria-label={`Nota ${ratingFormatter.format(meta.overallRating ?? 0)} de 5`}
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <Icon
                          key={index}
                          name="star"
                          size={14}
                          className={
                            index < Math.round(meta.overallRating ?? 0)
                              ? styles.starFilled
                              : styles.starEmpty
                          }
                        />
                      ))}
                    </span>
                    <span className={styles.ratingCount}>
                      {meta.totalReviewCount}{" "}
                      {meta.totalReviewCount === 1 ? "avaliação" : "avaliações"} no Google
                    </span>
                  </span>
                </a>
              )}
              <div className={styles.credential}>
                <span className={styles.credentialValue}>{contactInfo.croNumber}</span>
                <span className={styles.credentialLabel}>{contactInfo.professionalTitle}</span>
              </div>
            </div>
          </div>

          <div className={styles.imageColumn} data-hero-enter-delayed>
            {/* CONFIRMAR: substituir por uma fotografia profissional definitiva, se necessário */}
            <FramedPhoto image={heroImage} priority aspectRatio="4 / 5" className={parallaxSoft} />
          </div>
        </div>
      </Container>
    </section>
  );
}
