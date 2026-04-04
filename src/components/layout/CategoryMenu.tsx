"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './CategoryMenu.module.css';

// Inventario simulado ampliado
const catalogData = [
  { name: "Decoración Hogar", subcategories: ["Lámparas", "Maceteros", "Esculturas", "Organizadores", "Cuadros 3D", "Jarrones", "Relojes de Pared", "Posavasos"] },
  { name: "Herramientas y Técnicos", subcategories: ["Soportes e Instalaciones", "Tuercas y Engranajes", "Cajas de Herramientas", "Repuestos Específicos", "Medidores", "Tornillos Plásticos", "Adaptadores"] },
  { name: "Regalos para Niños", subcategories: ["Juguetes Articulados", "Figuras de Acción", "Puzzles 3D", "Dinosaurios", "Autitos", "Bloques de Construcción", "Trompos", "Máscaras"] },
  { name: "Gadgets y Electrónica", subcategories: ["Soportes Celular", "Accesorios de PC", "Organizadores de Cables", "Fundas y Carcasas", "Soportes para Tablets", "Soportes de Auriculares", "Cajas para Baterías"] },
  { name: "Accesorios y Moda", subcategories: ["Llaveros", "Joyería", "Carteras Modulares", "Cinturones", "Gafas", "Colgantes", "Anillos", "Clips de Pelo"] },
  { name: "Mascotas", subcategories: ["Comederos", "Placas Identificativas", "Juguetes para Gatos", "Juguetes para Perros", "Cajas de Arena"] },
  { name: "Jardinería", subcategories: ["Macetas Auto-regables", "Marcadores de Plantas", "Mini Herramientas", "Soportes para Enredaderas"] },
  { name: "Juegos de Mesa", subcategories: ["Dados", "Torres de Dados", "Bandejas V-Track", "Fichas Extra", "Miniaturas"] },
  { name: "Oficina y Estudio", subcategories: ["Sujetalibros", "Organizadores de Escritorio", "Soportes de Lápices", "Reglas y Escuadras"] }
];

const imgPool = [
  "/Fotos_productos/house_8bfcbce4-f20a-437a-a761-3843ea30fc2a.webp",
  "/Fotos_productos/jewelry_7be4939d-5694-44d5-be06-c8ec23221b71.webp",
  "/Fotos_productos/tools-organizers_775b48fe-8032-414c-8a06-9d0aaff8e6df.webp",
  "/Fotos_productos/gadgets_c6369950-2798-4279-801d-da44d5b51244.webp",
  "/Fotos_productos/Starwars 3.webp",
  "/Fotos_productos/spider.webp",
  "/Fotos_productos/toad multicor logo.webp",
  "/Fotos_productos/Dolphin-deco-image-1.webp"
];

// Generar cuadros de productos de prueba dinámicamente
const generateMockProducts = (category: string, subcategory: string | null) => {
  const count = subcategory ? 8 : 18; 
  return Array.from({ length: count }).map((_, i) => ({
    id: `${category}-${subcategory || 'all'}-${i}`,
    title: subcategory ? `Item ${subcategory} ${i+1}` : `Item Genérico ${i+1}`,
    image: imgPool[Math.floor(Math.random() * imgPool.length)]
  }));
};

export const CategoryMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(catalogData[0].name);
  const [activeSub, setActiveSub] = useState<string | null>(null);

  const currentCategoryData = catalogData.find(c => c.name === activeCategory);
  const products = generateMockProducts(activeCategory, activeSub);

  return (
    <div className={styles.container}>
      <button className={styles.trigger}>
        Categorías
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <div className={styles.megaMenu}>
        <div className={styles.colCategories}>
          {catalogData.map((cat) => (
            <div 
              key={cat.name} 
              className={`${styles.menuItem} ${activeCategory === cat.name ? styles.menuItemActive : ''}`}
              onMouseEnter={() => {
                setActiveCategory(cat.name);
                setActiveSub(null); 
              }}
            >
              {cat.name}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
        </div>

        {currentCategoryData && (
          <div className={`${styles.colSubcategories} ${styles.fadeContainer}`} key={`sub-${activeCategory}`}>
            {currentCategoryData.subcategories.map((sub) => (
              <div
                key={sub}
                className={`${styles.subItem} ${activeSub === sub ? styles.subItemActive : ''}`}
                onMouseEnter={() => setActiveSub(sub)}
              >
                {sub}
              </div>
            ))}
          </div>
        )}

        <div className={styles.colProducts}>
          <h3 className={styles.gridTitle}>
            Mostrando: {activeSub ? `${activeCategory} > ${activeSub}` : `Todo en ${activeCategory}`}
          </h3>
          <div className={`${styles.productsGrid} ${styles.fadeContainer}`} key={`prod-${activeCategory}-${activeSub}`}>
            {products.map((prod) => (
              <div key={prod.id} className={styles.productBox}>
                <div className={styles.imgWrapper}>
                  <Image src={prod.image!} alt={prod.title} fill className={styles.menuImg} sizes="100px" />
                </div>
                <span className={styles.productBoxTitle}>{prod.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
