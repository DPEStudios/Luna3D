-- ══════════════════════════════════════════════
-- Estrella3D / Luna 3D — Schema de Base de Datos
-- ══════════════════════════════════════════════
-- Ejecutar en el SQL Editor de Supabase Dashboard
-- ══════════════════════════════════════════════

-- ── Extensiones ──
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ══════════════════════════════════════════════
-- PRODUCTOS
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS products (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  description TEXT,
  price       INTEGER NOT NULL CHECK (price > 0),  -- CLP (sin decimales)
  category    TEXT NOT NULL,
  image       TEXT NOT NULL,
  material    TEXT,
  dimensions  TEXT,
  print_time  TEXT,
  delivery_est TEXT,
  rating      NUMERIC(2,1) DEFAULT 0,
  reviews     INTEGER DEFAULT 0,
  is_new      BOOLEAN DEFAULT FALSE,
  is_active   BOOLEAN DEFAULT TRUE,
  stock       INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- ══════════════════════════════════════════════
-- CLIENTES
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS customers (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  phone       TEXT,
  address     TEXT,
  city        TEXT,
  region      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

-- ══════════════════════════════════════════════
-- PEDIDOS (ORDERS)
-- ══════════════════════════════════════════════
CREATE TYPE order_status AS ENUM (
  'pending_payment',
  'payment_approved',
  'payment_rejected',
  'payment_pending',
  'preparing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
);

CREATE TYPE document_type AS ENUM ('boleta', 'factura');

CREATE TABLE IF NOT EXISTS orders (
  id                  UUID PRIMARY KEY,  -- generado por la app (external_reference de MP)
  customer_id         UUID REFERENCES customers(id),
  status              order_status DEFAULT 'pending_payment',
  total               INTEGER NOT NULL CHECK (total > 0),
  document_type       document_type DEFAULT 'boleta',

  -- Datos de factura (opcional)
  factura_rut         TEXT,
  factura_business    TEXT,
  factura_giro        TEXT,

  -- Datos de MercadoPago
  mp_preference_id    TEXT,
  mp_payment_id       TEXT,
  mp_status           TEXT,

  -- Timestamps
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  paid_at             TIMESTAMPTZ,
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_mp_payment ON orders(mp_payment_id);

-- ══════════════════════════════════════════════
-- ITEMS DE PEDIDO
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS order_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES products(id),
  name        TEXT NOT NULL,
  price       INTEGER NOT NULL,
  quantity    INTEGER NOT NULL CHECK (quantity > 0),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- ══════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ══════════════════════════════════════════════

-- Productos: lectura pública, escritura solo admin
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Productos visibles para todos"
  ON products FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Solo service_role puede insertar productos"
  ON products FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Solo service_role puede actualizar productos"
  ON products FOR UPDATE
  USING (TRUE);

-- Orders: solo service_role (las queries van desde el servidor)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Orders acceso server"
  ON orders FOR ALL
  USING (TRUE);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order items acceso server"
  ON order_items FOR ALL
  USING (TRUE);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers acceso server"
  ON customers FOR ALL
  USING (TRUE);

-- ══════════════════════════════════════════════
-- FUNCIÓN: Actualizar updated_at automáticamente
-- ══════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_orders_updated
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_customers_updated
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
