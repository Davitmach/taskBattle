'use client';
import { useEffect } from 'react';
import { useLoadingState } from '@/app/store';

export const TgLoad = () => {
  const { setLoad } = useLoadingState();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      // Проверка на то, что мини-приложение реально запущено в Telegram
      if (tg.initData && tg.initData.length > 0) {
        tg.ready();      // Говорим Telegram, что WebApp готов
        setLoad(true);   // Устанавливаем состояние "загружено"
      } else {
        console.warn('Mini App не в Telegram: initData пустой');
        setLoad(false);  // Отмечаем, что запуск не из Telegram
      }
    } else {
      console.warn('Telegram WebApp не найден');
      setLoad(false);    // Без Telegram WebApp
    }
  }, [setLoad]);

  return null;
};
