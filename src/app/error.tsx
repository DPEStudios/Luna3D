"use client";

import { useEffect } from "react";
import styles from "./error.module.css";
import { Button } from "../components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in the future
    console.error("ErrorBoundary caught:", error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Error de Sistema</h2>
      <p className={styles.message}>
        Hemos encontrado un obstáculo al procesar esta vista. En Estrella3D no toleramos fallas recurrentes; este incidente ha sido registrado para su optimización.
      </p>
      <div className={styles.actions}>
        <Button onClick={() => reset()} variant="primary">
          Reintentar Proceso
        </Button>
        <Button onClick={() => window.location.href = '/'} variant="ghost">
          Volver a Seguridad
        </Button>
      </div>
    </div>
  );
}
