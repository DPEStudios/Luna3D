import Link from 'next/link';
import styles from './not-found.module.css';
import { Button } from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Superficie no explorada</h2>
      <p className={styles.message}>
        La ruta que intentas alcanzar no existe en nuestra base de datos. Pudo haber sido eliminada por ineficiencia.
      </p>
      <Link href="/">
        <Button variant="primary">
          Retornar al Catálogo
        </Button>
      </Link>
    </div>
  );
}
