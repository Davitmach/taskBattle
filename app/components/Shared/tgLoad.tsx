'use client';
import { useEffect } from 'react';
import { useMenuState } from "@/app/store";

export const LgLoad = () => {
    const { setLoad } = useMenuState();

    useEffect(() => {

        if (window.Telegram && window.Telegram.WebApp) {
             window.Telegram.WebApp.ready();
           setLoad(true);

        }
    }, [setLoad]);

    return null;
};
/* ssssss*/