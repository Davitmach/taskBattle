
'use client';
import { FriendApiConfig, TaskApiConfig, UserApiConfig } from "../config/apiConfig";
import axios from 'axios';
import { useUserProfile } from "../store";
import { error } from "console";
import { QueryClient } from "@tanstack/react-query";
const DOMEN = process.env.NEXT_PUBLIC_SERVER;

class UserService {

  async Welcome(setImg:any,setName:any,setCreatedAt:any,setTasks:any) {
  
   

    const tg = window.Telegram.WebApp;
    const unsafeData = tg.initDataUnsafe;

    const name = unsafeData?.user?.first_name || "";
    const icon = unsafeData?.user?.photo_url || "";

    
    const chatId = unsafeData?.user?.id || "";
try {
    const data = await axios.post(DOMEN + UserApiConfig.WELCOME, {
      name,
      icon,
      chatId,
    }, {
      headers: {
        'tg-init-data': tg.initData,
      }
    });
const res = data.data;
localStorage.setItem('PROFILE_INFO',JSON.stringify(res));
if (res && res.user) {
  if (res.user.icon) setImg(res.user.icon);
  if (res.user.name) setName(res.user.name);
  if(res.taskCounter)  setTasks(res.taskCounter.cancelled,res.taskCounter.completed,res.taskCounter.in_progress)
    if(res.user.createdAt) {
      const formattedDate = new Date(res.user.createdAt)
  .toISOString()
  .slice(0, 10)
  .replace(/-/g, '.');
  setCreatedAt(formattedDate);
    } 
}




    return res;
  }
  catch(error:any) {
    
    if(error?.response?.data?.status == "unauthorized") {
       setTimeout(() => {
         window.location.reload();
       }, 1000);
    }
  }
  }
  async Report(userId:string,report:string) {
if(!userId || !report ) {
  console.error('У вас нету userId либо сообщения ')
  return  {
    error:'У вас нету userId либо сообщения'
  }
}
if(report.length < 5) {
  console.warn('Слишком короткое сообщение')
  return {
    error:'Слишком короткое сообщение'
  }
}
try {
  const data = await axios.post(DOMEN+UserApiConfig.REPORT,{
userId:userId,
report:report
  },{
    headers:{
      'tg-init-data':window.Telegram.WebApp.initData
    }
  })
const res = data.data;


return res;
}
catch(error:any) {
console.error(error,'cers tapec');

}
  }
  async Find(name:string) {
    if(!name) {
      return  {
    error:'Вы не передали имя'
  }
    }

    const Data = await axios.post(DOMEN+UserApiConfig.SEARCH,{
      username:name
    },{
      headers:{
        'tg-init-data':window.Telegram.WebApp.initData
      }
    })
    const res =Data.data;
    if(res.status == 'success') {
      return res.data;
    }
  }
  async GetFriends() {
    const friends = await axios.get(DOMEN+FriendApiConfig.FRIENDS,{
      headers:{
        'tg-init-data':window.Telegram.WebApp.initData
      }
    })
    if(friends.data){
      return friends.data.data
    }
  }
  async AcceptFriend(userId:string,friendId:string,queryClient:QueryClient) {
    if(!friendId) return;
    const data = await axios.get(DOMEN+FriendApiConfig.ACCEPTFRIEND+friendId,{
      headers:{
        'tg-init-data':window.Telegram.WebApp.initData
      }
    })
    if(data.data) {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['userFriends'] });
      return data.data
    }
  }
  async DeleteFriend(userId:string,friendId:string,queryClient?:QueryClient) {
     if(!friendId) return;
     const data = await axios.get(DOMEN+FriendApiConfig.CANCELFRIEND+friendId,{
      headers:{
        'tg-init-data':window.Telegram.WebApp.initData
      }
     })
     if(data) {
      if(queryClient) {
          queryClient.invalidateQueries({ queryKey: ['user', userId] });
          queryClient.invalidateQueries({ queryKey: ['userFriends'] });
      }
      return data.data
     }
  }
   async AddFriend(userId:string,queryClient:QueryClient) {
    const data = await axios.get(DOMEN+FriendApiConfig.ADDFRIEND+userId,{
      headers:{
        'tg-init-data':window.Telegram.WebApp.initData
      }
    })
    if(data) {
        queryClient.invalidateQueries({ queryKey: ['user', userId] });
        queryClient.invalidateQueries({ queryKey: ['userFriends'] });
      return data.data
    }
   }
  async User(id:string) {
    if(!id) return;

    const user = await axios.get(DOMEN+UserApiConfig.GETUSER+id,{
      headers:{
        'tg-init-data':window.Telegram.WebApp.initData
      }
    })
    if(user.data) {
      
      return user.data.data
    }
  }
  async Top() {
    const top = await axios.get(DOMEN+UserApiConfig.TOP,{
      headers:{
        'tg-init-data':window.Telegram.WebApp.initData
      }
    })
    localStorage.setItem('TOP',JSON.stringify(top.data))
    return top.data;
  }
  async Chart() {
    const data = await axios.get(DOMEN+UserApiConfig.CHART,{
      headers:{
        'tg-init-data':window.Telegram.WebApp.initData
      }
    })
    if(data) {
      return data.data;
    }
  }
  
}

export const userService = new UserService();
