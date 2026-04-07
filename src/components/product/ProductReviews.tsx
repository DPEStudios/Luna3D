import React from 'react';
import styles from './ProductReviews.module.css';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    author: "Felipe M.",
    rating: 5,
    date: "Hace 2 semanas",
    content: "Increíble nivel de detalle. Pensé que se notarían mucho las líneas de impresión, pero la calidad es impecable. ¡Y el envío fue rapidísimo!"
  },
  {
    id: "2",
    author: "Camila R.",
    rating: 5,
    date: "Hace 1 mes",
    content: "Lo compré para regalar y quedó fascinado. El material se siente súper resistente y los colores son muy vivos gracias al multicolor."
  },
  {
    id: "3",
    author: "Diego T.",
    rating: 4,
    date: "Hace 1 mes",
    content: "Muy buen producto. Se nota la optimización del diseño porque es muy liviano pero firme."
  }
];

export const ProductReviews: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Opiniones de Clientes</h3>
        <div className={styles.globalRating}>
          <span className={styles.stars}>★★★★★</span>
          <span className={styles.score}>4.8 de 5</span>
          <span className={styles.count}>(24 reseñas verificadas)</span>
        </div>
      </div>

      <div className={styles.list}>
        {mockReviews.map(review => (
          <article key={review.id} className={styles.review}>
            <div className={styles.reviewHeader}>
              <div className={styles.authorBadge}>{review.author.charAt(0)}</div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{review.author}</span>
                <span className={styles.date}>{review.date}</span>
              </div>
              <div className={styles.reviewStars}>
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </div>
            </div>
            <p className={styles.content}>{review.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
