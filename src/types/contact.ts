export interface OpeningHours {
  /** Ex.: "Segunda a sexta" */
  label: string;
  /** Ex.: "08:00 às 18:00" — CONFIRMAR com a profissional antes de publicar */
  hours: string;
}

export interface ContactInfo {
  professionalName: string;
  professionalTitle: string;
  croNumber: string;
  city: string;
  fullAddress: string;
  street: string;
  neighborhood: string;
  cityState: string;
  phoneDisplay: string;
  whatsappNumber: string;
  googleMapsUrl: string;
  mapEmbedUrl: string;
  latitude: number;
  longitude: number;
  /** CONFIRMAR: usuário do Instagram antes de publicar. Deixe undefined para ocultar o link. */
  instagramHandle?: string;
  openingHours: OpeningHours[];
}

export interface ContactFormValues {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  phone?: string;
  subject?: string;
  message?: string;
}
