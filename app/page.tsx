
'use client';

import { useEffect } from "react";
import { Button } from "./components/UI/button";
import { TaskHomePageInfoBlock } from "./components/UI/infoBlock";
import { useCustomRouter } from "./hooks/Router";
import { taskService } from "./service/taskService";
import { useLoadingState, useUserProfile } from "./store";

export default function Home() {
  const router = useCustomRouter();
  const {LoadedState} = useLoadingState();
const {name,img} = useUserProfile();
  const handleClick = () => {
taskService.openPageCreateTask(router)
  };
useEffect(()=> {
console.log(name,img);

},[img,name])
  return (
    <div className="container pt-[7px] scrollbar-hide">
     
      <Button
        type="Purple"
        onClick={handleClick}
        className={`w-full py-[6px] text-[1.93em] ${LoadedState == true &&'anim_fadeIn'}`}
        disabled={false}
        loading={false}
      >
        Добавить задачу
      </Button>
      <TaskHomePageInfoBlock type='COMPLETED' />
      <TaskHomePageInfoBlock type='IN_PROGRESS' />
      <TaskHomePageInfoBlock type='CANCELLED' />
    </div>
  );
}
