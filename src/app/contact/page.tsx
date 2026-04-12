"use client";

import React, { useState } from 'react';
import styles from './page.module.css';

/**
 * Página /contact — formulario + datos de contacto.
 * El formulario vive aquí (antes estaba en el footer) para que
 * el footer quede más limpio y los usuarios lleguen explícitamente.
 * El envío usa el mismo endpoint /api/contact (Resend).
 */
export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

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

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <header className={styles.hero}>
          <h1 className={styles.title}>Contáctanos</h1>
          <p className={styles.subtitle}>
            ¿Tienes una idea, necesitas una pieza personalizada o quieres saber más
            sobre nuestros productos? Escríbenos y te respondemos lo antes posible.
          </p>
        </header>

        <div className={styles.grid}>
          {/* Columna izquierda: datos de contacto */}
          <section className={styles.infoCol} aria-label="Información de contacto">
            <h2 className={styles.sectionTitle}>Nuestros datos</h2>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className={styles.infoLabel}>Correo electrónico</div>
                <a href="mailto:contacto@luna3d.cl" className={styles.infoValue}>
                  contacto@luna3d.cl
                </a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="12,6 12,12 16,14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className={styles.infoLabel}>Horario de atención</div>
                <div className={styles.infoValue}>
                  Lunes a Viernes · 9:00 – 19:00<br />
                  Sábado · 10:00 – 14:00
                </div>
              </div>
            </div>

            <div className={styles.mapWrap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106491.53091720819!2d-70.6692655!3d-33.45694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5410425af2f%3A0x8475d53c400f0931!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 'var(--radius-md)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación Luna 3D"
              />
            </div>
          </section>

          {/* Columna derecha: formulario */}
          <section className={styles.formCol} aria-label="Formulario de contacto">
            <h2 className={styles.sectionTitle}>Escríbenos un mensaje</h2>
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
                  rows={6}
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
          </section>
        </div>
      </div>
    </main>
  );
}
