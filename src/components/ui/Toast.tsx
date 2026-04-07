"use client";

import React, { useEffect, useState } from 'react';
import styles from './Toast.module.css';
import { useToastStore, ToastMessage } from '../../store/toastStore';

const ToastItem = ({ toast }: { toast: ToastMessage }) => {
  const [isClosing, setIsClosing] = useState(false);
  const { removeToast } = useToastStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsClosing(true), 2700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`${styles.toast} ${styles[toast.type]} ${isClosing ? styles.closing : ''}`}
      onClick={() => {
        setIsClosing(true);
        setTimeout(() => removeToast(toast.id), 300);
      }}
    >
      <span>{toast.message}</span>
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
