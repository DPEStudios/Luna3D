import React from 'react';
import Link from 'next/link';
import styles from './TrendingCategories.module.css';
import { PlaceholderImage } from '../ui/PlaceholderImage';

interface TrendingItem {
  label: string;
  href: string;
}

const DEFAULT_ITEMS: TrendingItem[] = [
  { label: 'Halloween', href: '/#' },
  { label: 'Regalos', href: '/#' },
  { label: 'Decoración', href: '/#' },
  { label: 'Gadgets', href: '/#' },
  { label: 'Niños', href: '/#' },
];

interface Props {
  items?: TrendingItem[];
}

/**
 * TrendingCategories — five circular category tiles that sit between
 * the hero and the featured carousel. Purely presentational; data is
 * injected via props so the page can swap in seasonal trends later.
 */
export const TrendingCategories: React.FC<Props> = ({ items = DEFAULT_ITEMS }) => {
  return (
    <section className={styles.wrapper} aria-label="Categorías en tendencia">
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.label} className={styles.item}>
            <Link href={item.href} className={styles.link}>
              <div className={styles.circle}>
                <PlaceholderImage shape="circle" aspect="square" label="Sin imagen" />
              </div>
              <span className={styles.label}>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
