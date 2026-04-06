import React from 'react';
import styles from './ProductCatalog.module.css';
import { ProductCard } from './ProductCard';
import { Product } from '../../lib/db/productService';

interface ProductCatalogProps {
  products: Product[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ products }) => {
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
