'use client';

import { UserApiConfig } from "@/app/config/apiConfig";
import { taskService } from "@/app/service/taskService";
import { userService } from "@/app/service/userService";
import { useLoadingState, useUserProfile } from "@/app/store";
import { usePathname, useRouter } from "next/navigation";
import { use, useEffect } from "react";

export const Welcome = () => {
  const path = usePathname();
  const { LoadedState } = useLoadingState();
  const {img,name,createdAt,tasks,setImg,setName,setCreatedAt,setTasks,setFriends,setRewards} = useUserProfile();
  
  useEffect(()=> {
    UpdateTasks()
if(img=='' && name=='' && createdAt=='' && tasks.accept==0) {
  const get = localStorage.getItem('PROFILE_INFO');
  if(get) {
  const parse = JSON.parse(get);
  if(parse.user.rewards) setRewards(parse.user.rewards);
   if (parse.user.icon) setImg(parse.user.icon);
  if (parse.user.name) setName(parse.user.name);
  if(parse.taskCounter)  setTasks(parse.taskCounter.cancelled,parse.taskCounter.completed,parse.taskCounter.in_progress)
    if(parse.user.createdAt) {
      const formattedDate = new Date(parse.user.createdAt)
  .toISOString()
  .slice(0, 10)
  .replace(/-/g, '.');
  setCreatedAt(formattedDate);
    } 
}
  }

  },[])
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

 const UpdateTasks = () => {
  setTimeout(() => {
    taskService.updateTasks();
    UpdateTasks()
  }, 30000);
  

 }
useEffect(()=>{
if(LoadedState==true) {
userService.GetFriends().then((e)=> {
  if(e) {
   
    
   setFriends(e);
  }
})
}
},[LoadedState])

useEffect(()=> {
console.log(path);

},[path])
  return null;
};
