"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { CategoryMenu } from './CategoryMenu';
import { useCartStore } from '../../store/cartStore';

export const Header: React.FC = () => {
  const { items, openCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Link href="/" className={styles.logo}>
          LUNA<span>3D</span>
          <span className={styles.versionBadge}>v1.2</span>
        </Link>
        <CategoryMenu />
      </div>

      <div className={styles.centerSection}>
        <div className={styles.searchBar}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input type="text" placeholder="Buscar modelos, ej. gato..." className={styles.searchInput} />
        </div>
      </div>

      <div className={styles.rightSection}>
        <button className={styles.iconButton}>
          <span className={styles.loginText}>Ingresar</span>
        </button>
        <button className={styles.iconButton} onClick={openCart}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {mounted && totalItems > 0 && (
            <span className={styles.cartBadge}>{totalItems}</span>
          )}
        </button>
      </div>
    </header>
  );
};
