/**
 * Espelho em JS dos tokens definidos em `motion.css`. Existem porque o
 * `useReveal` precisa de valores numéricos para configurar o
 * IntersectionObserver (rootMargin) e para decisões de timing feitas em
 * JavaScript — mas o CSS continua sendo a fonte de verdade visual.
 *
 * Importante: se algum valor mudar em motion.css, atualize aqui também.
 * Isso é comentado nos dois arquivos para reduzir o risco de divergência.
 */

/** Duração (ms) do reveal de uma seção inteira. Espelha --duration-reveal. */
export const REVEAL_DURATION_MS = 480;

/** Duração (ms) do reveal de um item dentro de uma grade com stagger. */
export const REVEAL_CHILD_DURATION_MS = 380;

/** Incremento (ms) de atraso entre itens de uma lista com stagger. */
export const STAGGER_STEP_MS = 70;

/**
 * Distância (em px) antes do elemento entrar de fato na tela em que o
 * IntersectionObserver já deve disparar — negativa porque `rootMargin`
 * usa a mesma sintaxe de `margin`. Um valor pequeno faz a animação
 * "acontecer perto da chegada", em vez de disparar cedo demais.
 */
export const REVEAL_ROOT_MARGIN = "0px 0px -80px 0px";

/** Fração mínima visível do elemento para considerar que ele "entrou". */
export const REVEAL_THRESHOLD = 0.15;
