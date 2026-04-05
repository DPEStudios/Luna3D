"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "../../../store/cartStore";
import { publicEnv } from "../../../lib/env";
import { Button } from "../../../components/ui/Button";
import styles from "../payment-result.module.css";

function PaymentSuccessPageContent() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);

  const orderId = searchParams.get("external_reference") ?? "";
  const paymentId = searchParams.get("payment_id") ?? "";

  /* Limpiar carrito al llegar a esta página (pago exitoso) */
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const whatsappMessage = encodeURIComponent(
    `Hola Luna 3D! Mi pago fue aprobado.\n\nPedido: ${orderId}\nPago MP: ${paymentId}\n\nQuedo atento al despacho!`
  );

  return (
    <div className={styles.main}>      <main className={styles.container}>
        <div className={`${styles.card} ${styles.successBorder}`}>
          <div className={styles.icon}>&#10003;</div>
          <h1 className={styles.title}>Pago Exitoso</h1>
          <p className={styles.message}>
            Tu pedido ha sido confirmado y estamos preparando tus productos 3D.
            Te contactaremos cuando estén listos para despacho.
          </p>

          {orderId && (
            <div className={styles.orderId}>Pedido: {orderId.slice(0, 8)}</div>
          )}

          <div className={styles.actions}>
            <Link href="/">
              <Button variant="primary">Seguir Comprando</Button>
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

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PaymentSuccessPageContent />
    </Suspense>
  );
}
