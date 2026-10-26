import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";
import { SmileArc } from "./SmileArc";
import { useReveal } from "../hooks/useReveal";
import { sectionReveal } from "../animations/motion";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  centered?: boolean;
  /** "dark" para seções com fundo azul: inverte as cores do texto. */
  tone?: "light" | "dark";
  id?: string;
}

export function SectionHeading({ eyebrow, title, lead, centered, tone = "light", id }: SectionHeadingProps) {
  // Todo título de seção entra ao chegar na tela: é o primeiro elemento
  // de cada bloco, então a entrada marca o início de uma nova seção.
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const classNames = [
    styles.heading,
    centered ? styles.centered : "",
    tone === "dark" ? styles.dark : "",
    sectionReveal,
    isVisible ? "is-visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} ref={ref}>
      {eyebrow && (
        <span className={styles.eyebrow}>
          <SmileArc className={styles.arc} />
          {eyebrow}
        </span>
      )}
      <h2 className={styles.title} id={id}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}
