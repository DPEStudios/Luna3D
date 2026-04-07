/* ──────────────────────────────────────────────
   Fuente única de verdad: versión + historial
   Header, Footer y la página /changelog leen de aquí.
   ────────────────────────────────────────────── */

export const APP_VERSION = "1.3.0";

export interface VersionEntry {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

export const versionHistory: VersionEntry[] = [
  {
    version: "1.3.0",
    date: "7 de Abril de 2026",
    title: "Interactividad, Conversión y UX Premium",
    changes: [
      "Sistema de notificaciones no intrusivo: Al añadir al carrito, ahora aparece un 'Toast' inteligente en lugar de taparte la pantalla completa con el cajón del carrito.",
      "Componente de Prueba Social: Nueva sección al final del detalle de los productos lista para recibir reseñas y valoraciones, empujando la conversión de compra.",
      "Checkout Ultra Moderno: Despedimos a los aburridos círculos de selección de Boleta/Factura. ¡Ahora usamos increíbles tarjetas interactuables, al estilo de MercadoPago!",
      "Limpieza Técnica Avanzada: El código se liberó de tipados inseguros que alertaba el compilador en los sistemas de Checkout y Autenticación.",
      "Reparada la visualización de las páginas de Acuerdos y Políticas a nivel de producción en la nube."
    ],
  },
  {
    version: "1.2.0",
    date: "5 de Abril de 2026",
    title: "Seguridad y Protección de Datos",
    changes: [
      "Tu información personal ya no viaja expuesta al hacer una compra por WhatsApp. Ahora solo se envía el resumen del pedido.",
      "Todos los campos del formulario de compra ahora se validan antes de enviar: nombre, email, teléfono chileno, RUT y dirección.",
      "Se agregó protección contra manipulación de precios. El servidor verifica cada precio contra el catálogo real.",
      "La página ahora tiene cabeceras de seguridad que protegen contra ataques comunes (clickjacking, inyección de scripts, etc.).",
      "Se limitó la cantidad de pedidos que se pueden enviar por minuto para evitar abusos.",
      "Los datos sensibles como números de contacto ya no están escritos directamente en el código.",
      "Se corrigieron colores que estaban definidos a mano y ahora usan la paleta oficial del sitio.",
    ],
  },
  {
    version: "1.1.0",
    date: "5 de Abril de 2026",
    title: "La Tienda Cobra Vida",
    changes: [
      "Ya puedes agregar productos al carrito y hacer tu pedido completo.",
      "Cada producto tiene su propia página con fotos, descripción, material, tiempo de impresión y plazo de entrega.",
      "Al confirmar tu compra, el pedido se envía directo al WhatsApp de Estrella 3D como mensaje listo.",
      "Puedes marcar productos como favoritos tocando el corazón, y se guardan aunque cierres la página.",
      "El formulario de compra te deja elegir entre Boleta o Factura con campos de RUT y Razón Social.",
      "Se agregó esta sección de actualizaciones para que siempre sepas qué hay de nuevo.",
    ],
  },
  {
    version: "1.0.0",
    date: "4 de Abril de 2026",
    title: "Nace Estrella 3D",
    changes: [
      "Primera versión de la tienda online publicada en internet.",
      "Catálogo inicial con 16 productos de impresión 3D: decoración, gadgets, juguetes y más.",
      "Diseño oscuro con tema espacial púrpura, pensado para verse bien en cualquier pantalla.",
      "Navegación por categorías con menú desplegable de 9 secciones.",
      "Carruseles de productos destacados, recomendados y novedades en la página principal.",
    ],
  },
];
