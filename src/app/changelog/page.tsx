import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import styles from './page.module.css';

export default function ChangelogPage() {
  const versions = [
    {
      version: '1.1.0',
      date: '5 de Abril de 2026',
      title: 'El Gran Salto al E-Commerce 🛒',
      changes: [
        '¡Sistema de Compra Activo! Ahora puedes agregar al carrito e ir a "Pagar".',
        'Páginas dedicadas para cada producto con especificaciones 3D y estimaciones.',
        'Integración inteligente con WhatsApp: Tus compras llegan directo al celular como comanda.',
        'Sistema de Favoritos: Dale "Me gusta" a los productos y se guardarán en tu perfil temporal.',
        'Checkout 100% Funcional con Selección de Boleta o Factura Empresa.',
        'Nuevo Botón de Versiones (donde estás parado ahora mismo).'
      ]
    },
    {
      version: '1.0.0',
      date: '4 de Abril de 2026',
      title: 'Despliegue Fundacional (The Backbone)',
      changes: [
        'Nacimiento de Luna3D web app en Vercel con dominio luna3d.cl 😎',
        'Creación del motor Next.js 16 + React 19 hiper-optimizado.',
        'Componentización atómica de tarjetas de producto con renderizado en hover.',
        'Diseño visual "Dark Mode" con tema espacial/neón y fuentes interactivas.',
        'Primer mock de base de datos de productos (MockData).'
      ]
    }
  ];

  return (
    <div className={styles.main}>
      <Header />
      
      <main className={styles.container}>
        <div className={styles.header}>
          <Link href="/">&larr; Volver al inicio</Link>
          <h1>Actualizaciones de Estrella 3D</h1>
          <p>
            Sigue de cerca cómo va creciendo nuestro ecosistema. El compromiso principal es mantener
            un desarrollo veloz sin fallas en la estructura fundamental.
          </p>
        </div>

        <div className={styles.timeline}>
          {versions.map((ver, index) => (
            <div key={ver.version} className={styles.versionCard}>
              <div className={styles.versionHeader}>
                <div className={styles.badgeWrapper}>
                  <span className={styles.versionBadge}>v{ver.version}</span>
                  {index === 0 && <span className={styles.newBadge}>NUEVA</span>}
                </div>
                <span className={styles.date}>{ver.date}</span>
              </div>
              <h2 className={styles.versionTitle}>{ver.title}</h2>
              <ul className={styles.changelist}>
                {ver.changes.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
