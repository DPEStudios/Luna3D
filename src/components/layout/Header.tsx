"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { CategoryMenu } from './CategoryMenu';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { AuthModal } from '../auth/AuthModal';
import { APP_VERSION } from '../../lib/changelog';
import { ThemeToggle } from '../ui/ThemeToggle';

/**
 * Top-level navigation links.
 * Kept as data so order/labels can change without touching JSX.
 */
const NAV_LINKS: Array<{ label: string; href: string }> = [
  { label: 'Home', href: '/' },
  { label: 'Productos Destacados', href: '/#modelos-destacados' },
  { label: 'Acerca de Nosotros', href: '/about' },
  { label: 'Contáctanos', href: '/#contacto' },
];

export const Header: React.FC = () => {
  const { items, openCart } = useCartStore();
  const { isAuthenticated, user, openAuthModal, logout, initialize } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initialize();
    setMounted(true);
  }, [initialize]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Link href="/" className={styles.logo}>
          LUNA<span>3D</span>
          <span className={styles.versionBadge}>v{APP_VERSION}</span>
        </Link>
        <CategoryMenu />
        <nav className={styles.nav} aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <Link key={link.href + link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>
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
        <ThemeToggle />

        {mounted && isAuthenticated ? (
          <div className={styles.userMenu}>
            <span className={styles.loginText}>Hola, {user?.name.split(' ')[0]}</span>
            <button className={styles.logoutBtn} onClick={logout}>Salir</button>
          </div>
        ) : (
          <button className={styles.loginGroup} onClick={openAuthModal} aria-label="Ingresar a tu cuenta">
            <span className={styles.loginText}>Ingresar</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        <button className={styles.iconButton} onClick={openCart} aria-label="Abrir carrito">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {mounted && totalItems > 0 && (
            <span className={styles.cartBadge}>{totalItems}</span>
          )}
        </button>
      </div>
      <AuthModal />
    </header>
  );
};
