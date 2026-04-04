"use client";

import React from 'react';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { Button } from '../ui/Button';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ name, price, category, image, isNew }) => {
  const { addItem, openCart } = useCartStore();

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(price);

  const handleAddToCart = () => {
    // Generate an ID from name since we don't have the real object ID here easily via props
    const generatedId = name.replace(/\s+/g, '-').toLowerCase();
    addItem({
      id: generatedId,
      name,
      price,
      image,
      quantity: 1
    });
    openCart();
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {isNew && <span className={styles.badge}>NUEVO</span>}
        <Image 
          src={image} 
          alt={`Imagen de ${name}`}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{name}</h3>
        <div className={styles.footer}>
          <span className={styles.price}>{formattedPrice}</span>
          <Button onClick={handleAddToCart}>Añadir</Button>
        </div>
      </div>
    </article>
  );
};
