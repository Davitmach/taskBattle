'use client';
import { useEffect } from 'react';
import { useLoadingState } from '@/app/store';

export const LgLoad = () => {
    const { setLoad } = useLoadingState();

    useEffect(() => {

        if (window.Telegram && window.Telegram.WebApp) {
             window.Telegram.WebApp.ready();
           setLoad(true);

        }
    }, [setLoad]);

    return null;
};
<<<<<<< HEAD
=======


>>>>>>> 7a93076c9dfe1493075b47a26d0aee6c8438d5f7
