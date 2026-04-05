import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '../../../lib/mockData';
import ProductDetailClient from './ProductDetailClient';
import styles from './page.module.css';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = products.find(p => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(product.price);

  return (
    <div className={styles.main}>      
      <main className={styles.container}>
        <div className={styles.productGrid}>
          {/* Left Column - Image Gallery */}
          <div className={styles.imageGallery}>
            <div className={styles.mainImageWrapper}>
              {product.isNew && <span className={styles.badge}>NUEVO</span>}
              <Image 
                src={product.image}
                alt={`Imagen de ${product.name}`}
                fill
                priority
                className={styles.mainImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* If we had thumbnails: */}
            <div className={styles.thumbnails}>
              <div className={`${styles.thumbnailWrapper} ${styles.thumbnailActive}`}>
                <Image src={product.image} alt="Thumbnail 1" fill className={styles.thumbnailImage} />
              </div>
            </div>
          </div>

          {/* Right Column - Product Info & Actions */}
          <div className={styles.infoColumn}>
            <div className={styles.breadcrumbs}>
              Inicio / {product.category} / {product.name}
            </div>
            
            <h1 className={styles.title}>{product.name}</h1>
            
            <div className={styles.ratingSection}>
              <div className={styles.stars}>
                {'★'.repeat(Math.round(product.rating || 5))}
                <span className={styles.emptyStars}>{'★'.repeat(5 - Math.round(product.rating || 5))}</span>
              </div>
              <span className={styles.reviewsText}>({product.reviews || 0} reseñas)</span>
            </div>

            <p className={styles.price}>{formattedPrice}</p>
            
            <p className={styles.description}>
              {product.description || "Un diseño 3D exclusivo optimizado para una alta calidad y durabilidad."}
            </p>

            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>⏱️</span>
                <div className={styles.specText}>
                  <span className={styles.specLabel}>Tiempo de impresión</span>
                  <span className={styles.specValue}>{product.printTimeEst || "4-6 horas"}</span>
                </div>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>📏</span>
                <div className={styles.specText}>
                  <span className={styles.specLabel}>Dimensiones</span>
                  <span className={styles.specValue}>{product.dimensions || "10 x 10 x 10 cm"}</span>
                </div>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>🧱</span>
                <div className={styles.specText}>
                  <span className={styles.specLabel}>Material</span>
                  <span className={styles.specValue}>{product.material || "PLA Premium"}</span>
                </div>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>🚚</span>
                <div className={styles.specText}>
                  <span className={styles.specLabel}>Entrega Estimada</span>
                  <span className={styles.specValue}>{product.deliveryEst || "2-4 días hábiles"}</span>
                </div>
              </div>
            </div>

            <ProductDetailClient product={product} />

            <div className={styles.secureCheckout}>
              <p>🔒 Pago 100% Seguro</p>
              <p>🛡️ Garantía de Calidad Estrella3D</p>
            </div>
          </div>
        </div>
      </main>    </div>
  );
}
