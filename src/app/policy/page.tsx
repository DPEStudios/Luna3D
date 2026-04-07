import React from 'react';
import styles from '../about/page.module.css'; // Reutilizamos estilos

export default function PolicyPage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Política de Privacidad</h1>
        
        <section className={styles.section}>
          <h2>1. Recopilación de Información</h2>
          <p>
            <strong>Luna 3D</strong> valora tu privacidad. Únicamente recopilamos los datos estrictamente necesarios para el procesamiento eficiente de tus pedidos, cotizaciones automáticas y entrega física a través de servicios courier. Esto incluye: Nombre, Correo, Teléfono, y Dirección Postal.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Procesamiento de Pagos</h2>
          <p>
            Nuestros cobros son procesados de manera segura mediante proveedores de pago encriptados de alto estándar (ej. MercadoPago). Luna 3D no almacena los números enteros ni CVV de tus tarjetas bancarias en nuestras bases de datos en ningún momento de la transacción.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Cookies de Rendimiento</h2>
          <p>
            Utilizamos tecnologías de almacenamiento de navegador local (como Zustand persist) para asegurar que el contenido de tu carrito permanezca a salvo si recargas la página o la cierras accidentalmente mientras evalúas una compra.
          </p>
        </section>
      </div>
    </main>
  );
}
