'use client';

import { IInfoBlock, ITaskHomePageInfoBlockProps } from "@/app/types/infoBlock";
import { Title } from "./title";
import { AccordingBtn } from "./accordingBtn";
import { useCallback, useEffect, useRef, useState } from "react";
import { Task, TaskWithFunc } from "./task";
import { useLoadingState } from "@/app/store";
const data = [
    { title: "Написать вступление к проекту", type: "Одиночное", timeout: 10, date: "23:03:2024 24:34" },
    { title: "Созвон с тимлидом", type: "Совместное", timeout: 25, friends: [{ img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIH3cVN9nVOwezMJZgjRo0YhASylFMo1nJpw&s", name: "Аня", total: 3 },{ img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIH3cVN9nVOwezMJZgjRo0YhASylFMo1nJpw&s", name: "Аня", total: 3 },{ img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIH3cVN9nVOwezMJZgjRo0YhASylFMo1nJpw&s", name: "Аня", total: 3 },{ img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIH3cVN9nVOwezMJZgjRo0YhASylFMo1nJpw&s", name: "Аня", total: 3 }], date: "23:03:2024 24:34" },
    { title: "Дизайн главной страницы", type: "Одиночное", timeout: 40, date: "23:03:2024 24:34" },
    { title: "Обсуждение архитектуры", type: "Совместное", timeout: 30, friends: [{ img: "/avatars/user2.png", name: "Богдан", total: 4 }], date: "23:03:2024 24:34" },
    { title: "Тестирование логина", type: "Одиночное", timeout: 15, date: "23:03:2024 24:34" },
    { title: "Вёрстка формы регистрации", type: "Одиночное", timeout: 35, date: "23:03:2024 24:34" },
    { title: "Созвон по задачам спринта", type: "Совместное", timeout: 20, friends: [{ img: "/avatars/user3.png", name: "Вика", total: 2 }], date: "23:03:2024 24:34" },
    { title: "Обновить README", type: "Одиночное", timeout: 10, date: "23:03:2024 24:34" },
    { title: "UI ревью компонентов", type: "Совместное", timeout: 45, friends: [{ img: "/avatars/user4.png", name: "Сергей", total: 6 }], date: "23:03:2024 24:34" },
    { title: "Фикс багов на проде", type: "Одиночное", timeout: 50, date: "23:03:2024 24:34" },
    { title: "Обсудить идеи по улучшению UX", type: "Совместное", timeout: 30, friends: [{ img: "/avatars/user5.png", name: "Катя", total: 5 }], date: "23:03:2024 24:34" },
    { title: "Переезд на новую библиотеку", type: "Одиночное", timeout: 60, date: "23:03:2024 24:34" },
    { title: "Созвон с дизайнером", type: "Совместное", timeout: 25, friends: [{ img: "/avatars/user6.png", name: "Артур", total: 3 }], date: "23:03:2024 24:34" },
    { title: "Рефакторинг модулей", type: "Одиночное", timeout: 45, date: "23:03:2024 24:34" },
    { title: "Ревью pull request'ов", type: "Одиночное", timeout: 20, date: "23:03:2024 24:34" },
    { title: "Составить план на неделю", type: "Одиночное", timeout: 15, date: "23:03:2024 24:34" },
    { title: "Демо для заказчика", type: "Совместное", timeout: 30, friends: [{ img: "/avatars/user7.png", name: "Денис", total: 4 }], date: "23:03:2024 24:34" },
    { title: "Оптимизация запросов", type: "Одиночное", timeout: 35, date: "23:03:2024 24:34" },
    { title: "Созвон по багрепортам", type: "Совместное", timeout: 40, friends: [{ img: "/avatars/user8.png", name: "Настя", total: 2 }], date: "23:03:2024 24:34" },
    { title: "Добавить документацию к API", type: "Одиночное", timeout: 25, date: "23:03:2024 24:34" },
    { title: "UX-тестирование с пользователями", type: "Совместное", timeout: 50, friends: [{ img: "/avatars/user9.png", name: "Лёша", total: 7 }], date: "23:03:2024 24:34" },
    { title: "Подготовка релизной версии", type: "Одиночное", timeout: 60, date: "23:03:2024 24:34" },
    { title: "Ревью задач других команд", type: "Совместное", timeout: 30, friends: [{ img: "/avatars/user10.png", name: "Валя", total: 3 }], date: "23:03:2024 24:34" },
    { title: "Проверка адаптивности сайта", type: "Одиночное", timeout: 20, date: "23:03:2024 24:34" },
]
  const Colors = {
    CANCELLED:['#FF4D6D','#BE3A50D9'],
    COMPLETED:['#00C896','#A2E9BA'],
   IN_PROGRESS:['#FACC15','#DDDD9C']
  }
export const TaskHomePageInfoBlock = (props:ITaskHomePageInfoBlockProps) => {
    const [open,setOpen] = useState(true);
    const refDiv = useRef<HTMLDivElement>(null);
    const [height,setHeight] = useState(0);
    const [click,setClick] = useState(false);
    const {LoadedState} = useLoadingState();
    const [TASKS,setTASKS] = useState<any>([]);
   
    useEffect(()=> {
setTASKS(props.data);
    },[])
const [title,setTitle] = useState<string>('');
    const HandleOpen = useCallback(()=> {
        setClick(true);

setOpen(!open);
    },[open])

useEffect(()=> {

if(refDiv.current?.clientHeight) {
    setHeight(refDiv.current.clientHeight);
}

},[])
useEffect(()=> {
switch (props.type) {
    case 'CANCELLED':
        setTitle('Отмененные');
        break;
    case 'COMPLETED':
        setTitle('Выполненные');
        break;
    case 'IN_PROGRESS':
        setTitle('В процессе');
        break;

}
},[props.type])
return(
<div className={`${LoadedState && 'anim_fadeIn'} w-full task_home_page_info_block bg-[#1E1E2F] rounded-[16px] py-[10px] px-[15px] flex duration-[.2s] flex-col ${open == false ? 'gap-[0px]':'gap-[20px]'} `}>
    <div className="flex items-center justify-between">
        <div><Title color={Colors[props.type][0]} className={`text-[1.43em] font-[400] `}>{title}</Title></div>
        <div><AccordingBtn state={open} onClick={HandleOpen} color={Colors[props.type][0]}/></div>
    </div>
    <div 
    style={click == false ? {height:'auto'} : open ? {height:`${height}px`}:{height:'0px'}}
    ref={refDiv} className={` tasks_box  duration-[.2s] scrollbar-hide overflow-x-hidden flex flex-col gap-[10px] max-h-[230px]`}>{TASKS?TASKS.map((e:any)=> {
        if(props.type == 'IN_PROGRESS') {
  return <TaskWithFunc phrase='<p>qaqem</p>' date={e.date} friends={e.friends ? e.friends :[]}  timeout={e.timeout} title={e.title} type={e.type=='SINGLE'?'Одиночное':'Совместное'} key={e.title}/>
        }
        else {
          return  <Task date={e.date} friends={e.friends ? e.friends :[]} color={props.type == 'CANCELLED' ? '#BE3A50D9' : props.type=='COMPLETED' ?'#A2E9BA':''} timeout={e.timeout} title={e.title} type={e.type=='SINGLE'?'Одиночное':'Совместное'} key={e.title}/>
        }
      })  :  data.map((e:any)=> {
      if(props.type == 'IN_PROGRESS') {
return <TaskWithFunc phrase='<p>qaqem</p>' date={e.date} friends={e.friends ? e.friends :[]}  timeout={e.timeout} title={e.title} type={e.type as 'Совместное'|'Одиночное'} key={e.title}/>
      }
      else {
        return  <Task date={e.date} friends={e.friends ? e.friends :[]} color={props.type == 'CANCELLED' ? '#BE3A50D9' : props.type=='COMPLETED' ?'#A2E9BA':''} timeout={e.timeout} title={e.title} type={e.type=='SINGLE'?'Одиночное':'Совместное'} key={e.title}/>
      }
    })}</div>
</div>
)
}

export const InfoBlock = (props:IInfoBlock)=> {
    const [open,setOpen] = useState(true);
    const refDiv = useRef<HTMLDivElement>(null);
    const [height,setHeight] = useState(0);
    const [click,setClick] = useState(false);
    const {LoadedState} = useLoadingState();

    const HandleOpen = useCallback(()=> {
        setClick(true);

setOpen(!open);
    },[open])

useEffect(()=> {

if(refDiv.current?.clientHeight) {
    setHeight(refDiv.current.clientHeight);
}

},[])

return(
<div className={`${LoadedState && 'anim_fadeIn'} w-full task_home_page_info_block bg-[#1E1E2F] rounded-[16px] py-[10px] px-[15px] flex duration-[.2s] flex-col ${open == false ? 'gap-[0px]':'gap-[20px]'} `}>
    <div className="flex items-center justify-between">
        <div><Title color={'#D9D9D9'} className={`text-[1.43em] font-[400] `}>{props.title}</Title></div>
        <div><AccordingBtn state={open} onClick={HandleOpen} color={'#D9D9D9'} innerColor="#1E1E2F"/></div>
    </div>
    <div 
    style={click == false ? {height:'auto'} : open ? {height:`${height}px`}:{height:'0px'}}
    ref={refDiv} className={` tasks_box  duration-[.2s] scrollbar-hide overflow-x-hidden flex flex-col gap-[10px] max-h-[230px]`}>{props.children}</div>
</div>
)
}