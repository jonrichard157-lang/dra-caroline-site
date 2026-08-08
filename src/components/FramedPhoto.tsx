import type { CSSProperties } from "react";
import styles from "./FramedPhoto.module.css";
import type { SiteImage } from "../data/images";

export interface FramedPhotoProps {
  image: SiteImage;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
}

/**
 * Moldura com topo em arco, remetendo à curva de um sorriso e ao acolhimento
 * de uma entrada de consultório. É o elemento gráfico assinatura repetido
 * no Início, Sobre e outras seções com fotografia.
 */
export function FramedPhoto({ image, className, priority = false, aspectRatio }: FramedPhotoProps) {
  const classNames = [styles.frame, className].filter(Boolean).join(" ");
  const style = aspectRatio ? ({ "--frame-aspect": aspectRatio } as CSSProperties) : undefined;

  return (
    <div className={classNames} style={style}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </div>
    </div>
  );
}
