import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
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
          <form action="mailto:contacto@luna3d.cl" method="POST" encType="text/plain" className={styles.form}>
            <input type="text" name="Nombre" placeholder="Tu Nombre" className={styles.input} required />
            <input type="email" name="Correo" placeholder="Tu Email" className={styles.input} required />
            <textarea name="Mensaje" placeholder="Mensaje" rows={3} className={styles.input} required />
            <button type="submit" className={styles.button}>Enviar a contacto@luna3d.cl</button>
          </form>
        </div>

      </div>

      <div className={styles.bottomBar}>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Estrella 3D SpA. Todos los derechos reservados.
        </div>
        <Link href="/changelog" className={styles.versionBadge}>
          v1.1.0 - Últimas actualizaciones 🚀
        </Link>
      </div>
    </footer>
  );
};
