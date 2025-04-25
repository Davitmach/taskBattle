
'use client';

import { Button } from "./components/UI/button";
import { TaskHomePageInfoBlock } from "./components/UI/infoBlock";
import { useCustomRouter } from "./hooks/Router";
import { taskService } from "./service/taskService";
import { useLoadingState } from "./store";

export default function Home() {
  const router = useCustomRouter();
  const {LoadedState} = useLoadingState();

  const handleClick = () => {
    taskService.createTask(router);
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
      <TaskHomePageInfoBlock type="complete" />
      <TaskHomePageInfoBlock type="inprocess" />
      <TaskHomePageInfoBlock type="cancel" />
    </div>
  );
}
