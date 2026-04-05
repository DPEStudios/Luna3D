-- ══════════════════════════════════════════════
-- Seed: Migración de los 16 productos mock a Supabase
-- ══════════════════════════════════════════════
-- Ejecutar DESPUÉS de schema.sql en el SQL Editor de Supabase
-- ══════════════════════════════════════════════

INSERT INTO products (slug, name, description, price, category, image, material, dimensions, print_time, delivery_est, rating, reviews, is_new, stock)
VALUES
  ('lampara-hogar-moderna', 'Lámpara Hogar Moderna', 'Lámpara de noche con estilo geométrico. Da una iluminación suave y moderna a cualquier habitación.', 14990, 'Decoración', '/Fotos_productos/house_8bfcbce4-f20a-437a-a761-3843ea30fc2a.webp', 'PLA Reciclable', '15 x 15 x 20 cm', '18 horas', '2-4 días hábiles', 4.8, 12, TRUE, 10),

  ('soporte-joyeria', 'Soporte de Joyería', 'Organizador en forma de árbol para collares y anillos.', 6990, 'Accesorios', '/Fotos_productos/jewelry_7be4939d-5694-44d5-be06-c8ec23221b71.webp', 'PLA Reciclable', '10 x 10 x 25 cm', '6 horas', '2-3 días hábiles', 5.0, 3, FALSE, 15),

  ('organizador-caja', 'Organizador de Caja', 'Caja organizadora con compartimentos modulares para tornillos y accesorios.', 8990, 'Herramientas', '/Fotos_productos/tools-organizers_775b48fe-8032-414c-8a06-9d0aaff8e6df.webp', 'PETG Resistente', '20 x 15 x 5 cm', '12 horas', '2-4 días hábiles', 4.5, 8, FALSE, 8),

  ('soporte-celular-tech', 'Soporte Celular Tech', 'Stand universal para smartphones, ideal para escritorio o velador.', 5490, 'Gadgets', '/Fotos_productos/gadgets_c6369950-2798-4279-801d-da44d5b51244.webp', 'PLA Reciclable', '8 x 8 x 10 cm', '4 horas', '1-3 días hábiles', 4.9, 24, FALSE, 20),

  ('figura-starwars-decorativa', 'Figura StarWars Decorativa', 'Busto hiper-detallado del universo Star Wars, impreso en alta calidad.', 19990, 'Coleccionables', '/Fotos_productos/Starwars 3.webp', 'Resina o PLA Alta Resolución', '12 x 12 x 18 cm', '24 horas', '3-5 días hábiles', 5.0, 45, TRUE, 5),

  ('arana-articulada', 'Araña Articulada', 'Juguete articulado impresión 3D in-place, sin ensamblaje requerido.', 4990, 'Juguetes', '/Fotos_productos/spider.webp', 'PLA Flexible', '15 x 15 x 3 cm', '8 horas', '2-3 días hábiles', 4.7, 19, FALSE, 25),

  ('llavero-toad-multicolor', 'Llavero Toad Multicolor', 'Llavero retro de doble extrusión con colores vibrantes.', 3990, 'Accesorios', '/Fotos_productos/toad multicor logo.webp', 'PLA Reciclable', '4 x 4 x 0.5 cm', '2 horas', '1-2 días hábiles', 4.6, 50, FALSE, 50),

  ('delfin-decorativo', 'Delfín Decorativo', 'Escultura decorativa low-poly para repisas o mesas de centro.', 11990, 'Decoración', '/Fotos_productos/Dolphin-deco-image-1.webp', 'PLA Reciclable', '25 x 10 x 15 cm', '14 horas', '2-4 días hábiles', 4.8, 7, FALSE, 10),

  ('macetero-geometrico', 'Macetero Geométrico', 'Macetero minimalista para cactus y suculentas con drenaje incluido.', 8500, 'Decoración', '/Fotos_productos/house_8bfcbce4-f20a-437a-a761-3843ea30fc2a.webp', 'PETG Exterior', '10 x 10 x 8 cm', '9 horas', '2-4 días hábiles', 4.9, 11, FALSE, 15),

  ('colgante-luna-mistica', 'Colgante Luna Mística', 'Collar geométrico en forma de luna creciente.', 4500, 'Accesorios', '/Fotos_productos/jewelry_7be4939d-5694-44d5-be06-c8ec23221b71.webp', 'PLA Silk', '3 x 3 x 0.3 cm', '1.5 horas', '1-3 días hábiles', 5.0, 2, TRUE, 30),

  ('soporte-auriculares-gamer', 'Soporte Auriculares Gamer', 'Stand para audífonos robusto con base antideslizante.', 12900, 'Gadgets', '/Fotos_productos/gadgets_c6369950-2798-4279-801d-da44d5b51244.webp', 'PLA Resistente', '15 x 15 x 25 cm', '16 horas', '2-4 días hábiles', 4.8, 31, FALSE, 8),

  ('engranaje-precision', 'Engranaje de Precisión', 'Pieza de repuesto o educativa demostrando tolerancia 3D.', 2990, 'Herramientas', '/Fotos_productos/tools-organizers_775b48fe-8032-414c-8a06-9d0aaff8e6df.webp', 'ABS o PETG', '5 x 5 x 2 cm', '3 horas', '2-5 días hábiles', 4.4, 14, FALSE, 40),

  ('busto-mandaloriano', 'Busto Mandaloriano', 'Impresión de colección hiper-realista, modelo exclusivo.', 24900, 'Coleccionables', '/Fotos_productos/Starwars 3.webp', 'PLA Alta Resolución', '15 x 15 x 22 cm', '36 horas', '4-7 días hábiles', 5.0, 89, FALSE, 3),

  ('arana-juguete-xxl', 'Araña de Juguete XXL', 'La versión más grande de nuestro clásico articulado in-place.', 7990, 'Juguetes', '/Fotos_productos/spider.webp', 'PLA Flexible', '25 x 25 x 5 cm', '14 horas', '3-5 días hábiles', 4.9, 42, FALSE, 12),

  ('llavero-estrella-3d', 'Llavero Estrella 3D', 'Llavero corporativo del ecosistema Estrella3D.', 3500, 'Accesorios', '/Fotos_productos/toad multicor logo.webp', 'PLA Reciclable', '4 x 4 x 0.4 cm', '1 hora', '1-2 días hábiles', 4.5, 5, TRUE, 100),

  ('escultura-delfin-base', 'Escultura Delfín Base', 'Versión premiun con base estilizada simulando olas.', 15990, 'Decoración', '/Fotos_productos/Dolphin-deco-image-1.webp', 'PLA Reciclable', '30 x 12 x 18 cm', '20 horas', '3-5 días hábiles', 4.7, 13, FALSE, 6)

ON CONFLICT (slug) DO NOTHING;
