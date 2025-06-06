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


if(res.status == 'unauthorized') {
window.Telegram.WebApp.close();
}

    return res;
  }
}

export const userService = new UserService();
