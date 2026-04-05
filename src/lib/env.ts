/* ──────────────────────────────────────────────
   Wrapper de variables de entorno
   Centraliza el acceso → si algo cambia, se edita aquí.
   ────────────────────────────────────────────── */

/** Variables públicas (disponibles en cliente y servidor) */
export const publicEnv = {
  waNumber: process.env.NEXT_PUBLIC_WA_NUMBER ?? "56900000000",
  /** "sandbox" para desarrollo, "production" para producción */
  paymentMode: (process.env.NEXT_PUBLIC_PAYMENT_MODE ?? "sandbox") as
    | "sandbox"
    | "production",
  /** URL pública de Supabase */
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  /** Anon key de Supabase (segura para el cliente) */
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
} as const;

/** Variables privadas (solo servidor) */
export const serverEnv = {
  checkoutRateLimitPerMin: Number(
    process.env.CHECKOUT_RATE_LIMIT_PER_MIN ?? "10"
  ),
  /** Access Token de MercadoPago (TEST o PROD según entorno) */
  mercadoPagoAccessToken: process.env.MERCADOPAGO_ACCESS_TOKEN ?? "",
  /** URL base de la app (para back_urls y webhook) */
  appBaseUrl: process.env.APP_BASE_URL ?? "http://localhost:3000",
  /** Webhook secret para validar notificaciones de MercadoPago */
  mercadoPagoWebhookSecret: process.env.MERCADOPAGO_WEBHOOK_SECRET ?? "",
  /** Service role key de Supabase (acceso total, solo servidor) */
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  /** API Key de Resend para emails transaccionales */
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  /** Email remitente (debe estar verificado en Resend) */
  emailFrom: process.env.EMAIL_FROM ?? "Luna 3D <onboarding@resend.dev>",
  /** WhatsApp del dueño para notificaciones de ventas */
  ownerWhatsApp: process.env.OWNER_WHATSAPP ?? "56900000000",
} as const;
