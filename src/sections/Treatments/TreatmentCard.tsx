import styles from "./TreatmentCard.module.css";
import { Icon } from "../../components/Icon";
import { hoverIcon } from "../../animations/motion";
import { buildWhatsappLink } from "../../utils/whatsapp";
import { contactInfo } from "../../data/contactInfo";
import type { Treatment } from "../../types/treatment";

export interface TreatmentCardProps {
  treatment: Treatment;
}

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  const message = `Olá, Dra. Caroline! Encontrei o consultório pelo site e gostaria de saber mais sobre: ${treatment.name}.`;
  const whatsappLink = buildWhatsappLink(contactInfo.whatsappNumber, message);

  return (
    <article className={styles.card}>
      <span className={styles.iconWrapper}>
        <Icon name={treatment.icon} size={26} />
      </span>
      <h3 className={styles.name}>{treatment.name}</h3>
      <p className={styles.description}>{treatment.description}</p>
      <a
        className={styles.link}
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${treatment.ctaLabel}: ${treatment.name}`}
      >
        {treatment.ctaLabel}
        <Icon name="arrowRight" size={16} className={hoverIcon} />
      </a>
    </article>
  );
}
