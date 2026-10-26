import styles from "./HowItWorks.module.css";
import { Container } from "../../components/Container";
import { SectionHeading } from "../../components/SectionHeading";
import { AnimatedSection } from "../../components/AnimatedSection";
import { revealVariants } from "../../animations/motion";
import { processSteps } from "../../data/processSteps";

export function HowItWorks() {
  return (
    <section className={styles.section} aria-labelledby="how-it-works-heading">
      <Container>
        <SectionHeading
          id="how-it-works-heading"
          eyebrow="Como funciona"
          title="Do primeiro contato ao seu plano de tratamento"
        />

        {/* As etapas entram em sequência e a linha entre elas se desenha
            logo depois (ver HowItWorks.module.css): o movimento reforça que
            o conteúdo é um passo a passo. */}
        <AnimatedSection as="ol" stagger className={styles.list}>
          {processSteps.map((step) => (
            <li className={`${styles.step} ${revealVariants.fadeUp}`} key={step.id}>
              <span className={styles.stepNumber} aria-hidden="true">
                {step.order}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </li>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
