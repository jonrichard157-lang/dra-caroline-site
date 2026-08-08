/**
 * Nomeia os presets pedidos no briefing (fadeUp, fadeIn, fadeLeft,
 * staggerChildren, hoverCard, buttonHover, sectionReveal) e os mapeia para
 * as classes utilitárias reais, definidas uma única vez em `motion.css`.
 *
 * Os componentes (AnimatedSection, AnimatedCard, ReviewCard, etc.) importam
 * essas constantes em vez de escrever strings de classe soltas pelo código —
 * é o que evita "duplicar valores espalhados", como pedido no briefing.
 */

/** Variantes de entrada usadas pelo `useReveal` / `AnimatedSection`. */
export const revealVariants = {
  /** Entrada padrão: fade + leve subida + scale sutil. Uso geral em seções e cards. */
  fadeUp: "reveal",
  /** Entrada só com opacidade — para blocos onde qualquer deslocamento distrairia. */
  fadeIn: "reveal-fade",
  /** Entrada com leve deslocamento horizontal — uso pontual (ex.: coluna de texto). */
  fadeLeft: "reveal-left",
} as const;

export type RevealVariant = keyof typeof revealVariants;

/** Classe que ativa a entrada com atraso escalonado nos filhos diretos. */
export const staggerChildren = "reveal-stagger";

/** Microinteração de hover para cards. */
export const hoverCard = "hover-card";

/** Microinteração de hover para ícones. */
export const hoverIcon = "hover-icon";

/** Feedback de "pressão" (scale sutil no `:active`) — usado pelo AnimatedButton. */
export const buttonHover = "pressable";

/**
 * `sectionReveal` é o mesmo preset que `fadeUp`, nomeado à parte porque no
 * briefing ele se refere especificamente ao reveal de uma seção completa
 * (não de um item de card). Mantido como alias para deixar a intenção
 * explícita no código de cada seção.
 */
export const sectionReveal = revealVariants.fadeUp;
