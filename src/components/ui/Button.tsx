import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const rootClass = `${styles.button} ${styles[variant]} ${className}`.trim();
  
  return (
    <button className={rootClass} {...props}>
      {children}
    </button>
  );
};
