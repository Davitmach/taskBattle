
'use client';

import { Button } from "./components/UI/button";
import { TaskHomePageInfoBlock } from "./components/UI/infoBlock";
import { useCustomRouter } from "./hooks/Router";
import { taskService } from "./service/taskService";

export default function Home() {
  const router = useCustomRouter();

  const handleClick = () => {
    taskService.createTask(router);
  };
  return (
    <div className="container pt-[7px]">
      <Button
        type="Purple"
        onClick={handleClick}
        className="w-full py-[6px] text-[27px]"
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
