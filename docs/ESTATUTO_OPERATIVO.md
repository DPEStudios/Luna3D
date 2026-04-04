# ESTATUTO OPERATIVO: ESTRELLA 3D SpA
## Documento Maestro de Visión, Ingeniería y Escalabilidad

*(Nota: Este documento es el cimiento de la empresa, una fuente de verdad única y un registro vivo que se actualizará continuamente con el avance del proyecto, según las instrucciones del protocolo de memoria)*

### 1. Visión General y Meta Final
**Estrella 3D SpA** no es una tienda de impresión 3D convencional; es un nodo de fabricación inteligente y optimización radical.
**La Meta Final:** Construir un sistema autónomo donde la IA identifique tendencias de consumo, optimice los diseños para el menor uso de recurso posible (tiempo/material), y los ponga a la venta en plataformas propias (Luna3D y Solar3D) con mínima intervención humana. Del diseño a la venta en el menor tiempo de la industria.

### 2. El "Algoritmo de la Empresa" (Filosofía de Trabajo)
- **Cuestionar cada Requisito**: Cada gramo y cada segundo importan. ¿El relleno al 15% cumple si usamos giroidal?
- **Eliminar Partes o Procesos**: Rediseño antes que usar soportes. "La mejor pieza es la que no existe pero cumple su función".
- **Simplificar y Optimizar**: Reducir cambios de color innecesarios, menos piezas, favorecer el *Print-in-place*.
- **Acelerar el Tiempo de Ciclo**: Una vez simplificado el diseño, exprimir al máximo la aceleración de la Bambu Lab A1.
- **Automatización Total**: Intervención humana solo para decisiones creativas y mantenimiento. Búsqueda de diseños, mockups, copy SEO y subida automática por parte de la IA.

### 3. Arquitectura del Ecosistema

#### 🌙 División Luna 3D (B2C - Consumo y Tendencia)
- **Propósito**: Flujo de caja rápido. Tendencias (maceteros, decoración, gadgets).
- **Estrategia**: Detección de virales y despliegue rápido en la web en < 2 horas.
- **Identidad**: Marca fresca, rápida y accesible (luna3d.cl).

#### ☀️ División Solar 3D (B2B - Industrial)
- **Propósito**: Piezas técnicas, prototipado industrial a escala.
- **Estrategia**: Diferenciación por ingeniería (piezas optimizadas: ligeras, fuertes, baratas).
- **Identidad**: Seriedad y precisión técnica estricta (solar3d.cl).

### 4. Recursos y Stack Tecnológico
- **Hardware de Producción**: Bambu Lab A1 + AMS Lite.
- **Inventario Base (Filamentos)**: Blanco, Negro, Verde y Café.
- **Stack Web**:
  - **Framework**: Next.js (enfocado en performance extrema < 1s).
  - **Base de Datos**: Supabase (Pendiente de confirmación).
  - **Pasarela de Pagos**: Mercado Pago API (Chile).
  - **Hosting**: Hostinger o similar.
- **Cerebro (IA)**: Rol esencial para desarrollo de sistemas, copy, detección y automatización.

### 5. Hoja de Ruta Operativa (Paso a Paso)
- **Paso 1**: Tienda Base (Luna3D). Panel Admin de drag & drop para subir STLs y auto-generar datos de venta.
- **Paso 2**: Pipeline visual con Mockups Digitales gestionados con IA para evitar sesiones de fotos por producto.
- **Paso 3**: Checkout automatizado y notificaciones IA al celular al ocurrir ventas.
- **Paso 4**: Automatización del "Input" (Script de MakerWorld/Printables + filtro por licencias/colores permitidos).

### 6. Métricas y KPIs de Control
1. **Costo Real por Pieza**: `(Gramos de material * precio filamento) + (Tiempo de impresión * costo energía)`
2. **Margen de Ganancia**: Mínimo de 300% sobre el costo de producción.
3. **Tasa de Fallos**: No más del 2%.

---

## LOG DE ACTUALIZACIONES (Registro Continuo)
Se deberá incorporar a este log cada avance, decisión tomada y nueva implementación en la web.

- **[2026-04-03]**: Creación de este Estatuto. Se definió la visión, el plan de trabajo B2C/B2B y la tecnología. 
  *Decisiones Críticas a responder por el equipo de Estrella 3D:*
  - **Logística**: ¿Se utilizará Starken, Chilexpress o Blue Express? ¿Cálculo automático de envíos o "envío por pagar"?
  - **Base de Datos**: ¿Aprobamos Supabase para el panel y sistema?
  - **Diseño Visual**: ¿Mantenemos en Luna 3D un look minimalista "Apple", o nos vamos por algo lúdico y colorido?

- **[2026-04-03]**: Ejecución de Fase 1 para *luna3d.cl*. 
  - Se configuró la arquitectura CSS (Vainilla CSS por performance, usando variables en `tokens.css` y `globals.css`).
  - Se definieron los componentes atómicos iniciales (`Button`, `ProductCard`, `ProductCatalog`, `Header`).
  - El diseño predeterminado es un look limpio y tecnológico (blanco, gris y detalles *Neon Green* para representar la marca Luna 3D de manera vibrante).
  - Se generaron 3 imágenes de prueba empleando IA y se armó el catálogo en mock.
  - El proyecto ha quedado validado con compilación exitosa (0 errores).

