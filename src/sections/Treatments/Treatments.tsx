import styles from "./Treatments.module.css";
import { Container } from "../../components/Container";
import { SectionHeading } from "../../components/SectionHeading";
import { AnimatedCard } from "../../components/AnimatedCard";
import { TreatmentCard } from "./TreatmentCard";
import { treatments } from "../../data/treatments";

export function Treatments() {
  return (
    <section className={styles.section} id="treatments" aria-labelledby="treatments-heading">
      <Container>
        <SectionHeading
          id="treatments-heading"
          eyebrow="Tratamentos"
          title="Cuidados pensados para cada etapa do seu sorriso"
          lead="Conheça os tratamentos oferecidos. Qualquer dúvida específica pode ser esclarecida diretamente pelo WhatsApp."
        />

        <div className={styles.grid}>
          {treatments.map((treatment, index) => (
            // hover={false}: a linha do tratamento responde ao mouse pelo
            // ícone (ver TreatmentCard.module.css), sem elevar o bloco.
            <AnimatedCard key={treatment.id} index={index % 2} hover={false}>
              {/* AnimatedCard renderiza uma <div> por padrão: o próprio
                  TreatmentCard já é um <article>, evitando duplicar
                  semântica. Como grid stretches por padrão, a altura 100%
                  do card original continua funcionando através do wrapper. */}
              <TreatmentCard treatment={treatment} />
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
