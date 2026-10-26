import styles from "./Contact.module.css";
import { Container } from "../../components/Container";
import { SectionHeading } from "../../components/SectionHeading";
import { AnimatedSection } from "../../components/AnimatedSection";
import { Icon } from "../../components/Icon";
import { ContactForm } from "./ContactForm";
import { contactInfo } from "../../data/contactInfo";

// Horários ainda marcados como "A confirmar" em contactInfo não são
// exibidos ao visitante: a linha volta a aparecer assim que o horário
// real for preenchido.
const confirmedOpeningHours = contactInfo.openingHours.filter(
  (entry) => !/a confirmar/i.test(entry.hours),
);

export function Contact() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-heading">
      <Container>
        {/* on-surface só no que fica direto sobre o fundo azul-acinzentado;
            o formulário é branco e mantém as cores normais de texto. */}
        <div className="on-surface">
          <SectionHeading
            id="contact-heading"
            eyebrow="Contato"
            title="Vamos agendar sua avaliação?"
            lead="Preencha os campos e a mensagem chega pronta no WhatsApp do consultório. Se preferir, ligue ou envie mensagem direto pelo número abaixo."
          />
        </div>

        <div className={styles.grid}>
          {/* fadeLeft: esta coluna é lida da esquerda para a direita em
              relação ao formulário ao lado — o pequeno deslocamento reforça
              essa ordem de leitura sem ser perceptível como "efeito". */}
          <AnimatedSection as="ul" variant="fadeLeft" className={`${styles.infoList} on-surface`}>
            <li className={styles.infoItem}>
              <span className={styles.infoIcon}>
                <Icon name="whatsapp" size={20} />
              </span>
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
              <span className={styles.infoIcon}>
                <Icon name="location" size={20} />
              </span>
              <div>
                <span className={styles.infoLabel}>Endereço</span>
                <span className={styles.infoValue}>{contactInfo.fullAddress}</span>
              </div>
            </li>

            {confirmedOpeningHours.length > 0 && (
              <li className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <Icon name="clock" size={20} />
                </span>
                <div>
                  <span className={styles.infoLabel}>Horário de atendimento</span>
                  <div className={styles.hoursList}>
                    {confirmedOpeningHours.map((entry) => (
                      <span className={styles.infoValue} key={entry.label}>
                        {entry.label}: {entry.hours}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            )}

            {contactInfo.instagramHandle && (
              <li className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <Icon name="instagram" size={20} />
                </span>
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
