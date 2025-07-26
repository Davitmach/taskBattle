"use client";
import { Title } from "../components/UI/title";
import { Back } from "../components/UI/back";
import { useCustomRouter } from "../hooks/Router";
import { UserInfo } from "../components/UI/userInfo";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../service/userService";
import { Task } from "../components/UI/task";
import { useLoadingState } from "../store";

export default function Page() {
  const {setLoad} = useLoadingState();
  const [tasks, setTasks] = useState<
    {
      top:{
      id: string;
      name: string;
      icon:string;
      totalTasks:number;
      }[],
      me:{
        id: string;
      name: string;
      icon:string;
      totalTasks:number;
      rank:number
      }
    }
  >({
    top:[],
    me:{
      id: '',
      name: '',
      icon:'',
      totalTasks:0,
      rank:0
    }
  });

  const router = useCustomRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["top"],
    queryFn: () => userService.Top(),
    retry: false,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    staleTime: 3000,
  });
  useEffect(() => {
    if(isLoading) {
      setLoad(false);
      const check= localStorage.getItem('TOP');
      if(check) {
      const parse = JSON.parse(check);
     if(parse) {
      setTasks(parse)
     }
      }
    }
  }, [isLoading]);
useEffect(()=> {
if(data) {
  setLoad(true);
  setTasks(data?.data);
}
},[data])

  return (
    <>
      <div className="container pt-[7px] scrollbar-hide relative anim_fadeIn">
        <div>
          <Back
            onclick={() => router("/")}
            className="absolute left-0 top-[37px] cursor-pointer"
          />
          <Title className="font-[400] text-[4.57em]" color={"#F1F1F1"}>
            TOP
          </Title>
        </div>
        <div className="w-full h-full relative">
          <ul className="flex flex-col gap-[5px] pb-[160px]">
            {tasks?.top?.map((item, index) => (
              <UserInfo
              id={item.id}
                color="#1E1E2F"
                img={item.icon}
                index={index}
                key={index}
                name={item.name}
                total={item.totalTasks}
                state={index + 1}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className=" max-w-[400px]  fixed bottom-[80px] left-[50%] translate-x-[-50%] w-[92%]">
        <UserInfo
          color="#1E1E2F"
          className="  border border-white"
          img={tasks?.me?.icon}
          index={1}
          name={tasks?.me?.name}
          total={tasks?.me?.totalTasks}
          state={tasks?.me?.rank}
        />
      </div>
    </>
  );
}
