import React from 'react';
import styles from './ProductCatalog.module.css';
import { ProductCard } from './ProductCard';
import { Product } from '../../lib/db/productService';

interface ProductCatalogProps {
  products: Product[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className={styles.emptyCatalog}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <p>No se encontraron modelos</p>
        <span>Actualmente no hay productos en esta categoría o no coinciden con la búsqueda.</span>
      </div>
    );
  }

  return (
    <section className={styles.catalog}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
          image={product.image}
          isNew={product.isNew}
        />
      ))}
    </section>
  );
};
