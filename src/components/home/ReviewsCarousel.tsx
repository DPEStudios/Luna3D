"use client";

import React, { useState, useCallback } from 'react';
import styles from './ReviewsCarousel.module.css';
import { PlaceholderImage } from '../ui/PlaceholderImage';

export interface Review {
  id: string;
  author: string;
  rating: number; // 1..5
  text: string;
  product: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Daniel',
    rating: 5,
    text: 'Me encantó el diseño, la calidad de impresión es brutal y llegó súper rápido.',
    product: 'Lámpara Luna Creciente',
  },
  {
    id: 'r2',
    author: 'Valentina',
    rating: 5,
    text: 'Perfecto para mi escritorio, el acabado mate se ve premium. Lo recomiendo 100%.',
    product: 'Soporte de Celular Geométrico',
  },
  {
    id: 'r3',
    author: 'Matías',
    rating: 4,
    text: 'Muy buen producto, encajó perfecto. Le falta un poco de color, pero se ve genial.',
    product: 'Organizador Modular',
  },
  {
    id: 'r4',
    author: 'Camila',
    rating: 5,
    text: 'Un regalo ideal, a mi hermana le fascinó. La atención al detalle es increíble.',
    product: 'Figura Articulada Dragón',
  },
];

/**
 * ReviewsCarousel — client-side testimonial carousel with
 * prev/next controls. Uses early-return pattern for edge cases.
 */
export const ReviewsCarousel: React.FC<{ reviews?: Review[] }> = ({
  reviews = MOCK_REVIEWS,
}) => {
  const [index, setIndex] = useState(0);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % reviews.length);
  }, [reviews.length]);

  if (!reviews || reviews.length === 0) {
    return (
      <div className={styles.empty}>Aún no hay reseñas.</div>
    );
  }

  const current = reviews[index];

  return (
    <div className={styles.carousel} aria-roledescription="carousel">
      <button
        type="button"
        className={styles.navBtn}
        onClick={goPrev}
        aria-label="Reseña anterior"
      >
        ‹
      </button>

      <article className={styles.card} aria-live="polite">
        <div className={styles.media}>
          <PlaceholderImage aspect="square" label="Foto cliente" />
        </div>
        <div className={styles.body}>
          <div className={styles.stars} aria-label={`${current.rating} de 5 estrellas`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < current.rating ? styles.starOn : styles.starOff}>★</span>
            ))}
          </div>
          <p className={styles.text}>&ldquo;{current.text}&rdquo;</p>
          <div className={styles.meta}>
            <span className={styles.author}>{current.author}</span>
            <span className={styles.product}>Compró: {current.product}</span>
          </div>
        </div>
      </article>

      <button
        type="button"
        className={styles.navBtn}
        onClick={goNext}
        aria-label="Siguiente reseña"
      >
        ›
      </button>

      <div className={styles.dots} aria-hidden="true">
        {reviews.map((_, i) => (
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
