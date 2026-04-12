import React from 'react';
import Link from 'next/link';
import styles from './MiniHero.module.css';
import { PlaceholderImage } from '../ui/PlaceholderImage';

interface MiniHeroProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * MiniHero — compact full-width banner used lower in the homepage,
 * a smaller sibling to the main hero.
 */
export const MiniHero: React.FC<MiniHeroProps> = ({
  title = 'Diseñado para ti',
  subtitle = 'Descubre piezas únicas impresas en 3D, pensadas para tu estilo.',
  ctaLabel = 'Ver catálogo',
  ctaHref = '/#',
}) => {
  return (
    <section className={styles.banner} aria-label={title}>
      <div className={styles.media}>
        <PlaceholderImage aspect="auto" label="Imagen banner" />
      </div>
      <div className={styles.overlay}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
        <Link href={ctaHref} className={styles.cta}>
          {ctaLabel} →
        </Link>
      </div>
    </section>
  );
};
