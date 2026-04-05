export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
  description?: string;
  printTimeEst?: string;
  dimensions?: string;
  material?: string;
  deliveryEst?: string;
  rating?: number;
  reviews?: number;
}

export const products: Product[] = [
  { id: "p1", name: "Lámpara Hogar Moderna", price: 14990, category: "Decoración", image: "/Fotos_productos/house_8bfcbce4-f20a-437a-a761-3843ea30fc2a.webp", isNew: true, description: "Lámpara de noche con estilo geométrico. Da una iluminación suave y moderna a cualquier habitación.", printTimeEst: "18 horas", dimensions: "15 x 15 x 20 cm", material: "PLA Reciclable", deliveryEst: "2-4 días hábiles", rating: 4.8, reviews: 12 },
  { id: "p2", name: "Soporte de Joyería", price: 6990, category: "Accesorios", image: "/Fotos_productos/jewelry_7be4939d-5694-44d5-be06-c8ec23221b71.webp", description: "Organizador en forma de árbol para collares y anillos.", printTimeEst: "6 horas", dimensions: "10 x 10 x 25 cm", material: "PLA Reciclable", deliveryEst: "2-3 días hábiles", rating: 5.0, reviews: 3 },
  { id: "p3", name: "Organizador de Caja", price: 8990, category: "Herramientas", image: "/Fotos_productos/tools-organizers_775b48fe-8032-414c-8a06-9d0aaff8e6df.webp", description: "Caja organizadora con compartimentos modulares para tornillos y accesorios.", printTimeEst: "12 horas", dimensions: "20 x 15 x 5 cm", material: "PETG Resistente", deliveryEst: "2-4 días hábiles", rating: 4.5, reviews: 8 },
  { id: "p4", name: "Soporte Celular Tech", price: 5490, category: "Gadgets", image: "/Fotos_productos/gadgets_c6369950-2798-4279-801d-da44d5b51244.webp", description: "Stand universal para smartphones, ideal para escritorio o velador.", printTimeEst: "4 horas", dimensions: "8 x 8 x 10 cm", material: "PLA Reciclable", deliveryEst: "1-3 días hábiles", rating: 4.9, reviews: 24 },
  { id: "p5", name: "Figura StarWars Decorativa", price: 19990, category: "Coleccionables", image: "/Fotos_productos/Starwars 3.webp", isNew: true, description: "Busto hiper-detallado del universo Star Wars, impreso en alta calidad.", printTimeEst: "24 horas", dimensions: "12 x 12 x 18 cm", material: "Resina o PLA Alta Resolución", deliveryEst: "3-5 días hábiles", rating: 5.0, reviews: 45 },
  { id: "p6", name: "Araña Articulada", price: 4990, category: "Juguetes", image: "/Fotos_productos/spider.webp", description: "Juguete articulado impresión 3D in-place, sin ensamblaje requerido.", printTimeEst: "8 horas", dimensions: "15 x 15 x 3 cm", material: "PLA Flexible", deliveryEst: "2-3 días hábiles", rating: 4.7, reviews: 19 },
  { id: "p7", name: "Llavero Toad Multicolor", price: 3990, category: "Accesorios", image: "/Fotos_productos/toad multicor logo.webp", description: "Llavero retro de doble extrusión con colores vibrantes.", printTimeEst: "2 horas", dimensions: "4 x 4 x 0.5 cm", material: "PLA Reciclable", deliveryEst: "1-2 días hábiles", rating: 4.6, reviews: 50 },
  { id: "p8", name: "Delfín Decorativo", price: 11990, category: "Decoración", image: "/Fotos_productos/Dolphin-deco-image-1.webp", description: "Escultura decorativa low-poly para repisas o mesas de centro.", printTimeEst: "14 horas", dimensions: "25 x 10 x 15 cm", material: "PLA Reciclable", deliveryEst: "2-4 días hábiles", rating: 4.8, reviews: 7 },
  { id: "p9", name: "Macetero Geométrico", price: 8500, category: "Decoración", image: "/Fotos_productos/house_8bfcbce4-f20a-437a-a761-3843ea30fc2a.webp", description: "Macetero minimalista para cactus y suculentas con drenaje incluido.", printTimeEst: "9 horas", dimensions: "10 x 10 x 8 cm", material: "PETG Exterior", deliveryEst: "2-4 días hábiles", rating: 4.9, reviews: 11 },
  { id: "p10", name: "Colgante Luna Mística", price: 4500, category: "Accesorios", image: "/Fotos_productos/jewelry_7be4939d-5694-44d5-be06-c8ec23221b71.webp", isNew: true, description: "Collar geométrico en forma de luna creciente.", printTimeEst: "1.5 horas", dimensions: "3 x 3 x 0.3 cm", material: "PLA Silk", deliveryEst: "1-3 días hábiles", rating: 5.0, reviews: 2 },
  { id: "p11", name: "Soporte Auriculares Gamer", price: 12900, category: "Gadgets", image: "/Fotos_productos/gadgets_c6369950-2798-4279-801d-da44d5b51244.webp", description: "Stand para audífonos robusto con base antideslizante.", printTimeEst: "16 horas", dimensions: "15 x 15 x 25 cm", material: "PLA Resistente", deliveryEst: "2-4 días hábiles", rating: 4.8, reviews: 31 },
  { id: "p12", name: "Engranaje de Precisión", price: 2990, category: "Herramientas", image: "/Fotos_productos/tools-organizers_775b48fe-8032-414c-8a06-9d0aaff8e6df.webp", description: "Pieza de repuesto o educativa demostrando tolerancia 3D.", printTimeEst: "3 horas", dimensions: "5 x 5 x 2 cm", material: "ABS o PETG", deliveryEst: "2-5 días hábiles", rating: 4.4, reviews: 14 },
  { id: "p13", name: "Busto Mandaloriano", price: 24900, category: "Coleccionables", image: "/Fotos_productos/Starwars 3.webp", description: "Impresión de colección hiper-realista, modelo exclusivo.", printTimeEst: "36 horas", dimensions: "15 x 15 x 22 cm", material: "PLA Alta Resolución", deliveryEst: "4-7 días hábiles", rating: 5.0, reviews: 89 },
  { id: "p14", name: "Araña de Juguete XXL", price: 7990, category: "Juguetes", image: "/Fotos_productos/spider.webp", description: "La versión más grande de nuestro clásico articulado in-place.", printTimeEst: "14 horas", dimensions: "25 x 25 x 5 cm", material: "PLA Flexible", deliveryEst: "3-5 días hábiles", rating: 4.9, reviews: 42 },
  { id: "p15", name: "Llavero Estrella 3D", price: 3500, category: "Accesorios", image: "/Fotos_productos/toad multicor logo.webp", isNew: true, description: "Llavero corporativo del ecosistema Estrella3D.", printTimeEst: "1 hora", dimensions: "4 x 4 x 0.4 cm", material: "PLA Reciclable", deliveryEst: "1-2 días hábiles", rating: 4.5, reviews: 5 },
  { id: "p16", name: "Escultura Delfín Base", price: 15990, category: "Decoración", image: "/Fotos_productos/Dolphin-deco-image-1.webp", description: "Versión premiun con base estilizada simulando olas.", printTimeEst: "20 horas", dimensions: "30 x 12 x 18 cm", material: "PLA Reciclable", deliveryEst: "3-5 días hábiles", rating: 4.7, reviews: 13 },
];
