"use client";

import React, { useState, useEffect } from 'react';
import styles from './ContactModal.module.css';
import { useContactStore } from '../../store/contactStore';

/**
 * Modal de Contáctanos — se abre desde el header.
 * Muestra los datos de contacto (email, teléfono, dirección, horarios)
 * y el formulario para enviar un mensaje vía /api/contact (Resend).
 */
export const ContactModal: React.FC = () => {
  const { isContactModalOpen, closeContactModal } = useContactStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isContactModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      nombre: formData.get('Nombre'),
      correo: formData.get('Correo'),
      mensaje: formData.get('Mensaje'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setStatusMessage('Ocurrió un error. Intenta nuevamente.');
        return;
      }

      setStatusMessage('¡Mensaje enviado con éxito! Te responderemos pronto.');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatusMessage('Error de conexión al enviar el mensaje.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    closeContactModal();
    setStatusMessage('');
  };

  return (
    <>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={styles.modal} role="dialog" aria-label="Contáctanos">
        {/* Cabecera */}
        <div className={styles.header}>
          <h2 className={styles.title}>Contáctanos</h2>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Cerrar">&times;</button>
        </div>

        <p className={styles.subtitle}>
          ¿Tienes una idea, necesitas una pieza personalizada o quieres saber más
          sobre nuestros productos? Escríbenos y te respondemos lo antes posible.
        </p>

        {/* Datos de contacto */}
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22,6 12,13 2,6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className={styles.infoLabel}>Correo</div>
              <a href="mailto:contacto@luna3d.cl" className={styles.infoValue}>
                contacto@luna3d.cl
              </a>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className={styles.infoLabel}>Teléfono / WhatsApp</div>
              <a href="tel:+56912345678" className={styles.infoValue}>
                +56 9 1234 5678
              </a>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className={styles.infoLabel}>Dirección</div>
              <div className={styles.infoValue}>Santiago, Chile</div>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="12,6 12,12 16,14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className={styles.infoLabel}>Horario</div>
              <div className={styles.infoValue}>
                Lun–Vie 9:00–19:00<br />
                Sáb 10:00–14:00
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Formulario */}
        <h3 className={styles.formTitle}>Escríbenos un mensaje</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Tu nombre</span>
            <input
              type="text"
              name="Nombre"
              placeholder="Ej. Daniel Pardo"
              className={styles.input}
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Tu correo</span>
            <input
              type="email"
              name="Correo"
              placeholder="tucorreo@ejemplo.com"
              className={styles.input}
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Mensaje</span>
            <textarea
              name="Mensaje"
              placeholder="Cuéntanos en qué podemos ayudarte..."
              rows={4}
              className={styles.textarea}
              required
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitBtn}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          {statusMessage && (
            <p
              className={
                statusMessage.includes('éxito')
                  ? styles.statusOk
                  : styles.statusErr
              }
              role="status"
            >
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </>
  );
};
