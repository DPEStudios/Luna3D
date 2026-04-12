"use client";

import React, { useEffect } from 'react';
import { useThemeStore } from '../../store/themeStore';
import styles from './ThemeToggle.module.css';

/**
 * ThemeToggle — dumb UI button, delegates all logic to the theme store.
 * Handles its own Loading/Empty edge case: renders a placeholder with
 * the same dimensions until the store has finished hydrating to avoid
 * SSR flicker.
 */
export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, initialize } = useThemeStore();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    initialize();
    setMounted(true);
  }, [initialize]);

  if (!mounted) {
    return <span className={styles.placeholder} aria-hidden="true" />;
  }

  const isDark = theme === 'dark';
  const label = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {isDark ? (
        // Sun icon (click to go light)
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // Moon icon (click to go dark)
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
};
