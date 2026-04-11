import React from 'react';
import styles from './PlaceholderImage.module.css';

interface PlaceholderImageProps {
  label?: string;
  shape?: 'rect' | 'circle';
  aspect?: 'square' | 'wide' | 'tall' | 'auto';
  className?: string;
}

/**
 * PlaceholderImage — neutral "sin imagen" tile used until the user
 * provides real assets. Honors theme tokens so it looks right in
 * both the dark and light themes.
 */
export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  label = 'Sin imagen',
  shape = 'rect',
  aspect = 'square',
  className,
}) => {
  const classes = [
    styles.placeholder,
    styles[`aspect_${aspect}`],
    shape === 'circle' ? styles.circle : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="img" aria-label={label}>
      <div className={styles.inner}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
};
