import type { ContactFormErrors, ContactFormValues } from "../types/contact";

const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 10;
// Um telefone brasileiro válido tem ao menos 10 dígitos (DDD + número fixo)
const MIN_PHONE_DIGITS = 10;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (values.name.trim().length < MIN_NAME_LENGTH) {
    errors.name = "Informe seu nome completo.";
  }

  const phoneDigits = values.phone.replace(/\D/g, "");
  if (phoneDigits.length < MIN_PHONE_DIGITS) {
    errors.phone = "Informe um telefone válido, com DDD.";
  }

  if (values.subject.trim().length === 0) {
    errors.subject = "Selecione ou informe um assunto.";
  }

  if (values.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = "Escreva uma mensagem com pelo menos 10 caracteres.";
  }

  return errors;
}

export function hasContactFormErrors(errors: ContactFormErrors): boolean {
  return Object.values(errors).some((error) => Boolean(error));
}
