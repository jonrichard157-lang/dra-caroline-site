import styles from "./HowItWorks.module.css";
import { Container } from "../../components/Container";
import { SectionHeading } from "../../components/SectionHeading";
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

        <ol className={styles.list}>
          {processSteps.map((step) => (
            <li className={styles.step} key={step.id}>
              <span className={styles.stepNumber} aria-hidden="true">
                {String(step.order).padStart(2, "0")}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
