import type { CredentialGroup } from "../types/content";

export const professionalBio =
  "A Dra. Caroline de Lima Floriano é cirurgiã-dentista, CRO-SP 158663, e oferece atendimento odontológico com foco em cuidado, prevenção, saúde bucal e bem-estar. Cada paciente recebe uma avaliação individualizada e orientações claras sobre todas as etapas do tratamento.";

/**
 * ATENÇÃO: nenhuma formação, especialização, curso ou certificação foi
 * inventada. Os campos abaixo estão como "A confirmar" e devem ser
 * preenchidos com informações reais, fornecidas e revisadas pela
 * Dra. Caroline antes da publicação do site.
 */
export const credentialGroups: CredentialGroup[] = [
  {
    heading: "Formação",
    items: ["Graduação em Odontologia",
       "Pós Graduação em Saúde Pública"
      ],
  },
  {
    heading: "Especializações",
    items: [
      "Cirurgiã-Dentista",
      "Coordenadora de Saúde Bucal",
      "Dentista no SUS – Mairinque (SP)",
    ],
  },
  {
    heading: "Cursos e certificações",
    items: ["CRO-SP 158663"],
  },
];
