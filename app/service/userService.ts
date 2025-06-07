'use client';
import { UserApiConfig } from "../config/apiConfig";
import axios from 'axios';
import { useUserProfile } from "../store";
import { error } from "console";

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
console.log(res);

return res;
}
catch(error:any) {
console.log(error);

}
  }
}

export const userService = new UserService();
