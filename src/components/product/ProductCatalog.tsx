import React from 'react';
import styles from './ProductCatalog.module.css';
import { ProductCard } from './ProductCard';
import { products } from '../../lib/mockData';

export const ProductCatalog: React.FC = () => {
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
