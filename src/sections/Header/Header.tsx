import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Container } from "../../components/Container";
import { AnimatedButton } from "../../components/AnimatedButton";
import { Icon } from "../../components/Icon";
import { hoverIcon, scrollProgress } from "../../animations/motion";
import { navLinks } from "../../data/navigation";
import { contactInfo, whatsappDefaultMessage } from "../../data/contactInfo";
import { buildWhatsappLink } from "../../utils/whatsapp";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const whatsappLink = buildWhatsappLink(contactInfo.whatsappNumber, whatsappDefaultMessage);

  // O header ganha borda e sombra só depois que a página sai do topo,
  // separando-o do conteúdo que passa por baixo.
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha o menu mobile automaticamente se a tela for redimensionada para desktop.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1080) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trava a rolagem do body e permite fechar com Esc quando o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const headerClassNames = [styles.header, isScrolled || isMenuOpen ? styles.scrolled : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClassNames}>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>
      <Container>
        <div className={styles.inner}>
          <a className={styles.brand} href="#home">
            <span className={styles.brandName}>{contactInfo.professionalName}</span>
            <span className={styles.brandTitle}>
              {contactInfo.professionalTitle} | {contactInfo.croNumber}
            </span>
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
              <Icon name={isMenuOpen ? "close" : "menu"} size={22} />
            </button>
          </div>
        </div>
      </Container>

      <span className={scrollProgress} aria-hidden="true" />

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
            variant="whatsapp"
            icon="whatsapp"
            fullWidth
            className={styles.mobileCta}
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar pelo WhatsApp
          </AnimatedButton>
          <p className={styles.mobileContact}>
            {contactInfo.phoneDisplay}
            <br />
            {contactInfo.fullAddress}
          </p>
        </div>
      )}
    </header>
  );
}
