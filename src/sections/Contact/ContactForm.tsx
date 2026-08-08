import { useId, useState } from "react";
import type { FormEvent } from "react";
import styles from "./ContactForm.module.css";
import { AnimatedButton } from "../../components/AnimatedButton";
import { Icon } from "../../components/Icon";
import { contactInfo } from "../../data/contactInfo";
import { buildWhatsappLink } from "../../utils/whatsapp";
import { hasContactFormErrors, validateContactForm } from "../../utils/validateContactForm";
import type { ContactFormErrors, ContactFormValues } from "../../types/contact";

const initialValues: ContactFormValues = {
  name: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const nameId = useId();
  const phoneId = useId();
  const subjectId = useId();
  const messageId = useId();

  function handleChange<K extends keyof ContactFormValues>(field: K, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);

    if (hasContactFormErrors(validationErrors)) {
      return;
    }

    const messageLines = [
      "Olá, Dra. Caroline! Encontrei o consultório pelo site.",
      `Nome: ${values.name}`,
      `Telefone: ${values.phone}`,
      `Assunto: ${values.subject}`,
      `Mensagem: ${values.message}`,
    ];

    const whatsappLink = buildWhatsappLink(contactInfo.whatsappNumber, messageLines.join("\n"));
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
    setWasSubmitted(true);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.privacyNote}>
        <Icon name="care" size={18} className={styles.noteIcon} />
        <span>
          Por segurança, não envie diagnósticos, exames ou outras informações médicas por este
          formulário. Ele serve apenas para organizar seu primeiro contato.
        </span>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={nameId}>
          Nome
        </label>
        <input
          id={nameId}
          className={styles.input}
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(event) => handleChange("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${nameId}-error` : undefined}
        />
        {errors.name && (
          <span className={styles.errorText} id={`${nameId}-error`} role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={phoneId}>
          Telefone
        </label>
        <input
          id={phoneId}
          className={styles.input}
          type="tel"
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          value={values.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
        />
        {errors.phone && (
          <span className={styles.errorText} id={`${phoneId}-error`} role="alert">
            {errors.phone}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={subjectId}>
          Assunto
        </label>
        <input
          id={subjectId}
          className={styles.input}
          type="text"
          placeholder="Ex.: Avaliação odontológica"
          value={values.subject}
          onChange={(event) => handleChange("subject", event.target.value)}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? `${subjectId}-error` : undefined}
        />
        {errors.subject && (
          <span className={styles.errorText} id={`${subjectId}-error`} role="alert">
            {errors.subject}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={messageId}>
          Mensagem
        </label>
        <textarea
          id={messageId}
          className={styles.textarea}
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${messageId}-error` : undefined}
        />
        {errors.message && (
          <span className={styles.errorText} id={`${messageId}-error`} role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <AnimatedButton type="submit" variant="primary" icon="whatsapp" fullWidth>
        Enviar pelo WhatsApp
      </AnimatedButton>

      {wasSubmitted && (
        <p className={styles.statusMessage} role="status">
          Sua mensagem foi preparada no WhatsApp. Confirme o envio por lá.
        </p>
      )}
    </form>
  );
}
