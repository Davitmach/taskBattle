'use client';

import { ITaskHomePageInfoBlockProps } from "@/app/types/infoBlock";
import { Title } from "./title";
import { AccordingBtn } from "./accordingBtn";
import { useCallback, useEffect, useRef, useState } from "react";
import { Task, TaskWithFunc } from "./task";
import { useLoadingState } from "@/app/store";
const data = [
    { title: "Написать вступление к проекту", type: "Одиночное", timeout: 10 },
    { title: "Созвон с тимлидом", type: "Совместное", timeout: 25 },
    { title: "Дизайн главной страницы", type: "Одиночное", timeout: 40 },
    { title: "Обсуждение архитектуры", type: "Совместное", timeout: 30 },
    { title: "Тестирование логина", type: "Одиночное", timeout: 15 },
    { title: "Вёрстка формы регистрации", type: "Одиночное", timeout: 35 },
    { title: "Созвон по задачам спринта", type: "Совместное", timeout: 20 },
    { title: "Обновить README", type: "Одиночное", timeout: 10 },
    { title: "UI ревью компонентов", type: "Совместное", timeout: 45 },
    { title: "Фикс багов на проде", type: "Одиночное", timeout: 50 },
    { title: "Обсудить идеи по улучшению UX", type: "Совместное", timeout: 30 },
    { title: "Переезд на новую библиотеку", type: "Одиночное", timeout: 60 },
    { title: "Созвон с дизайнером", type: "Совместное", timeout: 25 },
    { title: "Рефакторинг модулей", type: "Одиночное", timeout: 45 },
    { title: "Ревью pull request'ов", type: "Одиночное", timeout: 20 },
    { title: "Составить план на неделю", type: "Одиночное", timeout: 15 },
    { title: "Демо для заказчика", type: "Совместное", timeout: 30 },
    { title: "Оптимизация запросов", type: "Одиночное", timeout: 35 },
    { title: "Созвон по багрепортам", type: "Совместное", timeout: 40 },
    { title: "Добавить документацию к API", type: "Одиночное", timeout: 25 },
    { title: "UX-тестирование с пользователями", type: "Совместное", timeout: 50 },
    { title: "Подготовка релизной версии", type: "Одиночное", timeout: 60 },
    { title: "Ревью задач других команд", type: "Совместное", timeout: 30 },
    { title: "Проверка адаптивности сайта", type: "Одиночное", timeout: 20 },
    { title: "Созвон с менеджером продукта", type: "Совместное", timeout: 30 },
    { title: "Разработка дашборда", type: "Одиночное", timeout: 50 },
    { title: "Обсуждение дизайн-системы", type: "Совместное", timeout: 45 },
    { title: "Собрать статистику по юзерам", type: "Одиночное", timeout: 15 },
    { title: "Созвон по ретроспективе", type: "Совместное", timeout: 30 },
    { title: "Внедрение аналитики", type: "Одиночное", timeout: 35 },
    { title: "Настройка CI/CD", type: "Одиночное", timeout: 40 },
    { title: "Командная планёрка", type: "Совместное", timeout: 20 },
    { title: "Добавить логирование", type: "Одиночное", timeout: 25 },
    { title: "Обсудить метрики успеха", type: "Совместное", timeout: 30 },
    { title: "Прототипирование новой фичи", type: "Одиночное", timeout: 55 },
    { title: "Созвон по приоритетам задач", type: "Совместное", timeout: 30 },
    { title: "Подготовка к презентации", type: "Одиночное", timeout: 20 },
    { title: "UI-тесты", type: "Одиночное", timeout: 25 },
    { title: "Обсуждение нового фреймворка", type: "Совместное", timeout: 35 },
    { title: "Анализ отзывов пользователей", type: "Одиночное", timeout: 30 },
    { title: "Фиксы после ревью", type: "Одиночное", timeout: 15 },
    { title: "Созвон с техподдержкой", type: "Совместное", timeout: 20 },
    { title: "Сделать темную тему", type: "Одиночное", timeout: 45 },
    { title: "Обновить зависимости", type: "Одиночное", timeout: 20 },
    { title: "Обсудить фичи MVP", type: "Совместное", timeout: 40 },
    { title: "Настройка кэширования", type: "Одиночное", timeout: 35 },
    { title: "Созвон по финальным правкам", type: "Совместное", timeout: 30 },
    { title: "Разработка мобильной версии", type: "Одиночное", timeout: 50 },
    { title: "Финальный QA", type: "Совместное", timeout: 60 }
  ];
  const Colors = {
    cancel:['#FF4D6D','#BE3A50D9'],
    complete:['#00C896','#A2E9BA'],
    inprocess:['#FACC15','#DDDD9C']
  }
export const TaskHomePageInfoBlock = (props:ITaskHomePageInfoBlockProps) => {
    const [open,setOpen] = useState(true);
    const refDiv = useRef<HTMLDivElement>(null);
    const [height,setHeight] = useState(0);
    const [click,setClick] = useState(false);
    const {LoadedState} = useLoadingState();
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
    case 'cancel':
        setTitle('Отмененные');
        break;
    case 'complete':
        setTitle('Выполненные');
        break;
    case 'inprocess':
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
    ref={refDiv} className={` tasks_box  duration-[.2s] overflow-x-hidden flex flex-col gap-[10px] max-h-[230px]`}>{data.map((e)=> {
      if(props.type == 'inprocess') {
return <TaskWithFunc  timeout={e.timeout} title={e.title} type={e.type as 'Совместное'|'Одиночное'} key={e.title}/>
      }
      else {
        return  <Task color={props.type == 'cancel' ? '#BE3A50D9' : props.type=='complete' ?'#A2E9BA':''} timeout={e.timeout} title={e.title} type={e.type as 'Совместное'|'Одиночное'} key={e.title}/>
      }
    })}</div>
</div>
)
}