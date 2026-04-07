"use client";

import React, { useState } from 'react';
import { useCartStore } from '../../../store/cartStore';
import { useToastStore } from '../../../store/toastStore';
import { Product } from '../../../lib/db/productService';
import { Button } from '../../../components/ui/Button';
import styles from './page.module.css';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, favorites, toggleFavorite } = useCartStore();
  const { addToast } = useToastStore();
  
  const isFavorite = favorites?.includes(product.id) ?? false;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
    addToast(`Añadido: ${quantity}x ${product.name}`, 'success');
  };

  const handleFavoriteClick = () => {
    toggleFavorite(product.id);
  };

  return (
    <div className={styles.clientActions}>
      <div className={styles.quantitySelector}>
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className={styles.quantityBtn}
        >
          -
        </button>
        <span className={styles.quantityValue}>{quantity}</span>
        <button 
          onClick={() => setQuantity(quantity + 1)}
          className={styles.quantityBtn}
        >
          +
        </button>
      </div>

      <div className={styles.actionButtons}>
        <Button 
          variant="primary" 
          onClick={handleAddToCart}
          className={styles.addToCartBtn}
        >
          Agregar al Carrito
        </Button>
        <button 
          className={`${styles.favoriteBtnLg} ${isFavorite ? styles.favoriteActiveLg : ''}`}
          onClick={handleFavoriteClick}
          aria-label="Agregar a favoritos"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
