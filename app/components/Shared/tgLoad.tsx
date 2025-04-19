'use client';
import { useEffect } from 'react';
import { useLoadingState } from '@/app/store';

export const TgLoad = () => {
    const { setLoad } = useLoadingState();


    useEffect(() => {

setTimeout(() => {
    if (window.Telegram && window.Telegram.WebApp) {
         window.Telegram.WebApp.ready();
         Telegram.WebApp.setHeaderColor('#2D2D4F');     
         Telegram.WebApp.expand();   
       setLoad(true);
    }
}, 1000);
   
    }, []);

    return null;
};