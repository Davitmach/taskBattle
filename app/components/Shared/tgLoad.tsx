'use client';
import { useEffect } from 'react';
import { useLoadingState } from '@/app/store';

export const TgLoad = () => {
    const { setLoad } = useLoadingState();
console.log('qaq');

    useEffect(() => {
console.log('qaq');

        if (window.Telegram && window.Telegram.WebApp) {
            console.log('qaq');
            
             window.Telegram.WebApp.ready();
           setLoad(true);

        }
        else {
            console.log('certainly not ready');
            
        }
    }, [setLoad]);

    return null;
};