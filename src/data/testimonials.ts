import type { Testimonial } from "../types/testimonial";

/**
 * ATENÇÃO: nenhum depoimento real foi utilizado. Os itens abaixo são
 * EXEMPLOS genéricos e estão marcados com isPlaceholder: true.
 * Substitua por depoimentos reais e AUTORIZADOS pelos pacientes antes de
 * publicar o site. Não invente nomes, notas ou comentários.
 */
export const testimonials: Testimonial[] = [
  {
    id: "example-1",
    patientName: "Depoimento de exemplo",
    text: "Este espaço foi reservado para avaliações reais de pacientes, publicadas somente com autorização.",
    isPlaceholder: true,
  },
  {
    id: "example-2",
    patientName: "Depoimento de exemplo",
    text: "Assim que houver avaliações autorizadas, elas devem substituir estes textos de exemplo.",
    isPlaceholder: true,
  },
  {
    id: "example-3",
    patientName: "Depoimento de exemplo",
    text: "Nenhuma nota, nome ou comentário foi inventado — este é apenas um espaço reservado.",
    isPlaceholder: true,
  },
];
