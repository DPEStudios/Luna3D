"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';
import { Button } from '../ui/Button';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, category, image, isNew }) => {
  const { addItem, openCart, favorites, toggleFavorite } = useCartStore();
  const isFavorite = favorites?.includes(id) ?? false;

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      price,
      image,
      quantity: 1
    });
    openCart();
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {isNew && <span className={styles.badge}>NUEVO</span>}
        <button 
          className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteActive : ''}`}
          onClick={handleToggleFavorite}
          aria-label="Toggle favorite"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <Link href={`/product/${id}`} className={styles.imageLink}>
          <Image 
            src={image} 
            alt={`Imagen de ${name}`}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <Link href={`/product/${id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{name}</h3>
        </Link>
        <div className={styles.footer}>
          <span className={styles.price}>{formattedPrice}</span>
          <Button onClick={handleAddToCart}>Añadir</Button>
        </div>
      </div>
    </article>
  );
};
