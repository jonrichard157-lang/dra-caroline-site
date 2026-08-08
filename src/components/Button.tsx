import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import { Icon } from "./Icon";
import type { IconName } from "../types/icon";

type ButtonVariant = "primary" | "secondary" | "whatsapp" | "ghost";

interface SharedProps {
  variant?: ButtonVariant;
  icon?: IconName;
  fullWidth?: boolean;
  children: ReactNode;
}

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Botão reutilizável. Quando recebe `href`, renderiza um <a>; caso
 * contrário, renderiza um <button>. Isso garante HTML semântico correto
 * (links para navegação/WhatsApp, botões para ações em página).
 */
export function Button({ variant = "primary", icon, fullWidth, children, ...rest }: ButtonProps) {
  const baseClassNames = [styles.button, styles[variant], fullWidth ? styles.fullWidth : ""]
    .filter(Boolean)
    .join(" ");

  if ("href" in rest && rest.href) {
    const { href, className, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    const mergedClassNames = [baseClassNames, className].filter(Boolean).join(" ");
    return (
      <a className={mergedClassNames} href={href} {...anchorRest}>
        {children}
        {icon && <Icon name={icon} size={18} />}
      </a>
    );
  }

  const { className, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  const mergedClassNames = [baseClassNames, className].filter(Boolean).join(" ");
  return (
    <button className={mergedClassNames} type={buttonRest.type ?? "button"} {...buttonRest}>
      {children}
      {icon && <Icon name={icon} size={18} />}
    </button>
  );
}
