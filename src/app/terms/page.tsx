import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-background)'}}>      <main style={{maxWidth: '800px', margin: '0 auto', padding: '120px 20px', flex: 1}}>
        <Link href="/" style={{color: 'var(--color-primary)', textDecoration: 'none', marginBottom: '20px', display: 'inline-block'}}>&larr; Volver al inicio</Link>
        <h1 style={{fontSize: '2.5rem', marginBottom: '20px', color: 'var(--color-text-primary)'}}>Términos y Condiciones</h1>
        <p style={{color: 'var(--color-text-secondary)', lineHeight: 1.6, fontSize: '1rem', whiteSpace: 'pre-line'}}>
          Bienvenido a LUNA 3D. Al utilizar nuestra plataforma, aceptas los términos de nuestro ecosistema.
          {'\n\n'}
          1. Producción bajo demanda: Los tiempos de entrega son estimados y dependen de nuestra cola de manufactura.
          {'\n'}
          2. Pagos: Todas las transacciones son seguras y se procesarán conforme a las leyes tributarias de Chile, con entrega de Boleta o Factura.
        </p>
      </main>    </div>
  );
}
