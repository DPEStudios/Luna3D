import { create } from 'zustand';

/**
 * Theme Store — Wrapper around the persistence + DOM sync for the
 * color theme ("dark" | "light"). Following the Agnosticism principle:
 * nothing in the UI talks to localStorage directly; everything goes
 * through this store, so swapping persistence is a one-file change.
 */

export type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'luna3d-theme';

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  initialize: () => void;
}

const applyThemeToDom = (theme: ThemeMode) => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
};

const readStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // ignore – fall through to default
  }
  return 'dark';
};

const persistTheme = (theme: ThemeMode) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore
  }
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'dark',

  setTheme: (theme) => {
    applyThemeToDom(theme);
    persistTheme(theme);
    set({ theme });
  },

  toggleTheme: () => {
    const next: ThemeMode = get().theme === 'dark' ? 'light' : 'dark';
    get().setTheme(next);
  },

  initialize: () => {
    const theme = readStoredTheme();
    applyThemeToDom(theme);
    set({ theme });
  },
}));
