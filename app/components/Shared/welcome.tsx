'use client';

import { userService } from "@/app/service/userService";
import { useEffect } from "react";

export const Welcome = () => {
  useEffect(() => {
  
    userService.Welcome();

    const interval = setInterval(() => {
      userService.Welcome();
    }, 60000);

   
    return () => clearInterval(interval);
  }, []);

  return null;
};
