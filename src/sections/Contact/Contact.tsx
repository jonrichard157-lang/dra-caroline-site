import styles from "./Contact.module.css";
import { Container } from "../../components/Container";
import { SectionHeading } from "../../components/SectionHeading";
import { AnimatedSection } from "../../components/AnimatedSection";
import { Icon } from "../../components/Icon";
import { ContactForm } from "./ContactForm";
import { contactInfo } from "../../data/contactInfo";

export function Contact() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-heading">
      <Container>
        <SectionHeading
          id="contact-heading"
          eyebrow="Contato"
          title="Vamos agendar sua avaliação?"
        />

        <div className={styles.grid}>
          {/* fadeLeft: esta coluna é lida da esquerda para a direita em
              relação ao formulário ao lado — o pequeno deslocamento reforça
              essa ordem de leitura sem ser perceptível como "efeito". */}
          <AnimatedSection as="ul" variant="fadeLeft" className={styles.infoList}>
            <li className={styles.infoItem}>
              <Icon name="whatsapp" size={20} className={styles.infoIcon} />
              <div>
                <span className={styles.infoLabel}>WhatsApp / Telefone</span>
                <a
                  className={`${styles.infoValue} ${styles.infoLink}`}
                  href={`tel:+${contactInfo.whatsappNumber}`}
                >
                  {contactInfo.phoneDisplay}
                </a>
              </div>
            </li>

            <li className={styles.infoItem}>
              <Icon name="location" size={20} className={styles.infoIcon} />
              <div>
                <span className={styles.infoLabel}>Endereço</span>
                <span className={styles.infoValue}>{contactInfo.fullAddress}</span>
              </div>
            </li>

            <li className={styles.infoItem}>
              <Icon name="clock" size={20} className={styles.infoIcon} />
              <div>
                <span className={styles.infoLabel}>Horário de atendimento</span>
                <div className={styles.hoursList}>
                  {contactInfo.openingHours.map((entry) => (
                    <span className={styles.infoValue} key={entry.label}>
                      {entry.label}: {entry.hours}
                    </span>
                  ))}
                </div>
              </div>
            </li>

            {contactInfo.instagramHandle && (
              <li className={styles.infoItem}>
                <Icon name="instagram" size={20} className={styles.infoIcon} />
                <div>
                  <span className={styles.infoLabel}>Instagram</span>
                  <a
                    className={`${styles.infoValue} ${styles.infoLink}`}
                    href={`https://instagram.com/${contactInfo.instagramHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{contactInfo.instagramHandle}
                  </a>
                </div>
              </li>
            )}
          </AnimatedSection>

          <AnimatedSection as="div" variant="fadeIn">
            <ContactForm />
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
