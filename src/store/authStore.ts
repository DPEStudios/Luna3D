import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAuthModalOpen: false,

      login: (email, name) => set({ 
        user: { id: Date.now().toString(), name, email },
        isAuthenticated: true,
        isAuthModalOpen: false
      }),

      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
      }),

      openAuthModal: () => set({ isAuthModalOpen: true }),
      closeAuthModal: () => set({ isAuthModalOpen: false }),
    }),
    {
      name: 'luna3d-auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), 
    }
  )
);
