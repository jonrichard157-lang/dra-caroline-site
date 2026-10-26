import styles from "./FAQ.module.css";
import { Container } from "../../components/Container";
import { SectionHeading } from "../../components/SectionHeading";
import { AnimatedSection } from "../../components/AnimatedSection";
import { AccordionItem } from "../../components/Accordion";
import { Icon } from "../../components/Icon";
import { faqs } from "../../data/faqs";
import { contactInfo, whatsappDefaultMessage } from "../../data/contactInfo";
import { buildWhatsappLink } from "../../utils/whatsapp";

export function FAQ() {
  const whatsappLink = buildWhatsappLink(contactInfo.whatsappNumber, whatsappDefaultMessage);

  return (
    <section className={`${styles.section} on-surface`} id="faq" aria-labelledby="faq-heading">
      <Container>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <SectionHeading id="faq-heading" eyebrow="Dúvidas frequentes" title="Perguntas frequentes" />
            <p className={styles.help}>
              Não encontrou sua dúvida?{" "}
              <a className={styles.helpLink} href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={18} />
                Pergunte pelo WhatsApp
              </a>
            </p>
          </div>

          {/* fadeIn puro (sem translateY): é uma lista densa de texto que já
              abre/fecha ao clique — um deslocamento na entrada, somado à
              abertura do acordeon, acumularia movimento demais na mesma área. */}
          <AnimatedSection as="div" variant="fadeIn" className={styles.list}>
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
