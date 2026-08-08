import styles from "./About.module.css";
import { Container } from "../../components/Container";
import { SectionHeading } from "../../components/SectionHeading";
import { FramedPhoto } from "../../components/FramedPhoto";
import { professionalBio, credentialGroups } from "../../data/professional";
import { aboutImage } from "../../data/images";
import { contactInfo } from "../../data/contactInfo";

export function About() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-heading">
      <Container>
        <div className={styles.grid}>
          <div className={styles.imageColumn}>
            {/* CONFIRMAR: substituir por fotografia profissional definitiva, se necessário */}
            <FramedPhoto image={aboutImage} aspectRatio="4 / 5" />
          </div>

          <div className={styles.content}>
            <SectionHeading
              id="about-heading"
              eyebrow={contactInfo.croNumber}
              title="Sobre a profissional"
            />
            <p className={styles.bio}>{professionalBio}</p>

            <div className={styles.credentials}>
              {credentialGroups.map((group) => (
                <div className={styles.credentialGroup} key={group.heading}>
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
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
