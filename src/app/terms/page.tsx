import React from 'react';
import styles from '../about/page.module.css'; // Reutilizamos estilos por agilidad visual

export default function TermsPage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Términos y Condiciones de Venta</h1>
        
        <section className={styles.section}>
          <h2>1. Aspectos Generales</h2>
          <p>
            Las presentes condiciones de venta rigen el uso de la plataforma web de <strong>Luna 3D</strong> (una marca de Estrella3D SpA) y las compras realizadas a través de la misma. Al concretar una transacción, el cliente acepta estas condiciones en conformidad con las leyes de comercio electrónico de la República de Chile.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Naturaleza de los Productos</h2>
          <p>
            Salvo que se indique lo contrario, comercializamos piezas fabricadas mediante manufactura aditiva (Impresión 3D). Por la naturaleza del proceso FDM, las superficies pueden presentar microporosidades o líneas de capa visibles. Estas características constructivas no son fallas, sino prueba de nuestro proceso constructivo.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Tiempos de Fabricación y Despacho</h2>
          <p>
            Al tener un proceso hiper-optimizado, muchos de nuestros pedidos se fabrican &quot;Just in Time&quot;. El tiempo de procesamiento estándar es de 2 a 5 días hábiles, salvo quiebres de materiales exóticos. Los despachos son administrados y tarifados mediante empresas externas de paquetería express.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Garantía Legal (Derecho a Retracto)</h2>
          <p>
            En conformidad con la Ley del Consumidor en Chile, cuentas con una garantía legal de 6 meses por fallas de fábrica que sean estructurales. Ten presente que las piezas impresas en 3D en materiales como PLA presentan umbrales térmicos (sobre 60°C pueden deformarse); el daño térmico causado por exposición directa al sol dentro de vehículos no está cubierto por la garantía técnica.
          </p>
        </section>
      </div>
    </main>
  );
}
