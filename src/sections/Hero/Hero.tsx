import styles from "./Hero.module.css";
import { Container } from "../../components/Container";
import { AnimatedButton } from "../../components/AnimatedButton";
import { SmileArc } from "../../components/SmileArc";
import { FramedPhoto } from "../../components/FramedPhoto";
import { heroImage } from "../../data/images";
import { contactInfo, whatsappDefaultMessage } from "../../data/contactInfo";
import { buildWhatsappLink } from "../../utils/whatsapp";

export function Hero() {
  const whatsappLink = buildWhatsappLink(contactInfo.whatsappNumber, whatsappDefaultMessage);

  return (
    <section className={styles.hero} id="home">
      <Container>
        <div className={styles.grid}>
          <div className={styles.content} data-hero-enter>
            <span className={styles.eyebrow}>Dentista em Mairinque</span>
            <h1 className={styles.title}>Seu sorriso merece cuidado, atenção e confiança.</h1>
            <SmileArc className={styles.arc} />
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
              <AnimatedButton href="#treatments" variant="secondary" icon="arrowRight">
                Conhecer tratamentos
              </AnimatedButton>
            </div>
          </div>

          <div className={styles.imageColumn} data-hero-enter-delayed>
            {/* CONFIRMAR: substituir por uma fotografia profissional definitiva, se necessário */}
            <FramedPhoto image={heroImage} priority />
          </div>
        </div>
      </Container>
    </section>
  );
}
