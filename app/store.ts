import { create } from 'zustand';


interface TgLoadingState {
  LoadedState: boolean; 
  setLoad: (newState: boolean) => void; 
}

export const useMenuState = create<TgLoadingState>((set) => ({
  LoadedState: false, 
  setLoad: (newState: boolean) => set({ LoadedState: newState }),
}));

