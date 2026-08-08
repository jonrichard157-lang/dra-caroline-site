import type { ContactInfo } from "../types/contact";

/**
 * Informações de contato e localização do consultório.
 *
 * ATENÇÃO — itens marcados como "CONFIRMAR" precisam ser validados pela
 * Dra. Caroline antes da publicação do site. Nada aqui foi inventado além
 * do que foi fornecido; horário de funcionamento e Instagram estão como
 * exemplo/placeholder e devem ser substituídos por dados reais.
 */
export const contactInfo: ContactInfo = {
  professionalName: "Dra. Caroline de Lima Floriano",
  professionalTitle: "Cirurgiã-Dentista",
  croNumber: "CRO-SP 158663",
  city: "Mairinque",
  fullAddress: "Rua Monteiro Lobato, 272, Centro, Mairinque – SP",
  street: "Rua Monteiro Lobato, 272",
  neighborhood: "Centro",
  cityState: "Mairinque – SP",
  phoneDisplay: "(11) 99336-0968",
  whatsappNumber: "5511993360968",
  googleMapsUrl: "https://maps.app.goo.gl/CFaMYn5NrVAHivJT9",
  mapEmbedUrl: "https://www.google.com/maps?q=-23.5477807,-47.1856113&z=17&output=embed",
  latitude: -23.5477807,
  longitude: -47.1856113,
  // CONFIRMAR: usuário real do Instagram. Deixe undefined para ocultar o link no rodapé/contato.
  instagramHandle: undefined,
  // CONFIRMAR: horários reais de atendimento antes de publicar (exemplo abaixo).
  openingHours: [
    { label: "Segunda a sexta", hours: "A confirmar" },
    { label: "Sábado", hours: "A confirmar" },
  ],
};

export const whatsappDefaultMessage =
  "Olá, Dra. Caroline! Encontrei o consultório pelo site e gostaria de agendar uma avaliação odontológica.";
