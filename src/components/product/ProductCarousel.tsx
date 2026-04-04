"use client";

import React, { useRef } from 'react';
import styles from './ProductCarousel.module.css';
import { ProductCard } from './ProductCard';
import { Product } from '../../lib/mockData';

interface ProductCarouselProps {
  products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Desplazar un 80% del ancho visible para que se note la transición
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <button 
        className={`${styles.navButton} ${styles.leftButton}`} 
        onClick={() => scroll('left')}
        aria-label="Anterior"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className={styles.scrollArea} ref={scrollRef}>
        {products.map((product) => (
          <div key={product.id} className={styles.cardWrapper}>
            <ProductCard
              name={product.name}
              price={product.price}
              category={product.category}
              image={product.image}
              isNew={product.isNew}
            />
          </div>
        ))}
      </div>

      <button 
        className={`${styles.navButton} ${styles.rightButton}`} 
        onClick={() => scroll('right')}
        aria-label="Siguiente"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};
