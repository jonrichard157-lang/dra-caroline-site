import { useEffect, useRef, useState } from "react";
import { REVEAL_ROOT_MARGIN, REVEAL_THRESHOLD } from "../animations/transitions";

/**
 * Observa quando um elemento entra no viewport e retorna `true` uma única
 * vez — a animação nunca é refeita ao rolar para cima e voltar a descer,
 * como pedido no briefing ("nunca executar novamente... exceto quando
 * fizer sentido"; aqui não há caso em que repetir agregue algo).
 *
 * Se o usuário tiver `prefers-reduced-motion: reduce` ativado, o hook
 * devolve `true` imediatamente e nem chega a criar o observer — a seção
 * aparece pronta, sem qualquer transição.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Fallback para ambientes sem suporte a IntersectionObserver: mostra o
    // conteúdo direto, em vez de arriscar deixá-lo preso em opacity: 0.
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Dispara uma única vez: depois de revelado, o elemento não
          // precisa mais ser observado.
          observer.unobserve(node);
        }
      },
      { threshold: REVEAL_THRESHOLD, rootMargin: REVEAL_ROOT_MARGIN },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
