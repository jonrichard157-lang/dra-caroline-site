import styles from "./Location.module.css";
import { Container } from "../../components/Container";
import { SectionHeading } from "../../components/SectionHeading";
import { Button } from "../../components/Button";
import { contactInfo, whatsappDefaultMessage } from "../../data/contactInfo";
import { buildWhatsappLink } from "../../utils/whatsapp";

export function Location() {
  const whatsappLink = buildWhatsappLink(contactInfo.whatsappNumber, whatsappDefaultMessage);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${contactInfo.latitude},${contactInfo.longitude}`;

  return (
    <section className={styles.section} id="location" aria-labelledby="location-heading">
      <Container>
        <SectionHeading id="location-heading" eyebrow="Localização" title="Onde estamos" />

        <div className={styles.grid}>
          <div className={styles.details}>
            <div className={styles.addressBlock}>
              <p className={styles.name}>{contactInfo.professionalName}</p>
              <p className={styles.addressLine}>{contactInfo.street}</p>
              <p className={styles.addressLine}>
                {contactInfo.neighborhood} – {contactInfo.city}/SP
              </p>
              <p className={styles.addressLine}>{contactInfo.croNumber}</p>
            </div>

            <div className={styles.actions}>
              <Button href={contactInfo.googleMapsUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
                Abrir no Google Maps
              </Button>
              <Button href={directionsUrl} variant="ghost" icon="route" target="_blank" rel="noopener noreferrer">
                Traçar rota
              </Button>
              <Button
                href={whatsappLink}
                variant="whatsapp"
                icon="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar pelo WhatsApp
              </Button>
            </div>
          </div>

          <div className={styles.mapWrapper}>
            <iframe
              className={styles.map}
              src={contactInfo.mapEmbedUrl}
              title={`Mapa de localização do consultório da ${contactInfo.professionalName}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
