import styles from "./FAQ.module.css";
import { Container } from "../../components/Container";
import { SectionHeading } from "../../components/SectionHeading";
import { AnimatedSection } from "../../components/AnimatedSection";
import { AccordionItem } from "../../components/Accordion";
import { faqs } from "../../data/faqs";

export function FAQ() {
  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <Container>
        <SectionHeading id="faq-heading" eyebrow="Dúvidas frequentes" title="Perguntas frequentes" />

        {/* fadeIn puro (sem translateY): é uma lista densa de texto que já
            abre/fecha ao clique — um deslocamento na entrada, somado à
            abertura do acordeon, acumularia movimento demais na mesma área. */}
        <AnimatedSection as="div" variant="fadeIn" className={styles.list}>
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
