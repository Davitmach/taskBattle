'use client';

import { userService } from "@/app/service/userService";
import { useLoadingState, useUserProfile } from "@/app/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Welcome = () => {
  const { LoadedState } = useLoadingState();
  const {setImg,setName,setCreatedAt,setTasks} = useUserProfile();
const {refresh} = useRouter();
  useEffect(() => {
    let welcomeCalled = false;
    let checkInterval: NodeJS.Timeout;
    let repeatInterval: NodeJS.Timeout;

    const tryWelcome = () => {
      if (LoadedState && !welcomeCalled) {
        welcomeCalled = true;

        userService.Welcome(setImg,setName,setCreatedAt,setTasks);

        // Повторять каждые 60 сек
        repeatInterval = setInterval(() => {
          userService.Welcome(setImg,setName,setCreatedAt,setTasks);
        }, 60000);

        clearInterval(checkInterval);
      }
    };

    // Проверять каждые 500 мс, пока LoadedState не станет true
    checkInterval = setInterval(tryWelcome, 500);
    tryWelcome(); // первая попытка сразу

    return () => {
      clearInterval(checkInterval);
      clearInterval(repeatInterval);
    };
  }, [LoadedState]);

  return null;
};
