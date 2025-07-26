'use client';

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./components/UI/button";
import { TaskHomePageInfoBlock } from "./components/UI/infoBlock";
import { useCustomRouter } from "./hooks/Router";
import { taskService } from "./service/taskService";
import { useLoadingState, useUserProfile } from "./store";

export default function Home() {
  const router = useCustomRouter();
  const { LoadedState } = useLoadingState();
  const { name, img } = useUserProfile();

  const {
    data: offlineTasks = [],
    isLoading: isOfflineLoading,
    refetch: refetchOffline,
  } = useQuery({
    queryKey: ["offlineTasks"],
    queryFn: () => taskService.getOfflineTask(),
    enabled: LoadedState,
  });

  const {
    data: onlineTasks = [],
    isLoading: isOnlineLoading,
    refetch: refetchOnline,
  } = useQuery({
    queryKey: ["onlineTasks"],
    queryFn: () => taskService.getTasks(),
    enabled: LoadedState,
        refetchInterval: 5000,
    refetchIntervalInBackground: true,
    staleTime: 3000,
    
  });

  const tasksByStatus = useMemo(() => {
    const source = onlineTasks.length > 0 ? onlineTasks : offlineTasks;

    const filterByStatus = (status: string) =>
      source.filter((task: any) => task.status === status);

    return {
      COMPLETED: filterByStatus("COMPLETED"),
      IN_PROGRESS: filterByStatus("IN_PROGRESS"),
      CANCELLED: filterByStatus("CANCELLED"),
    };
  }, [offlineTasks, onlineTasks]);

  const handleClick = () => {
    taskService.openPageCreateTask(router);
  };

  return (
    <div className="container pt-[7px] scrollbar-hide">
      <Button
        type="Purple"
        onClick={handleClick}
        className={`duration-[200ms] active:scale-[0.9] w-full py-[6px] text-[1.93em] ${LoadedState && 'anim_fadeIn'}`}
        disabled={false}
        loading={false}
      >
        Добавить задачу
      </Button>

      <TaskHomePageInfoBlock data={tasksByStatus.COMPLETED} type="COMPLETED" />
      <TaskHomePageInfoBlock data={tasksByStatus.IN_PROGRESS} type="IN_PROGRESS" />
      <TaskHomePageInfoBlock data={tasksByStatus.CANCELLED} type="CANCELLED" />
    </div>
  );
}
