import { NextResponse } from "next/server";
import { checkoutSchema } from "../../../lib/validation";
import { serverEnv } from "../../../lib/env";
import { createPaymentPreference } from "../../../lib/paymentGateway";
import { getProductPriceMap, createOrder } from "../../../lib/db";

/* ──────────────────────────────────────────────
   Rate limiter en memoria (por IP)
   En producción reemplazar por Redis / Upstash.
   ────────────────────────────────────────────── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = serverEnv.checkoutRateLimitPerMin;

  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count += 1;
  return entry.count > maxRequests;
}

/* ──────────────────────────────────────────────
   POST /api/checkout
   Valida datos → verifica precios (DB) → crea orden → crea preferencia MP → retorna URL
   ────────────────────────────────────────────── */
export async function POST(request: Request) {
  /* 1. Rate limiting */
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Demasiadas solicitudes. Intenta en 1 minuto." },
      { status: 429 }
    );
  }

  /* 2. Content-Type guard */
  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return NextResponse.json(
      { success: false, error: "Content-Type debe ser application/json" },
      { status: 415 }
    );
  }

  /* 3. Tamaño máximo del body (50 KB) */
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 50_000) {
    return NextResponse.json(
      { success: false, error: "Payload demasiado grande" },
      { status: 413 }
    );
  }

  try {
    const body = await request.json();

    /* 4. Validación de schema */
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Datos inválidos",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    /* 5. Verificación de precios contra DB (fuente de verdad) */
    const priceMap = await getProductPriceMap();

    let expectedTotal = 0;
    for (const item of parsed.data.items) {
      const catalogProduct = priceMap.get(item.id);
      if (!catalogProduct || catalogProduct.price !== item.price) {
        return NextResponse.json(
          { success: false, error: "Precio de producto no coincide con catálogo" },
          { status: 422 }
        );
      }
      expectedTotal += catalogProduct.price * item.quantity;
    }

    if (expectedTotal !== parsed.data.total) {
      return NextResponse.json(
        { success: false, error: "El total no coincide con los ítems" },
        { status: 422 }
      );
    }

    /* 6. Generar ID de orden */
    const orderId = crypto.randomUUID();

    /* 7. Crear preferencia de pago en MercadoPago */
    const preference = await createPaymentPreference({
      items: parsed.data.items.map((item) => {
        const catalogProduct = priceMap.get(item.id);
        return {
          id: item.id,
          title: catalogProduct?.name ?? item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          pictureUrl: catalogProduct?.image
            ? `${serverEnv.appBaseUrl}${catalogProduct.image}`
            : undefined,
        };
      }),
      payer: {
        name: parsed.data.customer.name,
        email: parsed.data.customer.email,
        phone: parsed.data.customer.phone,
      },
      externalReference: orderId,
    });

    /* 8. Guardar orden en la base de datos */
    const orderCreated = await createOrder({
      orderId,
      customer: parsed.data.customer,
      items: parsed.data.items.map((item) => ({
        productId: item.id,
        name: priceMap.get(item.id)?.name ?? item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: expectedTotal,
      documentType: parsed.data.documentType,
      factura: parsed.data.factura,
      mpPreferenceId: preference.preferenceId,
    });

    if (!orderCreated) {
      return NextResponse.json(
        { success: false, error: "Error al registrar el pedido" },
        { status: 500 }
      );
    }

    console.log(
      `[checkout] Orden creada — ${orderId} — $${expectedTotal} CLP — Preference: ${preference.preferenceId}`
    );

    /* 9. Retornar URL de pago al frontend */
    return NextResponse.json({
      success: true,
      orderId,
      preferenceId: preference.preferenceId,
      paymentUrl: preference.initPointUrl,
      sandboxPaymentUrl: preference.sandboxInitPointUrl,
    });
  } catch (error) {
    console.error("[checkout] Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Error interno del servidor";

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
