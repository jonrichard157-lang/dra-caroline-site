import styles from "./Accordion.module.css";
import { Icon } from "./Icon";

export interface AccordionItemProps {
  question: string;
  answer: string;
}

export function AccordionItem({ question, answer }: AccordionItemProps) {
  return (
    <details className={styles.item}>
      <summary className={styles.summary}>
        <span>{question}</span>
        <Icon name="chevronDown" className={styles.icon} size={20} />
      </summary>
      <p className={styles.content}>{answer}</p>
    </details>
  );
}
