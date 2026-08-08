import { Button } from "./Button";
import type { ButtonProps } from "./Button";
import { buttonHover } from "../animations/motion";

/**
 * O `Button` original já reage ao hover (cor/translateY, definidos em
 * Button.module.css). Este wrapper soma o preset `buttonHover` do sistema
 * de motion — um `scale(0.98)` sutil em `:active` — para dar feedback de
 * "toque reconhecido" no clique/tap, sem herdar nada além disso.
 *
 * Por que isso importa aqui: em CTAs como "Agendar pelo WhatsApp", o
 * usuário está prestes a sair do site. O micro-feedback no clique confirma
 * que a ação foi registrada antes da troca de contexto (abrir o WhatsApp),
 * reduzindo a sensação de "cliquei e não aconteceu nada" nesse instante.
 */
export function AnimatedButton(props: ButtonProps) {
  const classNames = [buttonHover, props.className].filter(Boolean).join(" ");
  return <Button {...props} className={classNames} />;
}
