/* ──────────────────────────────────────────────
   WhatsApp Service — Notificaciones al dueño
   ──────────────────────────────────────────────
   Genera links de WhatsApp Web API para notificar
   a Daniel de nuevas ventas.

   Nota: Esto usa la API gratuita de wa.me (link directo).
   No envía mensajes automáticos — genera el link que
   el servidor puede loggear o un servicio externo puede abrir.

   Para envío automático real se necesitaría:
   - WhatsApp Business API (Meta)
   - Twilio WhatsApp
   - Baileys (no oficial)
   ────────────────────────────────────────────── */

import { serverEnv } from "../env";

/* ── Tipos ── */

export interface WhatsAppNotificationData {
  orderId: string;
  customerName: string;
  customerPhone: string;
  total: number;
  itemCount: number;
  items: { name: string; quantity: number }[];
}

/* ── Helpers ── */

function formatCLP(amount: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(amount);
}

/* ── Generar link de WhatsApp para notificación al dueño ── */

export function buildOwnerNotificationLink(
  data: WhatsAppNotificationData
): string {
  const shortId = data.orderId.slice(0, 8).toUpperCase();

  const itemsList = data.items
    .map((item) => `  • ${item.quantity}x ${item.name}`)
    .join("\n");

  const message = [
    `🛒 *NUEVA VENTA — Luna 3D*`,
    ``,
    `Pedido: #${shortId}`,
    `Cliente: ${data.customerName}`,
    `Teléfono: ${data.customerPhone}`,
    ``,
    `*Productos (${data.itemCount}):*`,
    itemsList,
    ``,
    `💰 *Total: ${formatCLP(data.total)}*`,
    ``,
    `¡A imprimir! 🖨️`,
  ].join("\n");

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${serverEnv.ownerWhatsApp}?text=${encoded}`;
}

/* ── Generar link de WhatsApp para contactar al cliente ── */

export function buildCustomerContactLink(
  customerPhone: string,
  orderId: string
): string {
  const shortId = orderId.slice(0, 8).toUpperCase();

  const message = [
    `Hola! Soy de Luna 3D 🌙`,
    ``,
    `Tu pedido #${shortId} está listo para despacho.`,
    `Te confirmo los datos de envío?`,
  ].join("\n");

  const encoded = encodeURIComponent(message);
  const cleanPhone = customerPhone.replace(/[\s+]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
