import React from 'react';
import Link from 'next/link';
import styles from './FeaturedGrid.module.css';
import { PlaceholderImage } from '../ui/PlaceholderImage';

interface FeaturedGridProps {
  /** Side of the big image; other side holds the 6 small tiles. */
  bigSide?: 'left' | 'right';
  heading: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Optional labels for the 6 small tiles. */
  smallLabels?: string[];
}

const DEFAULT_SMALL_LABELS = [
  'Sin imagen',
  'Sin imagen',
  'Sin imagen',
  'Sin imagen',
  'Sin imagen',
  'Sin imagen',
];

/**
 * FeaturedGrid — magazine-style block with one oversized hero tile
 * on one side and a 3×2 grid of smaller tiles on the other. The big
 * tile carries a heading + CTA.
 */
export const FeaturedGrid: React.FC<FeaturedGridProps> = ({
  bigSide = 'left',
  heading,
  ctaLabel = 'Explorar',
  ctaHref = '/#',
  smallLabels = DEFAULT_SMALL_LABELS,
}) => {
  const rootClass = bigSide === 'right'
    ? `${styles.grid} ${styles.bigRight}`
    : styles.grid;

  return (
    <section className={rootClass} aria-label={heading}>
      <div className={styles.bigTile}>
        <PlaceholderImage aspect="auto" label="Imagen grande" />
        <div className={styles.bigOverlay}>
          <h3 className={styles.bigHeading}>{heading}</h3>
          <Link href={ctaHref} className={styles.bigCta}>
            {ctaLabel} →
          </Link>
        </div>
      </div>

      <div className={styles.smallGrid}>
        {smallLabels.slice(0, 6).map((label, idx) => (
          <div key={idx} className={styles.smallTile}>
            <PlaceholderImage aspect="square" label={label} />
          </div>
        ))}
      </div>
    </section>
  );
};
