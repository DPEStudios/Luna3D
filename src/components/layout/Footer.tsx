"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { APP_VERSION } from '../../lib/changelog';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      nombre: formData.get("Nombre"),
      correo: formData.get("Correo"),
      mensaje: formData.get("Mensaje"),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatusMessage("¡Mensaje enviado con éxito!");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatusMessage("Ocurrió un error. Intenta nuevamente.");
      }
    } catch (error) {
      setStatusMessage("Error de conexión al enviar el mensaje.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Curva superior tipo "borde de luna". El path dibuja un
          arco que sube en el centro, imitando el perfil curvo
          de la luna. Los círculos son cráteres decorativos.
          aria-hidden porque es puramente visual. */}
      <div className={styles.curveWrap} aria-hidden="true">
        <svg
          className={styles.curve}
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,160 C320,20 1120,20 1440,160 L1440,160 L0,160 Z"
            className={styles.curvePath}
          />
          {/* Cráteres decorativos — solo visibles cuando el path
              los cubre. Son elipses con leve sombra interna. */}
          <circle cx="260"  cy="120" r="10" className={styles.crater} />
          <circle cx="420"  cy="90"  r="6"  className={styles.craterSm} />
          <circle cx="700"  cy="72"  r="14" className={styles.crater} />
          <circle cx="900"  cy="88"  r="7"  className={styles.craterSm} />
          <circle cx="1080" cy="110" r="11" className={styles.crater} />
          <circle cx="1220" cy="135" r="5"  className={styles.craterSm} />
        </svg>
      </div>

      <div className={styles.footerContent}>
        
        {/* Branding & Info */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            LUNA<span>3D</span>
          </div>
          <p className={styles.description}>
            La revolución de la impresión 3D mediante optimización radical de modelos y un ecosistema completamente autónomo.
          </p>
        </div>

        {/* Links útiles */}
        <div className={styles.column}>
          <h3>Enlaces Útiles</h3>
          <ul>
            <li><Link href="/about" style={{textDecoration: 'none', color: 'inherit'}}>Sobre Nosotros</Link></li>
            <li><Link href="/terms" style={{textDecoration: 'none', color: 'inherit'}}>Términos y Condiciones</Link></li>
            <li><Link href="/policy" style={{textDecoration: 'none', color: 'inherit'}}>Política de Devolución</Link></li>
            <li><Link href="/tracking" style={{textDecoration: 'none', color: 'inherit'}}>Seguimiento de Envío</Link></li>
          </ul>
        </div>

        {/* Contacto & Mapa */}
        <div className={styles.column}>
          <h3>Encuéntranos</h3>
          <ul>
            <li>Email: contacto@luna3d.cl</li>
            <li>Teléfono: +56 9 1234 5678</li>
            <li>Santiago, Chile</li>
          </ul>
          <div className={styles.mapPlaceholder}>
            <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106491.53091720819!2d-70.6692655!3d-33.45694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5410425af2f%3A0x8475d53c400f0931!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl" 
               width="100%" 
               height="100%" 
               style={{border: 0, borderRadius: '8px'}} 
               allowFullScreen={true} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Mapa de Ubicación"
            ></iframe>
          </div>
        </div>

        {/* Formulario */}
        <div className={styles.column}>
          <h3>Contáctanos</h3>
          <form onSubmit={handleContactSubmit} className={styles.form}>
            <input type="text" name="Nombre" placeholder="Tu Nombre" className={styles.input} required />
            <input type="email" name="Correo" placeholder="Tu Email" className={styles.input} required />
            <textarea name="Mensaje" placeholder="Mensaje" rows={3} className={styles.input} required />
            <button type="submit" disabled={isSubmitting} className={styles.button}>
              {isSubmitting ? 'Enviando...' : 'Enviar a contacto@luna3d.cl'}
            </button>
            {statusMessage && <p style={{ fontSize: '0.9rem', color: statusMessage.includes('éxito') ? '#4caf50' : '#f44336' }}>{statusMessage}</p>}
          </form>
        </div>

      </div>

      <div className={styles.bottomBar}>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Estrella 3D SpA. Todos los derechos reservados.
        </div>
        <Link href="/changelog" className={styles.versionBadge}>
          v{APP_VERSION} — Ver actualizaciones
        </Link>
      </div>
    </footer>
  );
};
