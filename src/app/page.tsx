import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { ProductCarousel } from "../components/product/ProductCarousel";
import { products } from "../lib/mockData";
import { Button } from "../components/ui/Button";

export default function Home() {
  return (
    <div className={styles.main}>      
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image 
            src="/Hero_imagenes/IMPRESION-3D-2.jpg.webp" 
            alt="Hero Background Luna 3D"
            fill
            priority
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroOverlay} />
        
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            LUNA <span>3D</span> <br/> Tu Idea Hecha Realidad
          </h1>
          <p className={styles.subtitle}>
            Fabricación de piezas hiper-optimizadas. Descubre nuestros diseños en tendencia
            con calidad crepuscular y alta ingeniería.
          </p>
          <Button variant="primary">Explorar Colección</Button>
        </div>
      </section>

      {/* BODY SECTIONS */}
      <main className={styles.content}>
        
        {/* Destacados */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Modelos Destacados</h2>
            <span className={styles.viewAll}>Ver Todos &rarr;</span>
          </div>
          <ProductCarousel products={products.slice(0, 8)} />
        </section>

        {/* Recomendados */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recomendados para ti</h2>
            <span className={styles.viewAll}>Ver Todos &rarr;</span>
          </div>
          <ProductCarousel products={products.slice(8, 16)} />
        </section>

        {/* Novedades */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Novedades de la Semana</h2>
            <span className={styles.viewAll}>Ver Todos &rarr;</span>
          </div>
          <ProductCarousel products={products.slice(4, 12)} />
        </section>

      </main>

      {/* FOOTER */}    </div>
  );
}
