
'use client';

import { useEffect, useState } from "react";
import { Button } from "./components/UI/button";
import { TaskHomePageInfoBlock } from "./components/UI/infoBlock";
import { useCustomRouter } from "./hooks/Router";
import { taskService } from "./service/taskService";
import { useLoadingState, useUserProfile } from "./store";

export default function Home() {
  const router = useCustomRouter();
    const [task, setTask] = useState<{
      COMPLETED: any[];
      IN_PROGRESS: any[];
      CANCELLED: any[];
    }>({
      COMPLETED: [],
      IN_PROGRESS: [],
      CANCELLED: [],
    });
      useEffect(() => {
    const GetTasks = () => {
      taskService.getOfflineTask().then((offlineTasks) => {
        
        if (Array.isArray(offlineTasks)) {
          const cancel = offlineTasks.filter((e) => e.status === "CANCELLED");
          const accept = offlineTasks.filter((e) => e.status === "COMPLETED");
          const in_progress = offlineTasks.filter(
            (e) => e.status === "IN_PROGRESS"
          );

          setTask({
            COMPLETED: accept,
            IN_PROGRESS: in_progress,
            CANCELLED: cancel,
          });
        }
      });
      taskService.getTasks().then((tasks) => {
        if (Array.isArray(tasks) && tasks.length > 0) {
          const cancel = tasks.filter((e) => e.status === "CANCELLED");
          const accept = tasks.filter((e) => e.status === "COMPLETED");
          const in_progress = tasks.filter((e) => e.status === "IN_PROGRESS");

          setTask({
            COMPLETED: accept,
            IN_PROGRESS: in_progress,
            CANCELLED: cancel,
          });
        }
      });
    };
    if (LoadedState == true) {
      GetTasks();
    } else {
      
      setTimeout(() => {
        GetTasks();
      }, 1000);
    }
  }, []);
  const {LoadedState} = useLoadingState();
const {name,img} = useUserProfile();
  const handleClick = () => {
taskService.openPageCreateTask(router)
  };

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
      <TaskHomePageInfoBlock data={task.COMPLETED} type='COMPLETED' />
      <TaskHomePageInfoBlock data={task.IN_PROGRESS} type='IN_PROGRESS' />
      <TaskHomePageInfoBlock data={task.CANCELLED} type='CANCELLED' />
    </div>
  );
}
