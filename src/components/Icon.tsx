import type { IconName } from "../types/icon";

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

/**
 * Conjunto de ícones em SVG inline, simples e consistentes.
 * Mantido como um único componente para evitar dependências externas
 * desnecessárias (ex.: bibliotecas de ícones de terceiros).
 * decorativo por padrão (aria-hidden), já que os ícones sempre
 * acompanham um texto visível que descreve seu significado.
 */
export function Icon({ name, size = 24, className }: IconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
    focusable: false,
  };

  switch (name) {
    case "checkup":
      return (
        <svg {...props}>
          <path d="M9 3v4M15 3v4M6 7h12l-1 5.5a5 5 0 0 1-10 0L6 7Z" />
          <path d="M9.5 21c0-2 1-3 2.5-3s2.5 1 2.5 3" />
        </svg>
      );
    case "cleaning":
      return (
        <svg {...props}>
          <path d="M4 4l6 6M9 3l11 11-3 3L6 6l3-3Z" />
          <path d="M5 19l3-3" />
        </svg>
      );
    case "restoration":
      return (
        <svg {...props}>
          <path d="M12 3c-3.5 0-6 2.7-6 6.2 0 3.6 2 5 2.6 8.3.2 1.1 1 1.5 1.7 1.5.9 0 1.4-.7 1.6-1.7.3-1.6.5-2.6 1.1-2.6s.8 1 1.1 2.6c.2 1 .7 1.7 1.6 1.7.7 0 1.5-.4 1.7-1.5.6-3.3 2.6-4.7 2.6-8.3C18 5.7 15.5 3 12 3Z" />
        </svg>
      );
    case "orthodontics":
      return (
        <svg {...props}>
          <path d="M4 9c2 3 6 3 8 3s6 0 8-3" />
          <path d="M4 9c0 4 3 8 8 8s8-4 8-8" />
          <path d="M9 12v2M12 12v3M15 12v2" />
        </svg>
      );
    case "pediatric":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4" />
          <path d="M6 21c0-3.5 2.7-6 6-6s6 2.5 6 6" />
          <path d="M9.5 8h.01M14.5 8h.01" />
        </svg>
      );
    case "whitening":
      return (
        <svg {...props}>
          <path d="M12 3l2 4 4 .8-3 3 .7 4.2L12 13l-3.7 2 .7-4.2-3-3L10 7l2-4Z" />
          <path d="M6 19h12" />
        </svg>
      );
    case "endodontics":
      return (
        <svg {...props}>
          <path d="M12 3c-2.8 0-5 2.2-5 5 0 3 1.6 4.3 2.2 7.3.2.9.8 1.2 1.3 1.2.7 0 1.1-.6 1.3-1.4.1-.5.2-.9.2-.9s.1.4.2.9c.2.8.6 1.4 1.3 1.4.5 0 1.1-.3 1.3-1.2C15.4 12.3 17 11 17 8c0-2.8-2.2-5-5-5Z" />
          <path d="M12 10v4" />
        </svg>
      );
    case "extraction":
      return (
        <svg {...props}>
          <path d="M9 3c-2 0-3.5 1.8-3.5 4 0 2.5 1.4 3.5 1.8 6 .1.8.7 1.1 1.2 1.1.6 0 1-.5 1.1-1.2.1-.5.4-4.4.4-4.4s.3 3.9.4 4.4c.1.7.5 1.2 1.1 1.2.5 0 1.1-.3 1.2-1.1.4-2.5 1.8-3.5 1.8-6 0-2.2-1.5-4-3.5-4" />
          <path d="M17 17l4 4M21 17l-4 4" />
        </svg>
      );
    case "prosthesis":
      return (
        <svg {...props}>
          <rect x="4" y="9" width="16" height="7" rx="3.5" />
          <path d="M7 16v2M11 16v2M13 16v2M17 16v2" />
        </svg>
      );
    case "implant":
      return (
        <svg {...props}>
          <path d="M9 4h6l-1 5H10L9 4Z" />
          <path d="M10 9v3l-1.5 8h7L14 12V9" />
        </svg>
      );
    case "heart":
      return (
        <svg {...props}>
          <path d="M12 20s-7-4.4-9.5-9C1 7.8 2.6 5 5.6 5c1.8 0 3.2 1 4 2.4C10.4 6 11.8 5 13.6 5c3 0 4.6 2.8 3.1 6-2.5 4.6-9.7 9-9.7 9Z" />
        </svg>
      );
    case "care":
      return (
        <svg {...props}>
          <path d="M12 21c-4-2.5-8-5.5-8-10a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 4.5-4 7.5-8 10Z" />
          <path d="M9 11l2 2 4-4" />
        </svg>
      );
    case "home":
      return (
        <svg {...props}>
          <path d="M4 11.5 12 4l8 7.5" />
          <path d="M6 10v9h12v-9" />
        </svg>
      );
    case "location":
      return (
        <svg {...props}>
          <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.3" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...props} strokeWidth={1.4}>
          <path d="M6 18.5 4.7 22l3.6-1.2A9 9 0 1 0 6 18.5Z" />
          <path d="M8.5 9.3c0-.5.4-.9.9-.9h.7c.4 0 .8.3.9.7l.5 1.7c.1.4 0 .8-.3 1.1l-.6.6c.5 1.2 1.5 2.2 2.7 2.7l.6-.6c.3-.3.7-.4 1.1-.3l1.7.5c.4.1.7.5.7.9v.7c0 .5-.4.9-.9.9-3.9 0-8-4.1-8-8Z" />
        </svg>
      );
    case "phone":
      return (
        <svg {...props}>
          <path d="M6 3h3l1.5 4.5L8.5 9c.8 2 2.7 3.9 4.7 4.7l1.5-2 4.5 1.5v3c0 1.1-.9 2-2 2C10.6 18.2 5.8 13.4 4 7.2 4 6.1 4.9 3 6 3Z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...props}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="M4.5 7 12 13l7.5-6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...props}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17 6.8h.01" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg {...props}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "menu":
      return (
        <svg {...props}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "close":
      return (
        <svg {...props}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "arrowRight":
      return (
        <svg {...props}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "route":
      return (
        <svg {...props}>
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="6" r="2" />
          <path d="M6 16c0-4 2-5 6-6s6-2 6-4" />
        </svg>
      );
    case "map":
      return (
        <svg {...props}>
          <path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z" />
          <path d="M9 4v14M15 6v14" />
        </svg>
      );
    case "star":
      return (
        <svg {...props}>
          <path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.5Z" />
        </svg>
      );
    default:
      return null;
  }
}
