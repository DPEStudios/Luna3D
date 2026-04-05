/* ──────────────────────────────────────────────
   Database Types — Generados del schema SQL
   ──────────────────────────────────────────────
   Mantener sincronizado con supabase/schema.sql.
   En el futuro se puede autogenerar con:
   npx supabase gen types typescript
   ────────────────────────────────────────────── */

export type OrderStatus =
  | "pending_payment"
  | "payment_approved"
  | "payment_rejected"
  | "payment_pending"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type DocumentType = "boleta" | "factura";

/* ── Row types (lo que retorna Supabase) ── */

export interface ProductRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image: string;
  material: string | null;
  dimensions: string | null;
  print_time: string | null;
  delivery_est: string | null;
  rating: number;
  reviews: number;
  is_new: boolean;
  is_active: boolean;
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface CustomerRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderRow {
  id: string;
  customer_id: string | null;
  status: OrderStatus;
  total: number;
  document_type: DocumentType;
  factura_rut: string | null;
  factura_business: string | null;
  factura_giro: string | null;
  mp_preference_id: string | null;
  mp_payment_id: string | null;
  mp_status: string | null;
  created_at: string;
  paid_at: string | null;
  updated_at: string;
}

export interface OrderItemRow {
  id: string;
  order_id: string;
  product_id: string | null;
  name: string;
  price: number;
  quantity: number;
  created_at: string;
}

/* ── Insert types (lo que enviamos a Supabase) ── */

export type ProductInsert = Omit<ProductRow, "id" | "created_at" | "updated_at"> & {
  id?: string;
};

export type CustomerInsert = Omit<CustomerRow, "id" | "created_at" | "updated_at"> & {
  id?: string;
};

export type OrderInsert = Omit<OrderRow, "created_at" | "updated_at" | "paid_at"> & {
  paid_at?: string;
};

export type OrderItemInsert = Omit<OrderItemRow, "id" | "created_at">;

/* ── Database schema type (para tipado del cliente Supabase) ── */

export interface Database {
  public: {
    Tables: {
      products: {
        Row: ProductRow;
        Insert: ProductInsert;
        Update: Partial<ProductInsert>;
      };
      customers: {
        Row: CustomerRow;
        Insert: CustomerInsert;
        Update: Partial<CustomerInsert>;
      };
      orders: {
        Row: OrderRow;
        Insert: OrderInsert;
        Update: Partial<OrderInsert>;
      };
      order_items: {
        Row: OrderItemRow;
        Insert: OrderItemInsert;
        Update: Partial<OrderItemInsert>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      order_status: OrderStatus;
      document_type: DocumentType;
    };
  };
}
