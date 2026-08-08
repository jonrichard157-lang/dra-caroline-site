/**
 * Monta um link do WhatsApp a partir de um número (formato internacional,
 * sem símbolos) e uma mensagem em texto livre. A mensagem é sempre
 * codificada com encodeURIComponent para evitar links quebrados.
 */
export function buildWhatsappLink(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
