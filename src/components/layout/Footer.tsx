import React from 'react';
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
            <li>Sobre Nosotros</li>
            <li>Términos y Condiciones</li>
            <li>Política de Devolución</li>
            <li>Seguimiento de Envío</li>
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
            [ Mapa de Google Placeholder ]
          </div>
        </div>

        {/* Formulario */}
        <div className={styles.column}>
          <h3>Contáctanos</h3>
          <form className={styles.form}>
            <input type="text" placeholder="Tu Nombre" className={styles.input} />
            <input type="email" placeholder="Tu Email" className={styles.input} />
            <textarea placeholder="Mensaje" rows={3} className={styles.input} />
            <button type="button" className={styles.button}>Enviar</button>
          </form>
        </div>

      </div>

      <div className={styles.bottomBar}>
        &copy; {new Date().getFullYear()} Estrella 3D SpA. Todos los derechos reservados.
      </div>
    </footer>
  );
};
