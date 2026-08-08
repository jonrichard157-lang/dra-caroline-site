import styles from "./Differentials.module.css";
import { Container } from "../../components/Container";
import { SectionHeading } from "../../components/SectionHeading";
import { AnimatedCard } from "../../components/AnimatedCard";
import { Icon } from "../../components/Icon";
import { differentials } from "../../data/differentials";

export function Differentials() {
  return (
    <section className={styles.section} id="differentials" aria-labelledby="differentials-heading">
      <Container>
        <SectionHeading
          id="differentials-heading"
          eyebrow="Diferenciais"
          title="O que torna o atendimento diferente"
        />

        <ul className={styles.grid}>
          {differentials.map((item, index) => (
            <AnimatedCard key={item.id} as="li" index={index} className={styles.item}>
              <span className={styles.iconWrapper}>
                <Icon name={item.icon} size={20} />
              </span>
              <span className={styles.label}>{item.label}</span>
            </AnimatedCard>
          ))}
        </ul>
      </Container>
    </section>
  );
}
