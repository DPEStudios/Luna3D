import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Logo.module.css';

/**
 * Logo — componente de marca único y reutilizable.
 *
 * Responsable de renderizar el logotipo oficial de Luna 3D
 * (archivo /public/brand/luna3d_logo_transparente.png) en sus
 * distintas variantes semánticas. Cualquier cambio de marca
 * se hace aquí y se propaga a Header, Footer y Hero.
 *
 * Variantes:
 *  - "compact" : tamaño Header/Footer (altura fija 40px)
 *  - "hero"    : tamaño grande para la home hero (responsive)
 *
 * Por defecto el logo va envuelto en un <Link> a "/" para
 * que haga de botón-home. Pasando `asLink={false}` se renderiza
 * solo la imagen (útil dentro de un hero que ya no es clickeable).
 */
export type LogoVariant = 'compact' | 'hero';

interface LogoProps {
  variant?: LogoVariant;
  asLink?: boolean;
  /**
   * Clase extra para sobreescribir estilos desde el padre
   * sin romper la separación de responsabilidades.
   */
  className?: string;
  /**
   * Si el logo es puramente decorativo (ej. dentro del hero
   * donde ya hay un título accesible), pasar priority=true
   * para que Next/Image lo pre-cargue.
   */
  priority?: boolean;
}

const LOGO_SRC = '/brand/luna3d_logo_transparente.png';
const LOGO_WIDTH = 2865;
const LOGO_HEIGHT = 1553;

export const Logo: React.FC<LogoProps> = ({
  variant = 'compact',
  asLink = true,
  className,
  priority = false,
}) => {
  const variantClass = variant === 'hero' ? styles.hero : styles.compact;
  const wrapperClass = [styles.logoLink, variantClass, className]
    .filter(Boolean)
    .join(' ');

  const img = (
    <Image
      src={LOGO_SRC}
      alt="Luna 3D"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className={styles.image}
      priority={priority}
    />
  );

  if (!asLink) {
    return <span className={wrapperClass}>{img}</span>;
  }

  return (
    <Link
      href="/"
      className={wrapperClass}
      aria-label="Luna 3D — Ir al inicio"
    >
      {img}
    </Link>
  );
};
