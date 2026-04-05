import React from 'react';
import Link from 'next/link';

export default function PolicyPage() {
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-background)'}}>      <main style={{maxWidth: '800px', margin: '0 auto', padding: '120px 20px', flex: 1}}>
        <Link href="/" style={{color: 'var(--color-primary)', textDecoration: 'none', marginBottom: '20px', display: 'inline-block'}}>&larr; Volver al inicio</Link>
        <h1 style={{fontSize: '2.5rem', marginBottom: '20px', color: 'var(--color-text-primary)'}}>Devoluciones y Política</h1>
        <p style={{color: 'var(--color-text-secondary)', lineHeight: 1.6, fontSize: '1rem'}}>
          Las devoluciones o cambios se efectúan si un producto llega con daños de fabricación 3D o defectos estructurales. 
          Garantizamos la altísima calidad (Solid/Sez) pero no aceptamos devoluciones por cambios de arrepentimiento de color si ya entró en la cola de impresión. Tu privacidad y tus datos de cuenta están doblemente encriptados y no los compartimos con terceros.
        </p>
      </main>    </div>
  );
}
