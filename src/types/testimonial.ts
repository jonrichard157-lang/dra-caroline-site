export interface Testimonial {
  id: string;
  patientName: string;
  text: string;
  /** Sempre true nos dados de exemplo; deve virar false somente para depoimentos reais e autorizados. */
  isPlaceholder: boolean;
}
