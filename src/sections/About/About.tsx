import styles from "./About.module.css";
import { Container } from "../../components/Container";
import { SectionHeading } from "../../components/SectionHeading";
import { FramedPhoto } from "../../components/FramedPhoto";
import { AnimatedSection } from "../../components/AnimatedSection";
import { revealVariants } from "../../animations/motion";
import { professionalBio, credentialGroups } from "../../data/professional";
import { aboutImage } from "../../data/images";
import { contactInfo } from "../../data/contactInfo";

export function About() {
  return (
    <section className={`${styles.section} on-surface`} id="about" aria-labelledby="about-heading">
      <Container>
        <div className={styles.grid}>
          <div className={styles.imageColumn}>
            {/* CONFIRMAR: substituir por fotografia profissional definitiva, se necessário */}
            <FramedPhoto image={aboutImage} aspectRatio="4 / 5" reveal />
          </div>

          <div className={styles.content}>
            <SectionHeading
              id="about-heading"
              eyebrow={contactInfo.croNumber}
              title="Sobre a profissional"
            />
            <AnimatedSection>
              <p className={styles.bio}>{professionalBio}</p>
            </AnimatedSection>

            {/* Os três grupos de credenciais entram em sequência, da esquerda
                para a direita, na ordem de leitura. */}
            <AnimatedSection stagger className={styles.credentials}>
              {credentialGroups.map((group) => (
                <div className={`${styles.credentialGroup} ${revealVariants.fadeUp}`} key={group.heading}>
                  <h3 className={styles.credentialHeading}>{group.heading}</h3>
                  <ul className={styles.credentialList}>
                    {group.items.map((item) => (
                      <li className={styles.credentialItem} key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </section>
  );
}
