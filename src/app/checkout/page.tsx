"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../../components/ui/Button';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import styles from './page.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [docType, setDocType] = useState<'boleta' | 'factura'>('boleta');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedTotal = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(total);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const orderPayload = {
      customer: data,
      items: items,
      total: total,
      documentType: docType
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      
      if (response.ok) {
        clearCart();
        
        // Generar mensaje para WhatsApp
        const waNumber = "56900000000"; // Placeholder para el número del dueño
        let msg = `Hola Estrella3D, quiero realizar el siguiente pedido:%0A%0A`;
        items.forEach(i => {
          msg += `- ${i.quantity}x ${i.name} (${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(i.price * i.quantity)})%0A`;
        });
        msg += `%0A*Total: ${formattedTotal}*%0A%0A`;
        msg += `*Datos del Cliente:*%0ANombre: ${data.name}%0AEmail: ${data.email}%0ADirección: ${data.address}, ${data.city}%0A`;
        if (docType === 'factura') {
          msg += `Solicita FACTURA (RUT: ${data.rut})`;
        } else {
          msg += `Solicita BOLETA`;
        }

        const waUrl = `https://wa.me/${waNumber}?text=${msg}`;
        window.location.href = waUrl;

      } else {
        alert('Hubo un error al procesar tu pedido. Intenta nuevamente.');
      }
    } catch (error) {
      alert('Error de conexión');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.main}>
        <Header />
        <main className={styles.emptyContainer}>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega modelos 3D antes de ir a pagar.</p>
          <Link href="/">
            <Button>Volver al catálogo</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Header />
      
      <main className={styles.container}>
        <div className={styles.header}>
          <Link href="/">&larr; Volver</Link>
          <h1>Finalizar Compra</h1>
        </div>

        <div className={styles.grid}>
          {/* Checkout Form */}
          <form id="checkout-form" className={styles.formSection} onSubmit={handleSubmit}>
            <section className={styles.fieldset}>
              <h2>1. Datos de Contacto</h2>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Nombre y Apellido</label>
                  <input type="text" id="name" name="name" required placeholder="Ej: Juan Pérez" />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Correo Electrónico</label>
                  <input type="email" id="email" name="email" required placeholder="tu@correo.com" />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="phone">Teléfono (WhatsApp)</label>
                <input type="tel" id="phone" name="phone" required placeholder="+56 9 1234 5678" />
              </div>
            </section>

            <section className={styles.fieldset}>
              <h2>2. Despacho</h2>
              <div className={styles.inputGroup}>
                <label htmlFor="address">Dirección de Envío</label>
                <input type="text" id="address" name="address" required placeholder="Calle, Número, Depto" />
              </div>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="city">Ciudad / Comuna</label>
                  <input type="text" id="city" name="city" required />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="region">Región</label>
                  <select id="region" name="region" required>
                    <option value="">Selecciona tu región...</option>
                    <option value="RM">Metropolitana</option>
                    <option value="V">Valparaíso</option>
                    <option value="VIII">Biobío</option>
                    <option value="other">Otra</option>
                  </select>
                </div>
              </div>
            </section>

            <section className={styles.fieldset}>
              <h2>3. Documento Tributario</h2>
              <div className={styles.docTypeToggle}>
                <label className={`${styles.toggleLabel} ${docType === 'boleta' ? styles.activeDoc : ''}`}>
                  <input type="radio" name="document" value="boleta" checked={docType === 'boleta'} onChange={() => setDocType('boleta')} />
                  Boleta
                </label>
                <label className={`${styles.toggleLabel} ${docType === 'factura' ? styles.activeDoc : ''}`}>
                  <input type="radio" name="document" value="factura" checked={docType === 'factura'} onChange={() => setDocType('factura')} />
                  Factura
                </label>
              </div>

              {docType === 'factura' && (
                <div className={styles.facturaFields}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="rut">RUT Empresa</label>
                    <input type="text" id="rut" name="rut" placeholder="12.345.678-9" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="businessName">Razón Social</label>
                    <input type="text" id="businessName" name="businessName" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="giro">Giro</label>
                    <input type="text" id="giro" name="giro" required />
                  </div>
                </div>
              )}
            </section>

            {/* Mobile Submit Button shows up under form, but on desktop we rely on the summary sidebar button. We will duplicate the button for simplicity and CSS handle hiding. */}
            <Button 
              type="submit" 
              variant="primary" 
              className={styles.mobileSubmitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Procesando...' : `Pagar ${formattedTotal}`}
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
                    {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>{formattedTotal}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Envío</span>
                <span className={styles.shippingNotice}>Por calcular</span>
              </div>
              <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                <span>Total a Pagar</span>
                <span>{formattedTotal}</span>
              </div>
            </div>

            <Button 
              type="submit" 
              form="checkout-form" 
              variant="primary" 
              className={styles.desktopSubmitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Procesando...' : 'Confirmar y Pagar'}
            </Button>
            
            <p className={styles.securityNotice}>
              🔒 Tus datos están encriptados y procesados de manera segura.
            </p>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
