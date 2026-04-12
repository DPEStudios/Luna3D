import { create } from 'zustand';

interface ContactState {
  isContactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
}

export const useContactStore = create<ContactState>((set) => ({
  isContactModalOpen: false,
  openContactModal: () => set({ isContactModalOpen: true }),
  closeContactModal: () => set({ isContactModalOpen: false }),
}));
