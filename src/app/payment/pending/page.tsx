"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "../../../store/cartStore";
import { publicEnv } from "../../../lib/env";
import { Button } from "../../../components/ui/Button";
import styles from "../payment-result.module.css";

function PaymentPendingPageContent() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);

  const orderId = searchParams.get("external_reference") ?? "";

  /* Limpiar carrito (el pago fue iniciado, solo falta confirmación) */
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const whatsappMessage = encodeURIComponent(
    `Hola Luna 3D, mi pago está pendiente.\n\nPedido: ${orderId}\n\nMe avisan cuando se confirme?`
  );

  return (
    <div className={styles.main}>      <main className={styles.container}>
        <div className={`${styles.card} ${styles.pendingBorder}`}>
          <div className={styles.icon}>&#8987;</div>
          <h1 className={styles.title}>Pago Pendiente</h1>
          <p className={styles.message}>
            Tu pago está siendo procesado. Esto puede tardar unos minutos o
            hasta 2 días hábiles dependiendo del medio de pago elegido. Te
            notificaremos cuando se confirme.
          </p>

          {orderId && (
            <div className={styles.orderId}>Pedido: {orderId.slice(0, 8)}</div>
          )}

          <div className={styles.actions}>
            <Link href="/">
              <Button variant="primary">Volver al Inicio</Button>
            </Link>
            <a
              href={`https://wa.me/${publicEnv.waNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappLink}
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </main>    </div>
  );
}

export default function PaymentPendingPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PaymentPendingPageContent />
    </Suspense>
  );
}
