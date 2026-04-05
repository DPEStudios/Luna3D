/* ──────────────────────────────────────────────
   Order Service — Capa de Datos de Pedidos
   ──────────────────────────────────────────────
   Toda lectura/escritura de pedidos pasa por aquí.
   Usa service role (solo servidor).
   ────────────────────────────────────────────── */

import { getServerClient } from "./client";
import type { OrderRow, OrderStatus } from "./types";

/* ── Tipos públicos ── */

export interface CreateOrderInput {
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    region: string;
  };
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  documentType: "boleta" | "factura";
  factura?: {
    rut: string;
    businessName: string;
    giro: string;
  };
  mpPreferenceId: string;
}

export interface OrderWithItems extends OrderRow {
  items: {
    productId: string | null;
    name: string;
    price: number;
    quantity: number;
  }[];
}

/* ── Crear pedido + cliente (upsert) + items ── */

export async function createOrder(input: CreateOrderInput): Promise<boolean> {
  const supabase = getServerClient();

  /* 1. Upsert del cliente (si ya existe por email, actualiza datos) */
  const { data: customerData, error: customerError } = await supabase
    .from("customers")
    .upsert(
      {
        name: input.customer.name,
        email: input.customer.email,
        phone: input.customer.phone,
        address: input.customer.address,
        city: input.customer.city,
        region: input.customer.region,
      },
      { onConflict: "email" }
    )
    .select("id")
    .single();

  if (customerError || !customerData) {
    console.error("[orderService] Error creando cliente:", customerError);
    return false;
  }

  const customerId = (customerData as { id: string }).id;

  /* 2. Crear la orden */
  const { error: orderError } = await supabase.from("orders").insert({
    id: input.orderId,
    customer_id: customerId,
    status: "pending_payment",
    total: input.total,
    document_type: input.documentType,
    factura_rut: input.factura?.rut ?? null,
    factura_business: input.factura?.businessName ?? null,
    factura_giro: input.factura?.giro ?? null,
    mp_preference_id: input.mpPreferenceId,
    mp_payment_id: null,
    mp_status: null,
  });

  if (orderError) {
    console.error("[orderService] Error creando orden:", orderError);
    return false;
  }

  /* 3. Insertar items del pedido */
  const itemsPayload = input.items.map((item) => ({
    order_id: input.orderId,
    product_id: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsPayload);

  if (itemsError) {
    console.error("[orderService] Error creando items:", itemsError);
    return false;
  }

  console.log(
    `[orderService] Orden ${input.orderId} creada — ${input.items.length} items — $${input.total} CLP`
  );

  return true;
}

/* ── Actualizar estado de pago (desde webhook) ── */

export async function updateOrderPayment(
  orderId: string,
  paymentId: string,
  mpStatus: string,
  newStatus: OrderStatus
): Promise<boolean> {
  const supabase = getServerClient();

  const updateData: Record<string, unknown> = {
    mp_payment_id: paymentId,
    mp_status: mpStatus,
    status: newStatus,
  };

  if (newStatus === "payment_approved") {
    updateData.paid_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("orders")
    .update(updateData)
    .eq("id", orderId);

  if (error) {
    console.error("[orderService] Error actualizando pago:", error);
    return false;
  }

  console.log(
    `[orderService] Orden ${orderId} actualizada — Payment: ${paymentId} — Status: ${newStatus}`
  );

  return true;
}

/* ── Obtener orden por ID ── */

export async function getOrderById(
  orderId: string
): Promise<OrderWithItems | null> {
  const supabase = getServerClient();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !order) return null;

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("product_id, name, price, quantity")
    .eq("order_id", orderId);

  if (itemsError) {
    console.error("[orderService] Error obteniendo items:", itemsError);
  }

  type ItemRow = { product_id: string | null; name: string; price: number; quantity: number };
  const itemRows = (items as ItemRow[]) ?? [];

  return {
    ...(order as OrderRow),
    items: itemRows.map((item) => ({
      productId: item.product_id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  };
}

/* ── Obtener pedidos por email del cliente ── */

export async function getOrdersByEmail(
  email: string
): Promise<OrderRow[]> {
  const supabase = getServerClient();

  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("email", email)
    .single();

  if (!customer) return [];

  const customerId = (customer as { id: string }).id;

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[orderService] Error obteniendo pedidos:", error);
    return [];
  }

  return (orders as OrderRow[]) ?? [];
}
