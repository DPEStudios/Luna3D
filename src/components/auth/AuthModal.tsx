"use client";

import React, { useState, useEffect } from 'react';
import styles from './AuthModal.module.css';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, signIn, signUp, isLoading, error, clearError } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await signIn(email, password);
    } else {
      await signUp(email, password, name);
    }
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    clearError();
  };

  const handleClose = () => {
    closeAuthModal();
    setEmail('');
    setPassword('');
    setName('');
  }

  return (
    <>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
          <button className={styles.closeBtn} onClick={handleClose}>&times;</button>
        </div>
        
        {error && <div className={styles.errorMessage}>{error}</div>}

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={styles.input}
              minLength={6}
            />
            {isLogin && <a href="#" className={styles.forgotPass}>¿Olvidaste tu contraseña?</a>}
          </div>

          <Button type="submit" variant="primary" style={{width: '100%', marginTop: '10px'}} disabled={isLoading}>
            {isLoading ? 'Cargando...' : (isLogin ? 'Ingresar' : 'Registrarme')}
          </Button>
        </form>

        <p className={styles.switchMode}>
          {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button type="button" onClick={handleModeSwitch} className={styles.switchBtn}>
            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
          </button>
        </p>

        <p className={styles.secureNotice}>
          🔒 Tus credenciales están seguras y manejadas directamente por Supabase Auth.
        </p>
      </div>
    </>
  );
};
