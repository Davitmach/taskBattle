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
  createdAt:string,
  setCreatedAt:(newDate:string)=> void,
  setName:(newName:string)=> void;
  setImg:(newImg:string)=> void;
  rewards:any[],
  setRewards:(newRew:any[])=> void,
tasks:{
  cancel:number,
  accept:number,
  in_progress:number,
},
setTasks:(cancel:number,accept:number,in_progress:number)=> void,
friends:any[],
setFriends:(friends:any[])=> void
}
export const useUserProfile = create<UserProfile>((set)=> ({
  name:'',
  rewards:[],
  setRewards:(newRew:any[]) => set({rewards:newRew}),
  friends:[],
  setFriends:(newFriends:any[])=> set({friends:newFriends}),
  img:'',
  setImg:(newState:string)=> set({img:newState}),
  setName:(newState:string)=> set({name:newState}),
  createdAt:'',
  setCreatedAt:(newState:string)=> set({createdAt:newState}),
  tasks:{
    cancel:0,
    accept:0,
    in_progress:0,

  },
  setTasks:(cancel:number,accept:number,in_progress:number)=> set({tasks:{
    accept:accept,
    cancel:cancel,
    in_progress:in_progress
  }})
}))