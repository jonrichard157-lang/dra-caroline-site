export interface SmileArcProps {
  className?: string;
  align?: "left" | "center";
}

/**
 * Elemento gráfico assinatura do site: um arco fino e dourado, inspirado
 * na curva de um sorriso. Aparece sob os títulos de seção como um
 * substituto elegante de divisórias retas, reforçando o conceito
 * "seu sorriso merece cuidado" sem recorrer a ícones infantis.
 */
export function SmileArc({ className, align = "left" }: SmileArcProps) {
  return (
    <svg
      className={className}
      width="72"
      height="16"
      viewBox="0 0 72 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ marginInline: align === "center" ? "auto" : undefined }}
    >
      <path
        d="M2 3.5C14 13 58 13 70 3.5"
        stroke="var(--color-gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
