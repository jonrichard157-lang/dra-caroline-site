import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Container } from "../../components/Container";
import { AnimatedButton } from "../../components/AnimatedButton";
import { Icon } from "../../components/Icon";
import { hoverIcon } from "../../animations/motion";
import { navLinks } from "../../data/navigation";
import { contactInfo, whatsappDefaultMessage } from "../../data/contactInfo";
import { buildWhatsappLink } from "../../utils/whatsapp";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const whatsappLink = buildWhatsappLink(contactInfo.whatsappNumber, whatsappDefaultMessage);

  // Fecha o menu mobile automaticamente se a tela for redimensionada para desktop.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 900) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trava a rolagem do body quando o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>
      <Container>
        <div className={styles.inner}>
          <a className={styles.brand} href="#home">
            <span className={styles.brandName}>Dra. Caroline de Lima Floriano</span>
            <span className={styles.brandTitle}>Cirurgiã-Dentista | {contactInfo.croNumber}</span>
          </a>

          <nav className={styles.nav} aria-label="Navegação principal">
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a className={styles.navLink} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <AnimatedButton
              href={whatsappLink}
              variant="primary"
              className={styles.ctaDesktop}
              target="_blank"
              rel="noopener noreferrer"
            >
              Agendar consulta
            </AnimatedButton>

            <button
              type="button"
              className={`${styles.menuButton} ${hoverIcon}`}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <Icon name={isMenuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </Container>

      {isMenuOpen && (
        <div className={styles.mobileMenu} id="mobile-menu">
          <nav aria-label="Navegação mobile">
            <ul className={styles.mobileList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className={styles.mobileLink}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <AnimatedButton
            href={whatsappLink}
            variant="primary"
            fullWidth
            className={styles.mobileCta}
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar consulta
          </AnimatedButton>
        </div>
      )}
    </header>
  );
}
