/* ──────────────────────────────────────────────
   Product Service — Capa de Datos de Productos
   ──────────────────────────────────────────────
   Toda lectura/escritura de productos pasa por aquí.
   La UI y la lógica de negocio NO conocen Supabase.
   ────────────────────────────────────────────── */

import { getPublicClient, getServerClient } from "./client";
import type { ProductRow } from "./types";

/* ── Tipo público para la app (limpio, sin detalles de DB) ── */
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  material: string;
  dimensions: string;
  printTimeEst: string;
  deliveryEst: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  stock: number;
}

/* ── Mapper: row de DB → tipo de la app ── */
function mapRowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    price: row.price,
    category: row.category,
    image: row.image,
    material: row.material ?? "",
    dimensions: row.dimensions ?? "",
    printTimeEst: row.print_time ?? "",
    deliveryEst: row.delivery_est ?? "",
    rating: Number(row.rating),
    reviews: row.reviews,
    isNew: row.is_new,
    stock: row.stock,
  };
}

/* ── Queries públicas (usan anon key, respetan RLS) ── */

/** Obtener todos los productos activos */
export async function getAllProducts(): Promise<Product[]> {
  const supabase = getPublicClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[productService] Error obteniendo productos:", error);
    return [];
  }

  return ((data as ProductRow[]) ?? []).map(mapRowToProduct);
}

/** Obtener productos por categoría */
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const supabase = getPublicClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[productService] Error por categoría:", error);
    return [];
  }

  return ((data as ProductRow[]) ?? []).map(mapRowToProduct);
}

/** Obtener un producto por ID */
export async function getProductById(
  productId: string
): Promise<Product | null> {
  const supabase = getPublicClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;

  return mapRowToProduct(data as ProductRow);
}

/** Obtener un producto por slug */
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const supabase = getPublicClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;

  return mapRowToProduct(data as ProductRow);
}

/** Obtener productos nuevos (is_new = true) */
export async function getNewProducts(): Promise<Product[]> {
  const supabase = getPublicClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("is_new", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[productService] Error obteniendo nuevos:", error);
    return [];
  }

  return ((data as ProductRow[]) ?? []).map(mapRowToProduct);
}

/** Obtener productos destacados (top rating) */
export async function getFeaturedProducts(
  limit: number = 8
): Promise<Product[]> {
  const supabase = getPublicClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("rating", { ascending: false })
    .order("reviews", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[productService] Error obteniendo destacados:", error);
    return [];
  }

  return ((data as ProductRow[]) ?? []).map(mapRowToProduct);
}

/* ── Queries de servidor (usan service role, para admin/checkout) ── */

/** Obtener mapa de precios para verificación en checkout */
export async function getProductPriceMap(): Promise<
  Map<string, { price: number; name: string; image: string }>
> {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, price, name, image")
    .eq("is_active", true);

  if (error) {
    console.error("[productService] Error obteniendo precios:", error);
    return new Map();
  }

  type PriceRow = { id: string; price: number; name: string; image: string };
  const rows = (data as PriceRow[]) ?? [];

  return new Map(
    rows.map((p) => [p.id, { price: p.price, name: p.name, image: p.image }])
  );
}
