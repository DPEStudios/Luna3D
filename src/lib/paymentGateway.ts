/* ──────────────────────────────────────────────
   Payment Gateway — Wrapper Agnóstico
   ──────────────────────────────────────────────
   Interfaz intermedia entre la app y la pasarela de pago.
   Si mañana cambiamos MercadoPago por Flow, Transbank, Stripe, etc.,
   solo editamos este archivo. El resto de la app no se entera.
   ────────────────────────────────────────────── */

import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { serverEnv } from "./env";

/* ── Tipos públicos (agnósticos de pasarela) ── */

export interface PaymentItem {
  id: string;
  title: string;
  quantity: number;
  unitPrice: number;
  /** URL de imagen del producto (opcional, mejora UX en checkout) */
  pictureUrl?: string;
}

export interface PayerInfo {
  name: string;
  email: string;
  phone?: string;
}

export interface CreatePreferenceInput {
  items: PaymentItem[];
  payer: PayerInfo;
  externalReference: string;
}

export interface PreferenceResult {
  preferenceId: string;
  initPointUrl: string;
  sandboxInitPointUrl: string;
}

export interface PaymentNotification {
  paymentId: string;
  status: PaymentStatus;
  externalReference: string;
  totalPaid: number;
  payerEmail: string;
}

export type PaymentStatus =
  | "approved"
  | "pending"
  | "rejected"
  | "cancelled"
  | "refunded"
  | "in_process";

/* ── Cliente MercadoPago (singleton lazy) ── */

let clientInstance: MercadoPagoConfig | null = null;

function getClient(): MercadoPagoConfig {
  if (clientInstance) return clientInstance;

  const accessToken = serverEnv.mercadoPagoAccessToken;
  if (!accessToken) {
    throw new Error(
      "MERCADOPAGO_ACCESS_TOKEN no configurado. Agrega la variable de entorno."
    );
  }

  clientInstance = new MercadoPagoConfig({ accessToken });
  return clientInstance;
}

/* ── Funciones públicas ── */

/**
 * Crea una preferencia de pago (redirige al usuario a MercadoPago).
 * Retorna URLs de checkout para producción y sandbox.
 */
export async function createPaymentPreference(
  input: CreatePreferenceInput
): Promise<PreferenceResult> {
  const client = getClient();
  const preference = new Preference(client);

  const baseUrl = serverEnv.appBaseUrl;

  const response = await preference.create({
    body: {
      items: input.items.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        currency_id: "CLP",
        picture_url: item.pictureUrl,
      })),
      payer: {
        name: input.payer.name.split(" ")[0],
        surname: input.payer.name.split(" ").slice(1).join(" ") || "",
        email: input.payer.email,
      },
      back_urls: {
        success: `${baseUrl}/payment/success`,
        failure: `${baseUrl}/payment/failure`,
        pending: `${baseUrl}/payment/pending`,
      },
      auto_return: "approved",
      external_reference: input.externalReference,
      notification_url: `${baseUrl}/api/payments/webhook`,
      statement_descriptor: "LUNA3D",
    },
  });

  if (!response.id || !response.init_point) {
    throw new Error("MercadoPago no retornó datos válidos de preferencia");
  }

  return {
    preferenceId: response.id,
    initPointUrl: response.init_point,
    sandboxInitPointUrl: response.sandbox_init_point ?? response.init_point,
  };
}

/**
 * Consulta el estado de un pago por su ID.
 * Usado por el webhook para verificar pagos.
 */
export async function getPaymentDetails(
  paymentId: string
): Promise<PaymentNotification> {
  const client = getClient();
  const payment = new Payment(client);

  const response = await payment.get({ id: paymentId });

  if (!response.id) {
    throw new Error(`Pago ${paymentId} no encontrado en MercadoPago`);
  }

  return {
    paymentId: String(response.id),
    status: mapPaymentStatus(response.status ?? ""),
    externalReference: response.external_reference ?? "",
    totalPaid: response.transaction_amount ?? 0,
    payerEmail: response.payer?.email ?? "",
  };
}

/* ── Helpers internos ── */

function mapPaymentStatus(mpStatus: string): PaymentStatus {
  const statusMap: Record<string, PaymentStatus> = {
    approved: "approved",
    pending: "pending",
    authorized: "pending",
    in_process: "in_process",
    in_mediation: "in_process",
    rejected: "rejected",
    cancelled: "cancelled",
    refunded: "refunded",
    charged_back: "refunded",
  };

  return statusMap[mpStatus] ?? "rejected";
}
