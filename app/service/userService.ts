import { UserApiConfig } from "../config/apiConfig";
import axios from 'axios';

const DOMEN = process.env.NEXT_PUBLIC_SERVER;

class UserService {
  async Welcome() {
    
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





    return res;
  }
  catch(error:any) {
    
    if(error?.response?.data?.status == "unauthorized") {
    console.log('deijduadaaeuddaeudaeuedahuaeduaedhuadeudae');
       
    }
  }
  }
}

export const userService = new UserService();
