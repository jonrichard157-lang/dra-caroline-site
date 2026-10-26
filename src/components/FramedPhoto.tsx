import type { CSSProperties } from "react";
import styles from "./FramedPhoto.module.css";
import type { SiteImage } from "../data/images";
import { useReveal } from "../hooks/useReveal";
import { photoUnveil } from "../animations/motion";

export interface FramedPhotoProps {
  image: SiteImage;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
  /** Revela a foto ao entrar na tela (cortina + zoom leve, ver photoUnveil em motion.css). */
  reveal?: boolean;
}

/**
 * Moldura com topo em arco, remetendo à curva de um sorriso e ao acolhimento
 * de uma entrada de consultório. É o elemento gráfico assinatura repetido
 * no Início, Sobre e outras seções com fotografia.
 */
export function FramedPhoto({ image, className, priority = false, aspectRatio, reveal = false }: FramedPhotoProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const wrapperClassNames = [
    styles.imageWrapper,
    reveal ? photoUnveil : "",
    reveal && isVisible ? "is-visible" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const classNames = [styles.frame, className].filter(Boolean).join(" ");
  const style = aspectRatio ? ({ "--frame-aspect": aspectRatio } as CSSProperties) : undefined;
  // O React 18 ainda não reconhece a prop `fetchPriority` (gera aviso no
  // console e não repassa o atributo); em minúsculas ela chega ao HTML.
  const priorityAttributes = { fetchpriority: priority ? "high" : "auto" } as Record<string, string>;

  return (
    <div className={classNames} style={style}>
      <div className={wrapperClassNames} ref={reveal ? ref : undefined}>
        <img
          className={styles.image}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          {...priorityAttributes}
        />
      </div>
    </div>
  );
}
