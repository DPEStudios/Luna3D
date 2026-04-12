"use client";

import React, { useState, useCallback, useMemo } from 'react';
import styles from './ReviewsCarousel.module.css';
import { PlaceholderImage } from '../ui/PlaceholderImage';

export interface Review {
  id: string;
  author: string;
  rating: number; // 1..5
  text: string;
  product: string;
}

/**
 * 12 reseñas mock. El carrusel muestra VISIBLE_COUNT a la vez
 * y avanza de a 1 con los controles prev/next.
 */
const MOCK_REVIEWS: Review[] = [
  { id: 'r1',  author: 'Daniel',    rating: 5, text: 'Me encantó el diseño, la calidad de impresión es brutal y llegó súper rápido.',           product: 'Lámpara Luna Creciente' },
  { id: 'r2',  author: 'Valentina', rating: 5, text: 'Perfecto para mi escritorio, el acabado mate se ve premium. Lo recomiendo 100%.',         product: 'Soporte de Celular Geométrico' },
  { id: 'r3',  author: 'Matías',    rating: 4, text: 'Muy buen producto, encajó perfecto. Le falta un poco de color, pero se ve genial.',       product: 'Organizador Modular' },
  { id: 'r4',  author: 'Camila',    rating: 5, text: 'Un regalo ideal, a mi hermana le fascinó. La atención al detalle es increíble.',          product: 'Figura Articulada Dragón' },
  { id: 'r5',  author: 'Joaquín',   rating: 5, text: 'Calidad superior a lo esperado. El empaque cuidado y la entrega puntual.',                product: 'Maceta Auto-regable' },
  { id: 'r6',  author: 'Francisca', rating: 5, text: 'Ideal para mi home office. Encajó exacto con lo que buscaba.',                            product: 'Soporte Monitor Luna' },
  { id: 'r7',  author: 'Sebastián', rating: 4, text: 'Cumplió todo lo prometido. Lo volvería a comprar sin dudarlo.',                           product: 'Llavero Personalizado' },
  { id: 'r8',  author: 'Javiera',   rating: 5, text: 'Los detalles impresos son impresionantes. Se nota el diseño premium.',                    product: 'Jarrón Espiral' },
  { id: 'r9',  author: 'Tomás',     rating: 5, text: 'Mi hijo quedó feliz con el juguete. Resistente y bien terminado.',                        product: 'Dinosaurio Articulado' },
  { id: 'r10', author: 'Antonia',   rating: 4, text: 'Buena relación calidad-precio. Llegó antes de lo esperado.',                              product: 'Posavasos Geométrico' },
  { id: 'r11', author: 'Ignacio',   rating: 5, text: 'Material resistente y diseño hermoso. Totalmente recomendado.',                           product: 'Lámpara Galaxia' },
  { id: 'r12', author: 'Isidora',   rating: 5, text: 'Atención al cliente top. Me ayudaron a personalizar el pedido sin drama.',                product: 'Figura Custom' },
];

const VISIBLE_COUNT = 4;

/**
 * ReviewsCarousel — carrusel con ventana deslizante:
 * muestra 4 tarjetas a la vez, avanza/retrocede de a 1.
 */
export const ReviewsCarousel: React.FC<{ reviews?: Review[] }> = ({
  reviews = MOCK_REVIEWS,
}) => {
  const [index, setIndex] = useState(0);

  // Total de pasos (posiciones iniciales distintas en la ventana)
  const maxIndex = useMemo(
    () => Math.max(0, reviews.length - VISIBLE_COUNT),
    [reviews.length],
  );

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  if (!reviews || reviews.length === 0) {
    return <div className={styles.empty}>Aún no hay reseñas.</div>;
  }

  // Cada tarjeta ocupa 1 / VISIBLE_COUNT del ancho → translateX por índice.
  const slideStyle: React.CSSProperties = {
    transform: `translateX(calc(-${index} * (100% / ${VISIBLE_COUNT})))`,
  };

  return (
    <div className={styles.carousel} aria-roledescription="carousel">
      <button
        type="button"
        className={styles.navBtn}
        onClick={goPrev}
        aria-label="Reseñas anteriores"
      >
        ‹
      </button>

      <div className={styles.viewport}>
        <div className={styles.track} style={slideStyle}>
          {reviews.map((review) => (
            <article key={review.id} className={styles.card} aria-label={`Reseña de ${review.author}`}>
              <div className={styles.media}>
                <PlaceholderImage aspect="square" label="Foto cliente" />
              </div>
              <div className={styles.body}>
                <div className={styles.stars} aria-label={`${review.rating} de 5 estrellas`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rating ? styles.starOn : styles.starOff}>★</span>
                  ))}
                </div>
                <p className={styles.text}>&ldquo;{review.text}&rdquo;</p>
                <div className={styles.meta}>
                  <span className={styles.author}>{review.author}</span>
                  <span className={styles.product}>Compró: {review.product}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={styles.navBtn}
        onClick={goNext}
        aria-label="Reseñas siguientes"
      >
        ›
      </button>

      <div className={styles.dots} aria-hidden="true">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <span
            key={i}
            className={i === index ? styles.dotActive : styles.dot}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};
