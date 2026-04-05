import { NextResponse } from "next/server";
import { getPaymentDetails } from "../../../../lib/paymentGateway";
import { updateOrderPayment, getOrderById } from "../../../../lib/db";
import { notifyPaymentApproved } from "../../../../lib/notifications";
import type { PaymentNotification } from "../../../../lib/paymentGateway";
import type { OrderStatus } from "../../../../lib/db";

/* ──────────────────────────────────────────────
   POST /api/payments/webhook
   ──────────────────────────────────────────────
   MercadoPago envía notificaciones aquí cuando
   un pago cambia de estado (aprobado, rechazado, etc.).

   Flujo:
   1. Recibe notificación de MP
   2. Consulta el pago para verificar autenticidad
   3. Actualiza la orden en la base de datos
   4. Si aprobado → envía email al cliente + WhatsApp al dueño
   ────────────────────────────────────────────── */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    /* Solo procesamos notificaciones de tipo "payment" */
    if (body.type !== "payment" || !body.data?.id) {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const paymentId = String(body.data.id);

    /* Consultar el pago directamente a MP (nunca confiar en el body del webhook) */
    const paymentDetails = await getPaymentDetails(paymentId);

    console.log(
      `[webhook] Pago ${paymentId} — Estado: ${paymentDetails.status} — Orden: ${paymentDetails.externalReference} — Monto: $${paymentDetails.totalPaid}`
    );

    /* Actualizar en la base de datos y notificar */
    await processPaymentUpdate(paymentDetails);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[webhook] Error procesando notificación:", error);

    /* MercadoPago reintenta si devolvemos error, así que devolvemos 200
       para evitar reintentos infinitos en errores nuestros */
    return NextResponse.json(
      { received: true, error: "Error interno" },
      { status: 200 }
    );
  }
}

/* ──────────────────────────────────────────────
   Procesador de estados de pago
   Mapea estado de MP → estado de la orden en DB → notifica
   ────────────────────────────────────────────── */
async function processPaymentUpdate(
  payment: PaymentNotification
): Promise<void> {
  const statusMapping: Record<string, OrderStatus> = {
    approved: "payment_approved",
    pending: "payment_pending",
    in_process: "payment_pending",
    rejected: "payment_rejected",
    cancelled: "cancelled",
    refunded: "refunded",
  };

  const orderStatus = statusMapping[payment.status] ?? "payment_rejected";

  const updated = await updateOrderPayment(
    payment.externalReference,
    payment.paymentId,
    payment.status,
    orderStatus
  );

  if (!updated) {
    console.error(
      `[webhook] No se pudo actualizar orden ${payment.externalReference}`
    );
    return;
  }

  switch (payment.status) {
    case "approved":
      console.log(
        `[payment] ✅ APROBADO — Orden: ${payment.externalReference} — $${payment.totalPaid} CLP`
      );
      /* Disparar notificaciones (email + WhatsApp) */
      await sendApprovedNotifications(payment.externalReference);
      break;

    case "pending":
    case "in_process":
      console.log(
        `[payment] ⏳ PENDIENTE — Orden: ${payment.externalReference}`
      );
      break;

    case "rejected":
    case "cancelled":
      console.log(
        `[payment] ❌ RECHAZADO/CANCELADO — Orden: ${payment.externalReference}`
      );
      break;

    case "refunded":
      console.log(
        `[payment] 🔄 REEMBOLSADO — Orden: ${payment.externalReference}`
      );
      break;
  }
}

/* ──────────────────────────────────────────────
   Enviar notificaciones cuando un pago es aprobado
   ────────────────────────────────────────────── */
async function sendApprovedNotifications(orderId: string): Promise<void> {
  try {
    /* Obtener la orden completa con items */
    const order = await getOrderById(orderId);
    if (!order) {
      console.error(`[notifications] Orden ${orderId} no encontrada para notificar`);
      return;
    }

    /* Obtener datos del cliente desde la orden */
    const supabase = (await import("../../../../lib/db/client")).getServerClient();
    const { data: customer } = await supabase
      .from("customers")
      .select("name, email, phone")
      .eq("id", order.customer_id)
      .single();

    if (!customer) {
      console.error(`[notifications] Cliente no encontrado para orden ${orderId}`);
      return;
    }

    const customerData = customer as { name: string; email: string; phone: string };

    /* Disparar notificaciones */
    const result = await notifyPaymentApproved({
      orderId,
      customer: {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone ?? "",
      },
      items: order.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: order.total,
      documentType: order.document_type,
    });

    if (!result.emailSent) {
      console.error(
        `[notifications] Error enviando email para orden ${orderId}: ${result.emailError}`
      );
    }
  } catch (error) {
    /* Las notificaciones no deben bloquear el webhook */
    console.error("[notifications] Error en notificaciones:", error);
  }
}
