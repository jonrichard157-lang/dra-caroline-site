import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";
import { SmileArc } from "./SmileArc";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  centered?: boolean;
  id?: string;
}

export function SectionHeading({ eyebrow, title, lead, centered, id }: SectionHeadingProps) {
  const classNames = [styles.heading, centered ? styles.centered : ""].filter(Boolean).join(" ");

  return (
    <div className={classNames}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title} id={id}>
        {title}
      </h2>
      <SmileArc className={styles.arc} align={centered ? "center" : "left"} />
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}
