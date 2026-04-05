import React from 'react';
import Link from 'next/link';

export default function TrackingPage() {
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-background)'}}>      <main style={{maxWidth: '800px', margin: '0 auto', padding: '120px 20px', flex: 1, textAlign: 'center'}}>
        <Link href="/" style={{color: 'var(--color-primary)', textDecoration: 'none', marginBottom: '20px', display: 'inline-block'}}>&larr; Volver al inicio</Link>
        <h1 style={{fontSize: '2.5rem', marginBottom: '20px', color: 'var(--color-text-primary)'}}>Seguimiento de tu pedido</h1>
        <p style={{color: 'var(--color-text-secondary)', lineHeight: 1.6, fontSize: '1rem', marginBottom: '40px'}}>
          Ingresa tu número de seguimiento oficial para ver el estado en vivo de tu impresión 3D:
        </p>
        <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
          <input type="text" placeholder="Ej: LUNA-12345" style={{padding: '12px 20px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'white'}} />
          <button style={{padding: '12px 24px', background: 'var(--color-primary)', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>Rastrear</button>
        </div>
      </main>    </div>
  );
}
