import { useState } from "react";
import styles from "./Footer.module.css";
import { Container } from "../../components/Container";
import { AnimatedSection } from "../../components/AnimatedSection";
import { Modal } from "../../components/Modal";
import { navLinks } from "../../data/navigation";
import { contactInfo } from "../../data/contactInfo";
import { privacyPolicyParagraphs } from "../../data/privacyPolicy";

export function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        {/* fadeIn: o rodapé é conteúdo de referência (endereço, links,
            institucional) — o objetivo é só suavizar a chegada, sem chamar
            atenção para si com um deslocamento, já que não é uma seção que
            "vende" nada. */}
        <AnimatedSection as="div" variant="fadeIn" className={styles.grid}>
          <div>
            <p className={styles.brandName}>{contactInfo.professionalName}</p>
            <p className={styles.croLine}>{contactInfo.croNumber}</p>
            <p className={styles.addressLine}>{contactInfo.street}</p>
            <p className={styles.addressLine}>
              {contactInfo.neighborhood} – {contactInfo.city}/SP
            </p>
            <a className={styles.phoneLink} href={`tel:+${contactInfo.whatsappNumber}`}>
              {contactInfo.phoneDisplay}
            </a>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className={styles.heading}>Navegação</p>
            <ul className={styles.linkList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a className={styles.link} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={styles.heading}>Institucional</p>
            <ul className={styles.linkList}>
              <li>
                <button
                  type="button"
                  className={styles.linkButton}
                  onClick={() => setIsPrivacyOpen(true)}
                >
                  Política de privacidade
                </button>
              </li>
              <li>
                <a
                  className={styles.link}
                  href={contactInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver no Google Maps
                </a>
              </li>
            </ul>
          </div>
        </AnimatedSection>

        <div className={styles.bottomRow}>
          <span>
            © {currentYear} {contactInfo.professionalName}. Todos os direitos reservados.
          </span>
          {/* Crédito de desenvolvimento: adicione aqui um <span className={styles.credit}>
              quando houver um texto definitivo (o placeholder ficava visível no site). */}
        </div>
      </Container>

      <Modal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="Política de privacidade"
      >
        {privacyPolicyParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Modal>
    </footer>
  );
}
