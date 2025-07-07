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
  chart:{day:{
    date:string,
    count: number
  }[],
week:{
    date:string,
    count: number
  }[],
  month:{
    date:string,
    count: number
  }[],
},
setChart: (day: { date: string; count: number }[], week: { date: string; count: number }[], month: { date: string; count: number }[]) => void;

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
friends:{
icon: string
id: string
name: string
status:string
userFriendId: string
_count: {tasks: number,taskParticipations:number}

}[],
setFriends:(friends:any[])=> void
}
export const useUserProfile = create<UserProfile>((set)=> ({
  name:'',
  chart:{
    day:[],
    week:[],
    month:[]
  },
  setChart: (day, week, month) => set({ chart: { day, week, month } }),
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