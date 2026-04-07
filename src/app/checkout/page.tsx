"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';
import { customerSchema, facturaSchema } from '../../lib/validation';
import { publicEnv } from '../../lib/env';
import { Button } from '../../components/ui/Button';
import styles from './page.module.css';

type FieldErrors = Record<string, string>;

interface CheckoutApiResponse {
  success: boolean;
  orderId?: string;
  paymentUrl?: string;
  sandboxPaymentUrl?: string;
  error?: string;
  details?: Record<string, string[]>;
}

export default function CheckoutPage() {
  const { items } = useCartStore();
  const [docType, setDocType] = useState<'boleta' | 'factura'>('boleta');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formatCLP = (amount: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries()) as Record<string, string>;

    /* ── Validación client-side ── */
    const customerResult = customerSchema.safeParse(raw);
    if (!customerResult.success) {
      const flat = customerResult.error.flatten().fieldErrors;
      const mapped: FieldErrors = {};
      for (const [key, msgs] of Object.entries(flat)) {
        if (msgs && msgs.length > 0) mapped[key] = msgs[0];
      }
      setErrors(mapped);
      setIsSubmitting(false);
      return;
    }

    let facturaData = undefined;
    if (docType === 'factura') {
      const facturaResult = facturaSchema.safeParse(raw);
      if (!facturaResult.success) {
        const flat = facturaResult.error.flatten().fieldErrors;
        const mapped: FieldErrors = {};
        for (const [key, msgs] of Object.entries(flat)) {
          if (msgs && msgs.length > 0) mapped[key] = msgs[0];
        }
        setErrors(mapped);
        setIsSubmitting(false);
        return;
      }
      facturaData = facturaResult.data;
    }

    /* ── Envío al servidor → crea preferencia MP → redirige ── */
    const orderPayload = {
      customer: customerResult.data,
      items,
      total,
      documentType: docType,
      factura: facturaData,
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const result: CheckoutApiResponse = await response.json();

      if (response.ok && result.success) {
        /* Redirigir a MercadoPago (sandbox o producción según config) */
        const paymentUrl =
          publicEnv.paymentMode === "sandbox"
            ? result.sandboxPaymentUrl
            : result.paymentUrl;

        if (paymentUrl) {
          window.location.href = paymentUrl;
          return;
        }

        setErrors({ _form: 'No se pudo generar el enlace de pago. Intenta de nuevo.' });
      } else if (result.details) {
        const mapped: FieldErrors = {};
        for (const [key, msgs] of Object.entries(result.details)) {
          if (Array.isArray(msgs) && msgs.length > 0) mapped[key] = msgs[0] as string;
        }
        setErrors(mapped);
      } else {
        setErrors({ _form: result.error ?? 'Error al procesar tu pedido' });
      }
    } catch {
      setErrors({ _form: 'Error de conexión. Verifica tu internet.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.main}>        <main className={styles.emptyContainer}>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega modelos 3D antes de ir a pagar.</p>
          <Link href="/">
            <Button>Volver al catálogo</Button>
          </Link>
        </main>      </div>
    );
  }

  return (
    <div className={styles.main}>      
      <main className={styles.container}>
        <div className={styles.header}>
          <Link href="/">&larr; Volver</Link>
          <h1>Finalizar Compra</h1>
        </div>

        <div className={styles.grid}>
          {/* Checkout Form */}
          <form id="checkout-form" className={styles.formSection} onSubmit={handleSubmit} noValidate>

            {errors._form && (
              <div className={styles.formError} role="alert">{errors._form}</div>
            )}

            <section className={styles.fieldset}>
              <h2>1. Datos de Contacto</h2>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Nombre y Apellido</label>
                  <input type="text" id="name" name="name" required placeholder="Ej: Juan Pérez" aria-describedby="name-error" />
                  {errors.name && <span id="name-error" className={styles.fieldError}>{errors.name}</span>}
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Correo Electrónico</label>
                  <input type="email" id="email" name="email" required placeholder="tu@correo.com" aria-describedby="email-error" />
                  {errors.email && <span id="email-error" className={styles.fieldError}>{errors.email}</span>}
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="phone">Teléfono (WhatsApp)</label>
                <input type="tel" id="phone" name="phone" required placeholder="+56 9 1234 5678" aria-describedby="phone-error" />
                {errors.phone && <span id="phone-error" className={styles.fieldError}>{errors.phone}</span>}
              </div>
            </section>

            <section className={styles.fieldset}>
              <h2>2. Despacho</h2>
              <div className={styles.inputGroup}>
                <label htmlFor="address">Dirección de Envío</label>
                <input type="text" id="address" name="address" required placeholder="Calle, Número, Depto" aria-describedby="address-error" />
                {errors.address && <span id="address-error" className={styles.fieldError}>{errors.address}</span>}
              </div>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="city">Ciudad / Comuna</label>
                  <input type="text" id="city" name="city" required aria-describedby="city-error" />
                  {errors.city && <span id="city-error" className={styles.fieldError}>{errors.city}</span>}
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="region">Región</label>
                  <select id="region" name="region" required aria-describedby="region-error">
                    <option value="">Selecciona tu región...</option>
                    <option value="RM">Metropolitana</option>
                    <option value="V">Valparaíso</option>
                    <option value="VIII">Biobío</option>
                    <option value="other">Otra</option>
                  </select>
                  {errors.region && <span id="region-error" className={styles.fieldError}>{errors.region}</span>}
                </div>
              </div>
            </section>

            <section className={styles.fieldset}>
              <h2>3. Documento Tributario</h2>
              <div className={styles.docTypeToggle}>
                <label className={`${styles.toggleLabel} ${docType === 'boleta' ? styles.activeDoc : ''}`}>
                  <input type="radio" name="document" value="boleta" checked={docType === 'boleta'} onChange={() => setDocType('boleta')} />
                  <div className={styles.cardContent}>
                    <span className={styles.cardIcon}>📄</span>
                    <div className={styles.cardText}>
                      <strong>Boleta</strong>
                      <span>Consumidor final</span>
                    </div>
                  </div>
                </label>
                <label className={`${styles.toggleLabel} ${docType === 'factura' ? styles.activeDoc : ''}`}>
                  <input type="radio" name="document" value="factura" checked={docType === 'factura'} onChange={() => setDocType('factura')} />
                  <div className={styles.cardContent}>
                    <span className={styles.cardIcon}>🏢</span>
                    <div className={styles.cardText}>
                      <strong>Factura</strong>
                      <span>A empresas</span>
                    </div>
                  </div>
                </label>
              </div>

              {docType === 'factura' && (
                <div className={styles.facturaFields}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="rut">RUT Empresa</label>
                    <input type="text" id="rut" name="rut" placeholder="12.345.678-9" required aria-describedby="rut-error" />
                    {errors.rut && <span id="rut-error" className={styles.fieldError}>{errors.rut}</span>}
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="businessName">Razón Social</label>
                    <input type="text" id="businessName" name="businessName" required aria-describedby="businessName-error" />
                    {errors.businessName && <span id="businessName-error" className={styles.fieldError}>{errors.businessName}</span>}
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="giro">Giro</label>
                    <input type="text" id="giro" name="giro" required aria-describedby="giro-error" />
                    {errors.giro && <span id="giro-error" className={styles.fieldError}>{errors.giro}</span>}
                  </div>
                </div>
              )}
            </section>

            <Button
              type="submit"
              variant="primary"
              className={styles.mobileSubmitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Redirigiendo a MercadoPago...' : `Pagar ${formatCLP(total)}`}
            </Button>
          </form>

          {/* Order Summary Sidebar */}
          <aside className={styles.summarySection}>
            <h2>Resumen del Pedido</h2>
            <div className={styles.summaryItems}>
              {items.map((item) => (
                <div key={item.id} className={styles.summaryItem}>
                  <div className={styles.summaryItemInfo}>
                    <span className={styles.quantity}>{item.quantity}x</span>
                    <span className={styles.name}>{item.name}</span>
                  </div>
                  <span className={styles.price}>
                    {formatCLP(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>{formatCLP(total)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Envío</span>
                <span className={styles.shippingNotice}>Por calcular</span>
              </div>
              <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                <span>Total a Pagar</span>
                <span>{formatCLP(total)}</span>
              </div>
            </div>

            <Button 
              type="submit" 
              form="checkout-form" 
              variant="primary" 
              className={styles.desktopSubmitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Redirigiendo...' : 'Confirmar y Pagar'}
            </Button>
            
            <p className={styles.securityNotice}>
              Pago seguro procesado por MercadoPago. Tus datos financieros nunca pasan por nuestros servidores.
            </p>
          </aside>
        </div>
      </main>    </div>
  );
}
