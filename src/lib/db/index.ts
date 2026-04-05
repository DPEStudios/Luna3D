/* ── Barrel export para la capa de datos ── */

export { getPublicClient, getServerClient } from "./client";

export {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  getProductBySlug,
  getNewProducts,
  getFeaturedProducts,
  getProductPriceMap,
} from "./productService";
export type { Product } from "./productService";

export {
  createOrder,
  updateOrderPayment,
  getOrderById,
  getOrdersByEmail,
} from "./orderService";
export type { CreateOrderInput, OrderWithItems } from "./orderService";

export type {
  OrderStatus,
  DocumentType,
  ProductRow,
  OrderRow,
  CustomerRow,
} from "./types";
