import type { IconName } from "./icon";

export interface NavLink {
  label: string;
  href: string;
}

export interface HighlightItem {
  id: string;
  icon: IconName;
  label: string;
}

export interface ProcessStep {
  id: string;
  order: number;
  title: string;
  description: string;
}

export interface CredentialGroup {
  heading: string;
  /** CONFIRMAR: itens devem ser validados com a profissional antes da publicação. */
  items: string[];
}
