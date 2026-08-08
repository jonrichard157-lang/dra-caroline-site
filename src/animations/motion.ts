/**
 * Ponto único de import do sistema de motion. O resto do app importa daqui
 * (`import { hoverCard, useReveal } from "../../animations/motion"`) em vez
 * de apontar para os arquivos internos — se a implementação interna mudar,
 * os componentes que a consomem não precisam ser tocados.
 *
 * Não esqueça de importar `./motion.css` uma única vez na raiz do app
 * (feito em `src/main.tsx`) para que as classes utilitárias existam.
 */
export {
  revealVariants,
  staggerChildren,
  hoverCard,
  hoverIcon,
  buttonHover,
  sectionReveal,
} from "./variants";
export type { RevealVariant } from "./variants";
export {
  REVEAL_DURATION_MS,
  REVEAL_CHILD_DURATION_MS,
  STAGGER_STEP_MS,
  REVEAL_ROOT_MARGIN,
  REVEAL_THRESHOLD,
} from "./transitions";
