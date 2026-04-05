/* ──────────────────────────────────────────────
   Email Templates — Templates HTML para emails
   ──────────────────────────────────────────────
   Templates inline (sin dependencias externas).
   Usa tokens de diseño de Luna 3D adaptados a email.
   ────────────────────────────────────────────── */

/* ── Colores del brand (inline para compatibilidad email) ── */
const COLORS = {
  primary: "#8A4BFF",
  accent: "#E08DF8",
  background: "#191424",
  surface: "#241D35",
  textPrimary: "#F4EFFF",
  textSecondary: "#ADA5C1",
  border: "#3C3155",
  success: "#22C55E",
} as const;

/* ── Tipos ── */

export interface OrderEmailData {
  customerName: string;
  orderId: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  documentType: "boleta" | "factura";
}

/* ── Helpers ── */

function formatCLP(amount: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(amount);
}

/* ── Template: Confirmación de compra (cliente) ── */

export function buildOrderConfirmationEmail(data: OrderEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const shortId = data.orderId.slice(0, 8).toUpperCase();

  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid ${COLORS.border}; color: ${COLORS.textPrimary}; font-size: 14px;">
          ${item.name}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid ${COLORS.border}; color: ${COLORS.textSecondary}; font-size: 14px; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid ${COLORS.border}; color: ${COLORS.textPrimary}; font-size: 14px; text-align: right;">
          ${formatCLP(item.price * item.quantity)}
        </td>
      </tr>`
    )
    .join("");

  const itemsText = data.items
    .map((item) => `  - ${item.quantity}x ${item.name}: ${formatCLP(item.price * item.quantity)}`)
    .join("\n");

  const subject = `Pedido confirmado #${shortId} — Luna 3D`;

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: ${COLORS.background}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: ${COLORS.background}; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: ${COLORS.surface}; border-radius: 16px; border: 1px solid ${COLORS.border}; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="padding: 32px 24px 16px; text-align: center; border-bottom: 1px solid ${COLORS.border};">
              <div style="font-size: 28px; font-weight: 700; color: ${COLORS.primary}; letter-spacing: -0.5px;">
                Luna 3D
              </div>
              <div style="font-size: 12px; color: ${COLORS.textSecondary}; margin-top: 4px; text-transform: uppercase; letter-spacing: 2px;">
                Impresión 3D con Estilo
              </div>
            </td>
          </tr>

          <!-- Success Badge -->
          <tr>
            <td style="padding: 32px 24px 16px; text-align: center;">
              <div style="display: inline-block; background-color: rgba(34, 197, 94, 0.15); border: 1px solid ${COLORS.success}; border-radius: 50px; padding: 8px 24px;">
                <span style="color: ${COLORS.success}; font-size: 14px; font-weight: 600;">Pago Confirmado</span>
              </div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 16px 24px 8px;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: ${COLORS.textPrimary};">
                Hola ${data.customerName.split(" ")[0]}!
              </h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: ${COLORS.textSecondary}; line-height: 1.6;">
                Tu pedido ha sido confirmado y estamos preparando tus productos 3D. Te avisaremos cuando estén listos para despacho.
              </p>
            </td>
          </tr>

          <!-- Order ID -->
          <tr>
            <td style="padding: 16px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: ${COLORS.background}; border-radius: 8px; border: 1px solid ${COLORS.border};">
                <tr>
                  <td style="padding: 12px 16px;">
                    <span style="font-size: 12px; color: ${COLORS.textSecondary}; text-transform: uppercase; letter-spacing: 1px;">N° de Pedido</span>
                    <div style="font-size: 18px; font-weight: 700; color: ${COLORS.accent}; font-family: monospace; margin-top: 4px;">
                      #${shortId}
                    </div>
                  </td>
                  <td style="padding: 12px 16px; text-align: right;">
                    <span style="font-size: 12px; color: ${COLORS.textSecondary}; text-transform: uppercase; letter-spacing: 1px;">Documento</span>
                    <div style="font-size: 14px; font-weight: 600; color: ${COLORS.textPrimary}; margin-top: 4px;">
                      ${data.documentType === "factura" ? "Factura" : "Boleta"}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items Table -->
          <tr>
            <td style="padding: 8px 24px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <thead>
                  <tr>
                    <th style="padding: 8px 16px; text-align: left; font-size: 11px; color: ${COLORS.textSecondary}; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid ${COLORS.border};">Producto</th>
                    <th style="padding: 8px 16px; text-align: center; font-size: 11px; color: ${COLORS.textSecondary}; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid ${COLORS.border};">Cant.</th>
                    <th style="padding: 8px 16px; text-align: right; font-size: 11px; color: ${COLORS.textSecondary}; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid ${COLORS.border};">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Total -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.accent}22); border-radius: 8px; border: 1px solid ${COLORS.primary}44;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <span style="font-size: 14px; color: ${COLORS.textSecondary};">Total Pagado</span>
                  </td>
                  <td style="padding: 16px 20px; text-align: right;">
                    <span style="font-size: 22px; font-weight: 700; color: ${COLORS.textPrimary};">${formatCLP(data.total)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px; text-align: center; border-top: 1px solid ${COLORS.border};">
              <p style="margin: 0; font-size: 12px; color: ${COLORS.textSecondary}; line-height: 1.6;">
                Si tienes dudas, responde este email o escríbenos por WhatsApp.
              </p>
              <p style="margin: 12px 0 0; font-size: 11px; color: ${COLORS.border};">
                Luna 3D — Estrella3D SpA — Chile
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Hola ${data.customerName.split(" ")[0]}!

Tu pedido #${shortId} ha sido confirmado.

Detalle:
${itemsText}

Total: ${formatCLP(data.total)}
Documento: ${data.documentType === "factura" ? "Factura" : "Boleta"}

Estamos preparando tus productos 3D. Te avisaremos cuando estén listos.

— Luna 3D`;

  return { subject, html, text };
}
