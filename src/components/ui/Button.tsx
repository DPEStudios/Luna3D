import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  isLoading = false,
  disabled,
  children, 
  className = '', 
  ...props 
}) => {
  const rootClass = `${styles.button} ${styles[variant]} ${className}`.trim();
  
  return (
    <button 
      className={rootClass} 
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <span className={styles.spinner} />}
      {children}
    </button>
  );
};
