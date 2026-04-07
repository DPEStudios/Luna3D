import React from 'react';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Acerca de Estrella3D</h1>
        
        <section className={styles.section}>
          <h2>Nuestra Filosofía Operativa</h2>
          <p>
            En <strong>Estrella3D SpA</strong> (operando bajo nuestra marca B2C <em>Luna 3D</em>), no somos
            simplemente una tienda de impresión 3D. Nos definimos como una empresa de <strong>optimización radical</strong>.
            Diseñamos, fabricamos y mejoramos productos eliminando todo lo innecesario para entregar la mejor relación costo-calidad del mercado chileno.
          </p>
        </section>

        <section className={styles.section}>
          <h2>El Algoritmo de la Empresa</h2>
          <p>
            Nuestros procesos de manufactura aditiva y fabricación local se rigen por principios inquebrantables inspirados en la más alta ingeniería:
          </p>
          <ul className={styles.list}>
            <li><strong>Cuestionar Requisitos:</strong> Evaluamos cada capa de impresión y cada detalle para asegurar que aporta un valor real a la pieza final.</li>
            <li><strong>Eliminar:</strong> Reducimos material y tiempos de fabricación excesivos. La impresión más perfecta es la que utiliza exactamente el material que necesita para no fallar.</li>
            <li><strong>Simplificar:</strong> Nuestros modelos propios están diseñados bajo estrictas reglas de Diseño para Manufactura (DFM), evitando soportes innecesarios y garantizando acabados limpios.</li>
            <li><strong>Acelerar:</strong> Solo después de simplificar, aceleramos. Nuestras granjas de impresión manejan altísimas velocidades porque nuestras geometrías lo permiten.</li>
            <li><strong>Automatizar:</strong> Nuestra plataforma opera como un sistema autónomo e integrado, lo que elimina el margen de error humano al coordinar tus pedidos con nuestras máquinas de forma directa.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Tecnología de Vanguardia</h2>
          <p>
            Actualmente nuestra infraestructura productiva destaca por el uso de tecnologías multicolor dinámicas como el sistema AMS, permitiendo piezas con incrustaciones precisas de polímeros que evitan la pintura post-procesado (la cual suele descascararse o borrarse) y ofrecen colores vibrantes unidos molecularmente desde la base.
          </p>
        </section>
      </div>
    </main>
  );
}
