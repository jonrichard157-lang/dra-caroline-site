import styles from "./TrustHighlights.module.css";
import { Container } from "../../components/Container";
import { AnimatedCard } from "../../components/AnimatedCard";
import { Icon } from "../../components/Icon";
import { trustHighlights } from "../../data/trustHighlights";

export function TrustHighlights() {
  return (
    <section className={styles.section} aria-label="Diferenciais de confiança">
      <Container>
        <ul className={styles.grid}>
          {trustHighlights.map((item, index) => (
            // hover={false}: são selos informativos, não clicáveis — a
            // elevação de hover sugeriria uma interação que não existe.
            <AnimatedCard key={item.id} as="li" index={index} hover={false} className={styles.item}>
              <span className={styles.iconWrapper}>
                <Icon name={item.icon} size={22} />
              </span>
              <span className={styles.label}>{item.label}</span>
            </AnimatedCard>
          ))}
        </ul>
      </Container>
    </section>
  );
}
