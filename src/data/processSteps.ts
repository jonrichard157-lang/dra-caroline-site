import type { ProcessStep } from "../types/content";

export const processSteps: ProcessStep[] = [
  {
    id: "contact",
    order: 1,
    title: "Entre em contato pelo WhatsApp",
    description: "Fale com a equipe e explique o que você precisa.",
  },
  {
    id: "schedule",
    order: 2,
    title: "Escolha o melhor horário disponível",
    description: "Combinamos um horário que caiba na sua rotina.",
  },
  {
    id: "evaluation",
    order: 3,
    title: "Realize sua avaliação",
    description: "Uma consulta inicial para conhecer sua saúde bucal.",
  },
  {
    id: "plan",
    order: 4,
    title: "Receba seu plano de tratamento",
    description: "Orientações claras sobre as próximas etapas, sem surpresas.",
  },
];
