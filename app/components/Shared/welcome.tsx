'use client';

import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';
import { useCustomRouter } from "@/app/hooks/Router";
import { taskService } from "@/app/service/taskService";
import { userService } from "@/app/service/userService";
import { useLoadingState, useUserProfile } from "@/app/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const Welcome = () => {
  const path = usePathname();
  const push = useCustomRouter();
  const { LoadedState } = useLoadingState();
  const { setImg, setName, setCreatedAt, setTasks, setFriends, setRewards,setChart } = useUserProfile();
  const queryClient = useQueryClient();

  // 1. Запрос профиля пользователя
  const { data: profile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => userService.Welcome(setImg,setName,setCreatedAt,setTasks),
    enabled: LoadedState,
    refetchInterval: 5000,
  });

  
  // Обработка успешного запроса профиля
  useEffect(() => {
    if(profile?.status == 'blocked') {
      window.Telegram.WebApp.close();
    }
    if (profile) {
      setImg(profile.user.icon || '');
      setName(profile.user.name || '');
      setRewards(profile.user.rewards || []);
      setTasks(
        profile.taskCounter.cancelled,
        profile.taskCounter.completed,
        profile.taskCounter.in_progress
      );

      const formattedDate = new Date(profile.user.createdAt)
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '.');
      setCreatedAt(formattedDate);

      localStorage.setItem('PROFILE_INFO', JSON.stringify(profile));
    }
  }, [profile]);

  // 2. Запрос друзей
  const { data: friends,error:friendError } = useQuery({
    queryKey: ['userFriends'],
    queryFn: () => userService.GetFriends(),
    enabled: LoadedState,
     retry: false,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    staleTime: 3000,
  });

  useEffect(() => {
    if (friends) {setFriends(friends)}
 
  
  }, [friends]);
useEffect(()=> {

if(friendError?.message=='Request failed with status code 404') {
  setFriends([])
}


},[friendError])
  useQuery({
    queryKey: ['updateTasks'],
    queryFn: () => taskService.updateTasks(),
    refetchInterval: 30000,
    enabled: LoadedState,
  });
  const {data:chart} =useQuery({
    queryKey:['chart'],
    queryFn:()=> userService.Chart(),
    refetchInterval:3000,
    
  })
useEffect(()=> {
if(chart) {
  setChart(chart?.data?.day,chart?.data?.week,chart?.data?.month);
}
},[chart])
  // Восстановление из localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('PROFILE_INFO');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      if (parsed.user) {
        setImg(parsed.user.icon || '');
        setName(parsed.user.name || '');
        setRewards(parsed.user.rewards || []);
        if (parsed.taskCounter) {
          setTasks(
            parsed.taskCounter.cancelled,
            parsed.taskCounter.completed,
            parsed.taskCounter.in_progress
          );
        }
        if (parsed.user.createdAt) {
          const formattedDate = new Date(parsed.user.createdAt)
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, '.');
          setCreatedAt(formattedDate);
        }
      }
    }
  }, []);

  // Редирект при перезагрузке
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigationEntry?.type === 'reload' && path !== '/') {
        push('/')
      }
    }
  }, [])

  return null;
};