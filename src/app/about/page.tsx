import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-background)'}}>      <main style={{maxWidth: '800px', margin: '0 auto', padding: '120px 20px', flex: 1}}>
        <Link href="/" style={{color: 'var(--color-primary)', textDecoration: 'none', marginBottom: '20px', display: 'inline-block'}}>&larr; Volver al inicio</Link>
        <h1 style={{fontSize: '2.5rem', marginBottom: '20px', color: 'var(--color-text-primary)'}}>Sobre Nosotros</h1>
        <p style={{color: 'var(--color-text-secondary)', lineHeight: 1.6, fontSize: '1.1rem'}}>
          En Estrella 3D nos dedicamos a la manufactura autónoma y la ingeniería de diseño sin desperdicio estructural.
          Operamos bajo la marca LUNA 3D para acercar la hiper-optimización de modelos al público general,
          brindando decoración, gadgets y herramientas creadas con precisión micrométrica.
        </p>
      </main>    </div>
  );
}
