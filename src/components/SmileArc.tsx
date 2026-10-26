export interface SmileArcProps {
  className?: string;
  align?: "left" | "center";
  /** Cor do traço. Padrão: dourado da marca. */
  color?: string;
}

/**
 * Elemento gráfico assinatura do site: um arco fino e dourado, inspirado
 * na curva de um sorriso. Marca o rótulo de cada seção (ver
 * SectionHeading) e aparece em pontos-chave do Início, reforçando o conceito
 * "seu sorriso merece cuidado" sem recorrer a ícones infantis.
 */
export function SmileArc({ className, align = "left", color = "var(--color-gold)" }: SmileArcProps) {
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
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        // Espessura constante em qualquer tamanho do arco (ele aparece
        // de 28px no rótulo das seções a 72px no Início).
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
