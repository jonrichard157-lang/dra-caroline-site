import type { Treatment } from "../types/treatment";

/**
 * ATENÇÃO: esta lista de tratamentos é um ponto de partida com base em
 * procedimentos odontológicos comuns. Ela precisa ser CONFIRMADA pela
 * Dra. Caroline antes da publicação — inclua apenas os tratamentos que
 * são realmente realizados no consultório e remova os demais. Nenhuma
 * promessa de resultado é feita nas descrições, propositalmente.
 */
export const treatments: Treatment[] = [
  {
    id: "checkup",
    name: "Avaliação odontológica",
    description:
      "Consulta inicial para entender a saúde bucal do paciente e planejar os próximos passos com calma e clareza.",
    icon: "checkup",
    ctaLabel: "Saiba mais",
  },
  {
    id: "cleaning",
    name: "Limpeza e prevenção",
    description:
      "Remoção de placa e tártaro, com orientações práticas de higiene para o dia a dia.",
    icon: "cleaning",
    ctaLabel: "Saiba mais",
  },
  {
    id: "restorations",
    name: "Restaurações",
    description:
      "Reparo de dentes afetados por cáries ou desgaste, devolvendo função e conforto à mastigação.",
    icon: "restoration",
    ctaLabel: "Saiba mais",
  },
  {
    id: "orthodontics",
    name: "Ortodontia e aparelhos",
    description:
      "Acompanhamento do alinhamento dentário com planejamento individual para cada caso.",
    icon: "orthodontics",
    ctaLabel: "Saiba mais",
  },
  {
    id: "pediatric",
    name: "Atendimento infantil",
    description:
      "Consultas pensadas para deixar as crianças à vontade, com linguagem simples e acolhedora.",
    icon: "pediatric",
    ctaLabel: "Saiba mais",
  },
  {
    id: "whitening",
    name: "Clareamento dental",
    description:
      "Avaliação da indicação e acompanhamento do processo de clareamento com orientações claras.",
    icon: "whitening",
    ctaLabel: "Saiba mais",
  },
  {
    id: "endodontics",
    name: "Tratamento de canal",
    description:
      "Tratamento indicado para preservar o dente em casos de comprometimento da polpa dentária.",
    icon: "endodontics",
    ctaLabel: "Saiba mais",
  },
  {
    id: "extractions",
    name: "Extrações",
    description:
      "Remoção de dentes quando necessário, com explicação detalhada do procedimento antes de realizá-lo.",
    icon: "extraction",
    ctaLabel: "Saiba mais",
  },
  {
    id: "prosthesis",
    name: "Próteses",
    description:
      "Reposição de dentes ausentes para restabelecer função e conforto no dia a dia.",
    icon: "prosthesis",
    ctaLabel: "Saiba mais",
  },
  {
    id: "implants",
    name: "Implantes dentários",
    description:
      "Avaliação da viabilidade de implantes como alternativa para substituição de dentes perdidos.",
    icon: "implant",
    ctaLabel: "Saiba mais",
  },
];
