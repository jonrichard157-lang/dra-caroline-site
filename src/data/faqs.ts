import type { FaqItem } from "../types/faq";

/**
 * Respostas sobre preços, convênios e formas de pagamento não são
 * inventadas aqui — o texto direciona o paciente para o WhatsApp,
 * conforme solicitado.
 */
export const faqs: FaqItem[] = [
  {
    id: "how-to-schedule",
    question: "Como agendar uma consulta?",
    answer:
      "Basta entrar em contato pelo WhatsApp do consultório. A equipe vai te ajudar a escolher o melhor horário disponível.",
  },
  {
    id: "location",
    question: "Onde o consultório está localizado?",
    answer:
      "O consultório fica na Rua Monteiro Lobato, 272, Centro, Mairinque – SP. Você encontra o mapa completo na seção de Localização.",
  },
  {
    id: "treatments-offered",
    question: "Quais tratamentos são realizados?",
    answer:
      "Você confere a lista completa na seção Tratamentos. Qualquer dúvida sobre um procedimento específico pode ser esclarecida diretamente pelo WhatsApp.",
  },
  {
    id: "children",
    question: "O consultório atende crianças?",
    answer:
      "Sim, há atendimento infantil. Fale pelo WhatsApp para mais detalhes sobre a faixa etária atendida.",
  },
  {
    id: "payment",
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "As formas de pagamento podem variar. Fale com a equipe pelo WhatsApp para confirmar as opções disponíveis no momento.",
  },
  {
    id: "insurance",
    question: "O consultório atende convênios?",
    answer:
      "Para confirmar se o seu convênio é atendido, entre em contato pelo WhatsApp — a equipe vai te passar essa informação atualizada.",
  },
  {
    id: "first-evaluation",
    question: "Como funciona a primeira avaliação?",
    answer:
      "Na primeira consulta, a Dra. Caroline avalia sua saúde bucal e explica com clareza as opções de tratamento, sem compromisso imediato.",
  },
  {
    id: "advance-scheduling",
    question: "É necessário agendar com antecedência?",
    answer:
      "Recomendamos agendar com antecedência para garantir o horário que for mais conveniente para você. Fale pelo WhatsApp para verificar a disponibilidade.",
  },
];
