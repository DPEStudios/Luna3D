"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './CartDrawer.module.css';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Asegurar que el componente solo se renderice en cliente debido al persist
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay oscuro */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`} 
        onClick={handleOverlayClick}
      />
      
      {/* Drawer */}
      <aside className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>Tu Compra</h2>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Cerrar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.5, marginBottom: '8px'}}>
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p style={{fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-primary)'}}>Comienza tu exploración</p>
              <span style={{fontSize: '0.9rem', textAlign: 'center', maxWidth: '250px'}}>Descubre diseños listos para imprimir en nuestra tienda.</span>
              <Button onClick={closeCart} variant="primary" style={{marginTop: '16px'}}>Explorar Modelos 3D</Button>
            </div>
          ) : (
            <div className={styles.itemsList}>
              {items.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImageWrapper}>
                    <Image src={item.image} alt={item.name} fill className={styles.itemImage} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
                    <div className={styles.quantityControls}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span className={styles.totalPrice}>{formatPrice(total)}</span>
            </div>
            <p className={styles.taxNotice}>Impuestos calculados en el checkout</p>
            <Link href="/checkout" onClick={closeCart} style={{textDecoration: 'none', width: '100%'}}>
              <Button variant="primary" className={styles.checkoutBtn} style={{width: '100%'}}>
                Ir a Pagar
              </Button>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};
