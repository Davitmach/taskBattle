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
      const response = await axios.post(
        DOMEN + UserApiConfig.WELCOME,
        { name, icon, chatId },
        {
          headers: {
            'tg-init-data': tg.initData,
          }
        }
      );

      const res = response.data;
      console.log("Успешный ответ:", res);

      // Никакого закрытия Telegram WebApp здесь!
      return res;

    } catch (error: any) {
      if (error.response?.data) {
        const errorData = error.response.data;
        console.warn("Ошибка от сервера:", errorData);

        if (errorData?.status === 'unauthorized') {
          console.warn("Unauthorized: закрываем WebApp");
          tg.close();
        }

        return errorData;
      }

      console.error("Неизвестная ошибка запроса:", error);
      tg.close(); // можно закрыть по умолчанию при полной ошибке запроса
      throw error;
    }
  }
}

export const userService = new UserService();
