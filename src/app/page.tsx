import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { ProductCarousel } from "../components/product/ProductCarousel";
import { getFeaturedProducts, getNewProducts } from "../lib/db/productService";
import { Button } from "../components/ui/Button";
import { TrendingCategories } from "../components/home/TrendingCategories";
import { FeaturedGrid } from "../components/home/FeaturedGrid";
import { MiniHero } from "../components/home/MiniHero";
import { ReviewsCarousel } from "../components/home/ReviewsCarousel";

export const revalidate = 600; // ISR 10 min

export default async function Home() {
  const featured = await getFeaturedProducts(8);
  const newArrivals = await getNewProducts();

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
            LUNA <span>3D</span> <br /> Tu Idea Hecha Realidad
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

        {/* Trending circles */}
        <TrendingCategories />

        {/* Modelos Destacados */}
        <section id="modelos-destacados" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Modelos Destacados</h2>
            <span className={styles.viewAll}>Ver Todos &rarr;</span>
          </div>
          <ProductCarousel products={featured} />
        </section>

        {/* Featured Grid – big image LEFT + 6 small RIGHT */}
        <FeaturedGrid
          bigSide="left"
          heading="Encuentra tu producto"
          ctaLabel="Explorar"
          ctaHref="/#"
        />

        {/* Novedades de la Semana */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Novedades de la Semana</h2>
            <span className={styles.viewAll}>Ver Todos &rarr;</span>
          </div>
          <ProductCarousel products={newArrivals.length > 0 ? newArrivals : featured} />
        </section>

        {/* Featured Grid – mismo layout del primero (big LEFT + 6 RIGHT)
            para mantener ritmo visual simétrico entre ambos bloques. */}
        <FeaturedGrid
          bigSide="left"
          heading="Lo más pedido"
          ctaLabel="Ver catálogo"
          ctaHref="/#"
        />

        {/* Mini Hero banner */}
        <MiniHero
          title="Diseñado para ti"
          subtitle="Diseños únicos, impresos a pedido con acabado premium."
          ctaLabel="Ver catálogo"
          ctaHref="/#"
        />

        {/* Reviews */}
        <section id="reseñas" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Lo que dicen nuestros clientes</h2>
          </div>
          <ReviewsCarousel />
        </section>

      </main>
    </div>
  );
}
