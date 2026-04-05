import { z } from "zod";

/* ──────────────────────────────────────────────
   Utilidades de formato chileno
   ────────────────────────────────────────────── */

/** Valida un RUT chileno (formato 12.345.678-K) */
const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;

/** Valida teléfono chileno (+56 9 XXXX XXXX) */
const phoneRegex = /^\+?56\s?9\s?\d{4}\s?\d{4}$/;

/* ──────────────────────────────────────────────
   Schemas
   ────────────────────────────────────────────── */

export const customerSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre es demasiado largo"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().regex(phoneRegex, "Formato: +56 9 1234 5678"),
  address: z
    .string()
    .min(5, "La dirección es demasiado corta")
    .max(200, "La dirección es demasiado larga"),
  city: z
    .string()
    .min(2, "La ciudad es demasiado corta")
    .max(80, "La ciudad es demasiado larga"),
  region: z.string().min(1, "Selecciona una región"),
});

export const facturaSchema = z.object({
  rut: z.string().regex(rutRegex, "Formato RUT: 12.345.678-K"),
  businessName: z
    .string()
    .min(3, "Razón social muy corta")
    .max(150, "Razón social muy larga"),
  giro: z
    .string()
    .min(3, "Giro muy corto")
    .max(150, "Giro muy largo"),
});

const cartItemSchema = z.object({
  id: z.string(),
  name: z.string().max(200),
  price: z.number().positive("El precio debe ser positivo"),
  image: z.string(),
  quantity: z
    .number()
    .int()
    .min(1, "Cantidad mínima: 1")
    .max(50, "Cantidad máxima: 50"),
});

export const checkoutSchema = z
  .object({
    customer: customerSchema,
    items: z
      .array(cartItemSchema)
      .min(1, "El carrito no puede estar vacío"),
    total: z.number().positive(),
    documentType: z.enum(["boleta", "factura"]),
    factura: facturaSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.documentType === "factura") {
        return data.factura !== undefined;
      }
      return true;
    },
    { message: "Los datos de factura son obligatorios", path: ["factura"] }
  );

/* ──────────────────────────────────────────────
   Tipos derivados del schema
   ────────────────────────────────────────────── */

export type CheckoutPayload = z.infer<typeof checkoutSchema>;
export type CustomerData = z.infer<typeof customerSchema>;
export type FacturaData = z.infer<typeof facturaSchema>;
