"use client";
import { Suspense } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { publicEnv } from "../../../lib/env";
import { Button } from "../../../components/ui/Button";
import styles from "../payment-result.module.css";

function PaymentFailurePageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("external_reference") ?? "";

  const whatsappMessage = encodeURIComponent(
    `Hola Luna 3D, tuve un problema con mi pago.\n\nPedido: ${orderId}\n\nMe pueden ayudar?`
  );

  return (
    <div className={styles.main}>      <main className={styles.container}>
        <div className={`${styles.card} ${styles.failureBorder}`}>
          <div className={styles.icon}>&#10007;</div>
          <h1 className={styles.title}>Pago No Procesado</h1>
          <p className={styles.message}>
            Tu pago no pudo ser procesado. Esto puede ocurrir por fondos
            insuficientes, tarjeta rechazada o un error temporal. No se realizó
            ningún cargo a tu cuenta.
          </p>

          {orderId && (
            <div className={styles.orderId}>Pedido: {orderId.slice(0, 8)}</div>
          )}

          <div className={styles.actions}>
            <Link href="/checkout">
              <Button variant="primary">Reintentar Pago</Button>
            </Link>
            <a
              href={`https://wa.me/${publicEnv.waNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappLink}
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </main>    </div>
  );
}

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PaymentFailurePageContent />
    </Suspense>
  );
}
