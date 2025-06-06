'use client';
import { UserApiConfig } from "../config/apiConfig";
import axios from 'axios';
import { useUserProfile } from "../store";

const DOMEN = process.env.NEXT_PUBLIC_SERVER;

class UserService {
  async Welcome(setImg:any,setName:any) {
  
    console.log("URL:", DOMEN + UserApiConfig.WELCOME);

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

if(res.user) {
  setImg(res.user.icon);
  setName(res.user.name);
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
}

export const userService = new UserService();
