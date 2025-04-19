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


