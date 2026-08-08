import { createElement, type ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import { revealVariants, hoverCard, STAGGER_STEP_MS } from "../animations/motion";
import type { RevealVariant } from "../animations/motion";

export interface AnimatedCardProps {
  children: ReactNode;
  /** Posição do item na grade — usada só para escalonar o atraso de entrada. */
  index?: number;
  variant?: RevealVariant;
  /** Desliga a microinteração de hover (elevação leve). Ligada por padrão. */
  hover?: boolean;
  className?: string;
  as?: "div" | "li" | "article";
}

/**
 * Usado em grades de cards (tratamentos, diferenciais, avaliações do Google)
 * quando os itens não estão dentro de um `AnimatedSection` com stagger via
 * CSS (por exemplo, listas cujo tamanho é dinâmico e vem de uma API, como
 * as avaliações do Google — nesse caso o :nth-child do CSS não é confiável
 * porque a quantidade de itens varia).
 *
 * UX: cada card aparece muito perto dos vizinhos, mas não exatamente junto —
 * o pequeno atraso (70ms × índice) comunica "isto é um conjunto", sem que o
 * usuário perceba a técnica em si. A elevação no hover reforça affordance de
 * card clicável mesmo quando o card não é um link (dá feedback de "isto
 * responde a você").
 */
export function AnimatedCard({
  children,
  index = 0,
  variant = "fadeUp",
  hover = true,
  className,
  as: Component = "div",
}: AnimatedCardProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  const classNames = [revealVariants[variant], isVisible ? "is-visible" : "", hover ? hoverCard : "", className]
    .filter(Boolean)
    .join(" ");

  // createElement (em vez de JSX) porque `Component` varia entre div/li/
  // article — o IntersectionObserver só precisa de um Element genérico,
  // então tipar isso com union de tags via JSX geraria atrito desnecessário.
  return createElement(
    Component,
    { ref, className: classNames, style: { transitionDelay: `${index * STAGGER_STEP_MS}ms` } },
    children,
  );
}
