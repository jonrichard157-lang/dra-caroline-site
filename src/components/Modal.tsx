import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import styles from "./Modal.module.css";
import { Icon } from "./Icon";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * Modal construído sobre o elemento nativo <dialog>, que já oferece
 * comportamento acessível (fechar com Esc, foco inicial, camada modal)
 * sem exigir bibliotecas externas.
 */
export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isOpen && !dialogElement.open) {
      dialogElement.showModal();
    } else if (!isOpen && dialogElement.open) {
      dialogElement.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      aria-labelledby="modal-title"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title} id="modal-title">
            {title}
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar"
          >
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </dialog>
  );
}
