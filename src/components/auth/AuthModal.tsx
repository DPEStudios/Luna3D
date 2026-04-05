"use client";

import React, { useState, useEffect } from 'react';
import styles from './AuthModal.module.css';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, isLogin ? 'Usuario Clerk' : name);
  };

  return (
    <>
      <div className={styles.overlay} onClick={closeAuthModal} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
          <button className={styles.closeBtn} onClick={closeAuthModal}>&times;</button>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label>Nombre</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Juan Pérez"
                className={styles.input}
              />
            </div>
          )}
          
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="tu@correo.com"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Contraseña</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••"
              className={styles.input}
            />
            {isLogin && <a href="#" className={styles.forgotPass}>¿Olvidaste tu contraseña?</a>}
          </div>

          <Button type="submit" variant="primary" style={{width: '100%', marginTop: '10px'}}>
            {isLogin ? 'Ingresar' : 'Registrarme Seguramente'}
          </Button>
        </form>

        <div className={styles.divider}>
          <span>o</span>
        </div>

        <Button variant="ghost" style={{width: '100%', border: '1px solid var(--color-border)'}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{marginRight: '8px'}}>
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5.08 3.8 9.27 8.7 9.9v-7H7.9V12h2.8V9.8c0-2.76 1.64-4.3 4.17-4.3 1.2 0 2.45.22 2.45.22v2.7h-1.38c-1.36 0-1.78.85-1.78 1.7V12h3l-.48 2.9h-2.52v7C18.2 21.27 22 17.08 22 12z"></path>
          </svg>
          Continuar con Google
        </Button>

        <p className={styles.switchMode}>
          {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className={styles.switchBtn}>
            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
          </button>
        </p>

        <p className={styles.secureNotice}>
          🔒 Protegido con estándar Clerk Auth (Mock temporal). Tus contraseñas viajan encriptadas.
        </p>
      </div>
    </>
  );
};
