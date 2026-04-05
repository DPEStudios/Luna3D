/* ──────────────────────────────────────────────
   Notification Orchestrator
   ──────────────────────────────────────────────
   Punto de entrada único para todas las notificaciones.
   Coordina email al cliente + WhatsApp al dueño.
   ────────────────────────────────────────────── */

import { sendEmail } from "./emailService";
import {
  buildOrderConfirmationEmail,
  type OrderEmailData,
} from "./emailTemplates";
import {
  buildOwnerNotificationLink,
  buildCustomerContactLink,
  type WhatsAppNotificationData,
} from "./whatsappService";

export type { OrderEmailData } from "./emailTemplates";
export type { WhatsAppNotificationData } from "./whatsappService";
export { buildCustomerContactLink } from "./whatsappService";

/* ── Tipos del orquestador ── */

export interface OrderNotificationInput {
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  documentType: "boleta" | "factura";
}

export interface NotificationResult {
  emailSent: boolean;
  emailError?: string;
  ownerWhatsAppLink: string;
  customerWhatsAppLink: string;
}

/* ── Función principal: notificar pago aprobado ── */

export async function notifyPaymentApproved(
  input: OrderNotificationInput
): Promise<NotificationResult> {
  /* 1. Enviar email de confirmación al cliente */
  const emailData: OrderEmailData = {
    customerName: input.customer.name,
    orderId: input.orderId,
    items: input.items,
    total: input.total,
    documentType: input.documentType,
  };

  const { subject, html, text } = buildOrderConfirmationEmail(emailData);

  const emailResult = await sendEmail({
    to: input.customer.email,
    subject,
    html,
    text,
  });

  /* 2. Generar link de WhatsApp para notificar al dueño */
  const waData: WhatsAppNotificationData = {
    orderId: input.orderId,
    customerName: input.customer.name,
    customerPhone: input.customer.phone,
    total: input.total,
    itemCount: input.items.reduce((sum, i) => sum + i.quantity, 0),
    items: input.items,
  };

  const ownerWhatsAppLink = buildOwnerNotificationLink(waData);
  const customerWhatsAppLink = buildCustomerContactLink(
    input.customer.phone,
    input.orderId
  );

  /* 3. Log del resultado */
  console.log(
    `[notifications] Pedido ${input.orderId.slice(0, 8)} — Email: ${emailResult.success ? "✅" : "❌"} — WA Owner Link generado`
  );
  console.log(`[notifications] WA Dueño: ${ownerWhatsAppLink}`);

  return {
    emailSent: emailResult.success,
    emailError: emailResult.error,
    ownerWhatsAppLink,
    customerWhatsAppLink,
  };
}
