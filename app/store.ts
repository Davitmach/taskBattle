import { create } from 'zustand';


interface TgLoadingState {
  LoadedState: boolean; 
  setLoad: (newState: boolean) => void; 
}

export const useLoadingState = create<TgLoadingState>((set) => ({
  LoadedState: false, 
  setLoad: (newState: boolean) => set({ LoadedState: newState }),
}));

interface UserProfile {
  name:string,
  img:string,
  setName:(newName:string)=> void;
  setImg:(newImg:string)=> void;
}
export const useUserProfile = create<UserProfile>((set)=> ({
  name:'',
  img:'',
  setImg:(newState:string)=> set({img:newState}),
  setName:(newState:string)=> set({name:newState})
}))