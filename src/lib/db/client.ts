/* ──────────────────────────────────────────────
   Database Client — Wrapper Agnóstico
   ──────────────────────────────────────────────
   Centraliza la conexión a Supabase.
   Si cambiamos a Prisma, Drizzle, etc., solo editamos aquí.
   ────────────────────────────────────────────── */

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { publicEnv, serverEnv } from "../env";

/* ── Cliente público (usa anon key, respeta RLS) ── */
let publicClientInstance: SupabaseClient | null = null;

export function getPublicClient(): SupabaseClient {
  if (publicClientInstance) return publicClientInstance;

  if (!publicEnv.supabaseUrl || !publicEnv.supabaseAnonKey) {
    throw new Error(
      "Supabase no configurado. Agrega NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  publicClientInstance = createClient(
    publicEnv.supabaseUrl,
    publicEnv.supabaseAnonKey
  );

  return publicClientInstance;
}

/* ── Cliente servidor (usa service role key, bypasea RLS) ── */
let serverClientInstance: SupabaseClient | null = null;

export function getServerClient(): SupabaseClient {
  if (serverClientInstance) return serverClientInstance;

  if (!publicEnv.supabaseUrl || !serverEnv.supabaseServiceKey) {
    throw new Error(
      "Supabase server no configurado. Agrega SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  serverClientInstance = createClient(
    publicEnv.supabaseUrl,
    serverEnv.supabaseServiceKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  return serverClientInstance;
}
