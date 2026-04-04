export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
}

export const products: Product[] = [
  { id: "p1", name: "Lámpara Hogar Moderna", price: 14990, category: "Decoración", image: "/Fotos_productos/house_8bfcbce4-f20a-437a-a761-3843ea30fc2a.webp", isNew: true },
  { id: "p2", name: "Soporte de Joyería", price: 6990, category: "Accesorios", image: "/Fotos_productos/jewelry_7be4939d-5694-44d5-be06-c8ec23221b71.webp" },
  { id: "p3", name: "Organizador de Caja", price: 8990, category: "Herramientas", image: "/Fotos_productos/tools-organizers_775b48fe-8032-414c-8a06-9d0aaff8e6df.webp" },
  { id: "p4", name: "Soporte Celular Tech", price: 5490, category: "Gadgets", image: "/Fotos_productos/gadgets_c6369950-2798-4279-801d-da44d5b51244.webp" },
  { id: "p5", name: "Figura StarWars Decorativa", price: 19990, category: "Coleccionables", image: "/Fotos_productos/Starwars 3.webp", isNew: true },
  { id: "p6", name: "Araña Articulada", price: 4990, category: "Juguetes", image: "/Fotos_productos/spider.webp" },
  { id: "p7", name: "Llavero Toad Multicolor", price: 3990, category: "Accesorios", image: "/Fotos_productos/toad multicor logo.webp" },
  { id: "p8", name: "Delfín Decorativo", price: 11990, category: "Decoración", image: "/Fotos_productos/Dolphin-deco-image-1.webp" },
  { id: "p9", name: "Macetero Geométrico", price: 8500, category: "Decoración", image: "/Fotos_productos/house_8bfcbce4-f20a-437a-a761-3843ea30fc2a.webp" },
  { id: "p10", name: "Colgante Luna Mística", price: 4500, category: "Accesorios", image: "/Fotos_productos/jewelry_7be4939d-5694-44d5-be06-c8ec23221b71.webp", isNew: true },
  { id: "p11", name: "Soporte Auriculares Gamer", price: 12900, category: "Gadgets", image: "/Fotos_productos/gadgets_c6369950-2798-4279-801d-da44d5b51244.webp" },
  { id: "p12", name: "Engranaje de Precisión", price: 2990, category: "Herramientas", image: "/Fotos_productos/tools-organizers_775b48fe-8032-414c-8a06-9d0aaff8e6df.webp" },
  { id: "p13", name: "Busto Mandaloriano", price: 24900, category: "Coleccionables", image: "/Fotos_productos/Starwars 3.webp" },
  { id: "p14", name: "Araña de Juguete XXL", price: 7990, category: "Juguetes", image: "/Fotos_productos/spider.webp" },
  { id: "p15", name: "Llavero Estrella 3D", price: 3500, category: "Accesorios", image: "/Fotos_productos/toad multicor logo.webp", isNew: true },
  { id: "p16", name: "Escultura Delfín Base", price: 15990, category: "Decoración", image: "/Fotos_productos/Dolphin-deco-image-1.webp" },
];
