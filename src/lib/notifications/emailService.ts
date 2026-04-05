/* ──────────────────────────────────────────────
   Email Service — Wrapper Agnóstico (Resend)
   ──────────────────────────────────────────────
   Si cambiamos a SendGrid, Mailgun, etc.,
   solo editamos este archivo.
   ────────────────────────────────────────────── */

import { Resend } from "resend";
import { serverEnv } from "../env";

/* ── Tipos públicos ── */

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  /** Texto plano alternativo (para clientes sin HTML) */
  text?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/* ── Cliente Resend (singleton lazy) ── */

let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (resendInstance) return resendInstance;

  if (!serverEnv.resendApiKey) {
    throw new Error(
      "RESEND_API_KEY no configurado. Agrega la variable de entorno."
    );
  }

  resendInstance = new Resend(serverEnv.resendApiKey);
  return resendInstance;
}

/* ── Función pública ── */

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  try {
    const resend = getResend();

    const { data, error } = await resend.emails.send({
      from: serverEnv.emailFrom,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    });

    if (error) {
      console.error("[emailService] Error enviando email:", error);
      return { success: false, error: error.message };
    }

    console.log(
      `[emailService] Email enviado a ${input.to} — ID: ${data?.id}`
    );

    return { success: true, messageId: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error("[emailService] Error:", message);
    return { success: false, error: message };
  }
}
