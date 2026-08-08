import { createElement, type ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import { revealVariants, staggerChildren as staggerChildrenClass } from "../animations/motion";
import type { RevealVariant } from "../animations/motion";

export interface AnimatedSectionProps {
  children: ReactNode;
  /** Preset de entrada. Padrão "fadeUp" (== sectionReveal), o mais usado no site. */
  variant?: RevealVariant;
  /** Quando true, os filhos diretos entram em sequência (ver .reveal-stagger em motion.css). */
  stagger?: boolean;
  /** Elemento HTML a renderizar (div por padrão; útil para ul/ol em listas). */
  as?: "div" | "ul";
  className?: string;
}

/**
 * Revela seu conteúdo com uma transição sutil quando ele entra no viewport.
 * É o bloco de montagem do preset "sectionReveal": qualquer seção do site
 * que precise de uma entrada de scroll usa este componente em vez de
 * reimplementar o IntersectionObserver ou as classes de transição.
 *
 * Por que a animação melhora a experiência aqui: o conteúdo institucional
 * (tratamentos, diferenciais, depoimentos) chega em blocos densos de texto.
 * Uma entrada gradual dá ao olho um ponto de ancoragem — a seção "assenta"
 * em vez de aparecer de forma abrupta — sem atrasar a leitura, já que a
 * transição termina bem antes do usuário terminar de rolar até ali.
 */
export function AnimatedSection({
  children,
  variant = "fadeUp",
  stagger = false,
  as: Component = "div",
  className,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  const classNames = [
    revealVariants[variant],
    isVisible ? "is-visible" : "",
    stagger ? staggerChildrenClass : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // createElement em vez de JSX pelo mesmo motivo do AnimatedCard: `as`
  // varia entre tags HTML e unificar os tipos de props via JSX geraria
  // atrito desnecessário para um wrapper puramente estrutural.
  return createElement(Component, { ref, className: classNames }, children);
}
