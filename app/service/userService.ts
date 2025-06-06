import { UserApiConfig } from "../config/apiConfig";
import axios from 'axios';

const DOMEN = process.env.NEXT_PUBLIC_SERVER;

class UserService {
  async Welcome() {
    const tg = window.Telegram.WebApp;
    const unsafeData = tg.initDataUnsafe;

    const name = unsafeData?.user?.first_name || "";
    const icon = unsafeData?.user?.photo_url || "";
    const chatId = unsafeData?.user?.id || "";

    try {
      const response = await axios.post(DOMEN + UserApiConfig.WELCOME, {
        name,
        icon,
        chatId,
      }, {
        headers: {
          'tg-init-data': tg.initData,
        }
      });

      const res = response.data;

      if (res.status === 'unauthorized') {
        tg.close();
      }

      return res;

    } catch (error: any) {
      // Если ошибка от сервера
      if (error.response && error.response.data) {
        const res = error.response.data;
        console.warn("Ошибка с ответом:", res);

        if (res.status === 'unauthorized') {
          tg.close();
        }

        return res; // или throw, если нужно наверх пробросить
      }

      // Если ошибка без ответа (например, 404 без тела или сеть)
      console.error("Непредвиденная ошибка:", error);
      throw error;
    }
  }
}

export const userService = new UserService();
