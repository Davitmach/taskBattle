"use client";

import { useQuery } from "@tanstack/react-query";
import { AnyUserInfo } from "@/app/components/Shared/userInfo";
import { Back } from "@/app/components/UI/back";
import { Button } from "@/app/components/UI/button";
import {
  InfoBlock,
  TaskHomePageInfoBlock,
} from "@/app/components/UI/infoBlock";
import { Reward } from "@/app/components/UI/reward";
import { UserInfo } from "@/app/components/UI/userInfo";
import { useCustomRouter } from "@/app/hooks/Router";
import { useNotification } from "@/app/provider/notification";
import { userService } from "@/app/service/userService";
import { useLoadingState } from "@/app/store";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
type Task = {
  title: string;
  type: string;
  timeout: number;
  date: string;
  friends?: { img: string; name: string; total: number }[];
};
// const data:Task[] = [
//     { title: "Написать вступление к проекту", type: "Одиночное", timeout: 10, date: "23:03:2024 24:34" },
//     { title: "Созвон с тимлидом", type: "Совместное", timeout: 25, friends: [{ img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIH3cVN9nVOwezMJZgjRo0YhASylFMo1nJpw&s", name: "Аня", total: 3 },{ img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIH3cVN9nVOwezMJZgjRo0YhASylFMo1nJpw&s", name: "Аня", total: 3 },{ img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIH3cVN9nVOwezMJZgjRo0YhASylFMo1nJpw&s", name: "Аня", total: 3 },{ img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIH3cVN9nVOwezMJZgjRo0YhASylFMo1nJpw&s", name: "Аня", total: 3 }], date: "23:03:2024 24:34" },
//     { title: "Дизайн главной страницы", type: "Одиночное", timeout: 40, date: "23:03:2024 24:34" },
//     { title: "Обсуждение архитектуры", type: "Совместное", timeout: 30, friends: [{ img: "/avatars/user2.png", name: "Богдан", total: 4 }], date: "23:03:2024 24:34" },
//     { title: "Тестирование логина", type: "Одиночное", timeout: 15, date: "23:03:2024 24:34" },
//     { title: "Вёрстка формы регистрации", type: "Одиночное", timeout: 35, date: "23:03:2024 24:34" },
//     { title: "Созвон по задачам спринта", type: "Совместное", timeout: 20, friends: [{ img: "/avatars/user3.png", name: "Вика", total: 2 }], date: "23:03:2024 24:34" },
//     { title: "Обновить README", type: "Одиночное", timeout: 10, date: "23:03:2024 24:34" },
//     { title: "UI ревью компонентов", type: "Совместное", timeout: 45, friends: [{ img: "/avatars/user4.png", name: "Сергей", total: 6 }], date: "23:03:2024 24:34" },
//     { title: "Фикс багов на проде", type: "Одиночное", timeout: 50, date: "23:03:2024 24:34" },
//     { title: "Обсудить идеи по улучшению UX", type: "Совместное", timeout: 30, friends: [{ img: "/avatars/user5.png", name: "Катя", total: 5 }], date: "23:03:2024 24:34" },
//     { title: "Переезд на новую библиотеку", type: "Одиночное", timeout: 60, date: "23:03:2024 24:34" },
//     { title: "Созвон с дизайнером", type: "Совместное", timeout: 25, friends: [{ img: "/avatars/user6.png", name: "Артур", total: 3 }], date: "23:03:2024 24:34" },
//     { title: "Рефакторинг модулей", type: "Одиночное", timeout: 45, date: "23:03:2024 24:34" },
//     { title: "Ревью pull request'ов", type: "Одиночное", timeout: 20, date: "23:03:2024 24:34" },
//     { title: "Составить план на неделю", type: "Одиночное", timeout: 15, date: "23:03:2024 24:34" },
//     { title: "Демо для заказчика", type: "Совместное", timeout: 30, friends: [{ img: "/avatars/user7.png", name: "Денис", total: 4 }], date: "23:03:2024 24:34" },
//     { title: "Оптимизация запросов", type: "Одиночное", timeout: 35, date: "23:03:2024 24:34" },
//     { title: "Созвон по багрепортам", type: "Совместное", timeout: 40, friends: [{ img: "/avatars/user8.png", name: "Настя", total: 2 }], date: "23:03:2024 24:34" },
//     { title: "Добавить документацию к API", type: "Одиночное", timeout: 25, date: "23:03:2024 24:34" },
//     { title: "UX-тестирование с пользователями", type: "Совместное", timeout: 50, friends: [{ img: "/avatars/user9.png", name: "Лёша", total: 7 }], date: "23:03:2024 24:34" },
//     { title: "Подготовка релизной версии", type: "Одиночное", timeout: 60, date: "23:03:2024 24:34" },
//     { title: "Ревью задач других команд", type: "Совместное", timeout: 30, friends: [{ img: "/avatars/user10.png", name: "Валя", total: 3 }], date: "23:03:2024 24:34" },
//     { title: "Проверка адаптивности сайта", type: "Одиночное", timeout: 20, date: "23:03:2024 24:34" },
// ]
type UserData = {
  id: string;
  createdAt: string;
  icon: string;
  name: string;
  taskCounter: any;
  rewards: any[];
  tasks:{
     endTime: string,
                participants: any[],
                status:string,
                timeout: string,
                title: string,
                type: string
  }[]
  friend:
    | false
    | {
        status: "ACCEPTED" | "PENDING";
        id: string;
        side: "incoming" | "outgoing";
      };
  friends: any[];
};
export default function Page() {
  const router = useCustomRouter();
  const params = useParams();
  const path = usePathname();
  const { LoadedState, setLoad } = useLoadingState();
  const [open, setOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const { showNotification } = useNotification();
  const refReport = useRef<HTMLTextAreaElement>(null);
  const [task, setTask] = useState<{
    COMPLETED: any[];
    IN_PROGRESS: any[];
    CANCELLED: any[];
  }>({
    COMPLETED: [],
    IN_PROGRESS: [],
    CANCELLED: [],
  });
  const [data, setData] = useState<UserData>({
    id: "",
    createdAt: "",
    icon: "",
    name: "",
    taskCounter: "",
    rewards: [],
    friends: [],
    friend: false,
    tasks:[{
        endTime:"",
        participants:[],
        status:'',
        timeout:'',
        title:'',
        type:''
    }]
  });
  const [date, setDate] = useState<string>();
  const [info, setInfo] = useState({
    title: "",
    description: "",
    info: "",
  });

  const back = () => {
    router("/");
  };
  const openM = (title: string, description: string, info: string) => {
    setOpen(true);
    setInfo({
      title: title,
      description: description,
      info: info,
    });
  };
  const closeM = () => {
    setOpen(false);
    setInfo({
      title: "",
      description: "",
      info: "",
    });
  };
  const openRep = () => {
    setOpenReport(true);
  };
  const closeRep = () => {
    setOpenReport(false);
  };

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", params.id],
    queryFn: () => userService.User(params.id as string),
    enabled: !!params.id,
    retry: false,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    staleTime: 3000,
  });
useEffect(()=> {
if(isError) {
  setLoad(true);
  console.log(isError,'ERRORROFORFORRFROFFFFFFFFFFFFFFFFFF');
  router('/')
  
  
}
},[isError])
  const SendReport = () => {
    if (params.id && refReport.current) {
      setOpenReport(false);
      const data = userService
        .Report(params.id as string, refReport.current.value)
        .then((e) => {
          if (e.error == "У вас нету userId либо сообщения") {
            showNotification("У вас нету userId либо сообщения");
          } else if (e.error == "Слишком короткое сообщение") {
            showNotification("Слишком короткое сообщение");
          }
          console.log(e);
        })
        .catch((e) => {
          console.log(e, "error");
        });
    }
  };
  useEffect(() => {
    if (userData) {
      setLoad(true);
      setData(userData);
console.log(userData,'qadaedeadaeda');

    }
  }, [userData]);
useEffect(() => {
  if (data) {
    if (!data.createdAt) return;
    const formattedDate = new Date(data.createdAt)
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, ".");
    setDate(formattedDate);
  }
  if (data) {
    const Cancel = data.tasks.filter((e) => e.status === "CANCELLED");
    const Completed = data.tasks.filter((e) => e.status === "COMPLETED");
    const InProgress = data.tasks.filter((e) => e.status === "IN_PROGRESS");
    
    setTask({
      CANCELLED: Cancel,
      COMPLETED: Completed,
      IN_PROGRESS: InProgress,
    });
  }
}, [data]);

 useEffect(()=> {
if(isLoading) {
    setLoad(false)
}
 },[isLoading])
  const friendship =
    data.friend === false
      ? false
      : data.friend.status === "ACCEPTED"
      ? {
          status: "accepted" as const,
          id: data.friend.id,
        }
      : data.friend.status == "PENDING" && data.friend.side == "incoming"
      ? {
          status: "pending" as const,
          side: "incoming" as const,
          id: data.friend.id,
        }
      : {
          status: "pending" as const,
          side: "outgoing" as const,
          id: data.friend.id,
        };

  return (
    <>
      <div className="container !gap-[10px] pt-[7px] scrollbar-hide relative">
        <Back
          onclick={back}
          className="absolute left-[15px] top-[15px] cursor-pointer"
        />

        <Button
          onClick={openRep}
          type="Purple"
          className={`${
            LoadedState && "anim_fadeIn"
          } !bg-[#1E1E2F] py-[16px] w-full mt-[70px] flex gap-[7px] text-[1.43em]`}
          disabled={false}
          loading={false}
        >
          Пожаловаться
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.86 1H15.14L21 6.86V15.14L15.14 21H6.86L1 15.14V6.86L6.86 1Z"
              stroke="#D9D9D9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 7V11"
              stroke="#D9D9D9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 15H11.01"
              stroke="#D9D9D9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <AnyUserInfo
          userId={data.id}
          img={data.icon}
          date={date as string}
          name={data.name}
          tasks={{
            inprocess: data.taskCounter.in_progress,
            cancel: data.taskCounter.cancelled,
            success: data.taskCounter.completed,
          }}
          friendship={friendship}
        />
        <InfoBlock title="Друзья">
          <ul className="flex flex-col gap-[8px]">
            {data.friends.length > 0 &&
              data.friends.map((e, index) => (
                <UserInfo
                  className="w-full"
                  color="#2D2D4F"
                  id={e.id}
                  img={e.icon}
                  name={e.name}
                  total={e.taskCount}
                  index={index}
                />
              ))}
          </ul>
        </InfoBlock>
        <InfoBlock title="Награды">
          <ul className="flex items-center gap-[8px]">
          {data.rewards.length > 0 &&
            data.rewards.map((e) => (
              <Reward
                onClick={() =>
                  openM(
                    e.title,
                    e.description,
                    "Награда есть у 10% пользователей"
                  )
                }
                info="Награда есть у 10% пользователей"
                title={e.title}
                description={e.description}
              />
            ))}
            </ul>
        </InfoBlock>
        <TaskHomePageInfoBlock data={task.COMPLETED} type="COMPLETED" />
        <TaskHomePageInfoBlock data={task.IN_PROGRESS} type="IN_PROGRESS" />
        <TaskHomePageInfoBlock data={task.CANCELLED} type="CANCELLED" />
      </div>

      {open && (
        <div className="bg-[#1E1E2FBF] w-full h-[100vh] z-[999999] fixed left-0 top-0">
          {" "}
          <div className="min-h-[342px] anim_fadeIn bg-[#2D2D4F] flex flex-col justify-start relative items-center gap-[15px] p-[15px] rounded-[16px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[400px] w-[91%] ">
            <svg
              onClick={closeM}
              className="absolute right-[15px] top-[15px] cursor-pointer"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 2L17 17M17 2L2 17" stroke="white" strokeWidth="3" />
            </svg>

            <div>
              <svg
                width="42"
                height="37"
                viewBox="0 0 42 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.428 4.57137H31.9996V1.71426C31.9996 0.764275 31.2353 0 30.2853 0H10.857C9.90701 0 9.14273 0.764275 9.14273 1.71426V4.57137H1.71426C0.764275 4.57137 0 5.33564 0 6.28563V10.2856C0 12.8355 1.60712 15.4569 4.42137 17.4783C6.67134 19.0997 9.40702 20.1283 12.2784 20.4569C14.5212 24.1782 17.1426 25.7139 17.1426 25.7139V30.8567H13.7141C11.1927 30.8567 9.14273 32.3353 9.14273 34.8567V35.7138C9.14273 36.1852 9.52844 36.5709 9.99987 36.5709H31.1424C31.6139 36.5709 31.9996 36.1852 31.9996 35.7138V34.8567C31.9996 32.3353 29.9496 30.8567 27.4282 30.8567H23.9997V25.7139C23.9997 25.7139 26.6211 24.1782 28.8639 20.4569C31.7424 20.1283 34.4781 19.0997 36.7209 17.4783C39.528 15.4569 41.1423 12.8355 41.1423 10.2856V6.28563C41.1423 5.33564 40.378 4.57137 39.428 4.57137ZM7.09276 13.7712C5.34993 12.5141 4.57137 11.1141 4.57137 10.2856V9.14273H9.15702C9.22845 11.4713 9.5713 13.5141 10.0713 15.2998C8.99274 14.9284 7.98561 14.4141 7.09276 13.7712ZM36.5709 10.2856C36.5709 11.4356 35.3067 12.8641 34.0495 13.7712C33.1567 14.4141 32.1424 14.9284 31.0639 15.2998C31.5639 13.5141 31.9067 11.4713 31.9781 9.14273H36.5709V10.2856Z"
                  fill="#FACC15"
                />
              </svg>
            </div>
            <div className="text-white font-[400] text-[1.4em]">
              {info.title}
            </div>
            <div className="text-white font-[400] text-[1.4em]">
              {info.description}
            </div>
            <div className="text-[#FACC15] font-[400] text-[1.4em] w-full flex justify-start ">
              <p className="max-w-[198px] w-full">{info.info}</p>
            </div>
          </div>
        </div>
      )}

      {openReport && (
        <div className="report_box bg-[#1E1E2FBF] w-full h-[100vh] z-[999999] fixed left-0 top-0">
          {" "}
          <div className="min-h-[342px] anim_fadeIn bg-[#2D2D4F] flex flex-col justify-start relative items-center gap-[15px] p-[15px] rounded-[16px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[400px] w-[91%] ">
            <svg
              onClick={closeRep}
              className="absolute right-[15px] top-[15px] cursor-pointer"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 2L17 17M17 2L2 17" stroke="white" strokeWidth="3" />
            </svg>

            <div className="font-[400] text-[1.43em] text-[#D9D9D9]">
              Пожаловаться
            </div>
            <div className=" h-[253px] w-full relative">
              <textarea
                ref={refReport}
                placeholder="Напиши свою жалобу..."
              ></textarea>
              <svg
                onClick={SendReport}
                className="absolute bottom-[15px] right-[15px] cursor-pointer"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 1L10 12"
                  stroke="#D9D9D9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 1L14 21L10 12L1 8L21 1Z"
                  stroke="#D9D9D9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
