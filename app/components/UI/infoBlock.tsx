'use client';

import { IInfoBlock, ITaskHomePageInfoBlockProps } from "@/app/types/infoBlock";
import { Title } from "./title";
import { AccordingBtn } from "./accordingBtn";
import { useCallback, useEffect, useRef, useState } from "react";
import { Task, TaskWithFunc } from "./task";
import { useLoadingState } from "@/app/store";

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
const [tasks,setTasks] = useState([]);
const [title,setTitle] = useState<string>('');
    const HandleOpen = useCallback(()=> {
        setClick(true);

setOpen(!open);
    },[open])

useEffect(() => {
  const updateHeight = () => {
    
    
   
    if (refDiv.current?.clientHeight) {
      setHeight(refDiv.current.clientHeight);
    }
  };

  if ((props.data && props.data.length > 0) || tasks.length > 0) {
    // Нужно немного подождать, чтобы DOM успел обновиться
    setTimeout(updateHeight, 0);
  }
}, [props.data, tasks]);
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

useEffect(()=> {
if(props.data) {
    setTasks(props.data as any)
}

},[props.data])



return(
<div className={`${LoadedState && 'anim_fadeIn'} w-full task_home_page_info_block bg-[#1E1E2F] rounded-[16px] py-[10px] px-[15px] flex duration-[.2s] flex-col ${open == false ? 'gap-[0px]':'gap-[20px]'} `}>
    <div className="flex items-center justify-between">
        <div><Title color={Colors[props.type][0]} className={`text-[1.43em] font-[400] `}>{title}</Title></div>
        <div><AccordingBtn state={open} onClick={HandleOpen} color={Colors[props.type][0]}/></div>
    </div>
    <div 
    style={click == false ? {height:'auto'} : open ? {height:`${height}px`}:{height:'0px'}}
    ref={refDiv} className={` tasks_box  duration-[.2s] scrollbar-hide overflow-x-hidden flex flex-col gap-[10px] max-h-[230px]`}>{tasks?tasks.map((e:any)=> {
        if(props.type == 'IN_PROGRESS') {
  return <TaskWithFunc phrase={e.comment} date={e.endTime} friends={e.participants ? e.participants :[]}  timeout={e.timeout} title={e.title} type={e.type=='SINGLE'?'Одиночное':'Совместное'} key={e.title}/>
        }
        else {
          return  <Task phrase={e.comment} date={e.endTime} friends={e.participants ? e.participants :[]} color={props.type == 'CANCELLED' ? '#BE3A50D9' : props.type=='COMPLETED' ?'#A2E9BA':''} timeout={e.timeout} title={e.title} type={e.type=='SINGLE'?'Одиночное':'Совместное'} key={e.title}/>
        }
      }):'3424432324324' }</div>
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

useEffect(() => {
  const updateHeight = () => {
    
    
   
    if (refDiv.current?.clientHeight) {    
      setHeight(refDiv.current.clientHeight);
    }
  };

  if ((props.children && props.children) ) {
    // Нужно немного подождать, чтобы DOM успел обновиться
    setTimeout(updateHeight, 0);
  }
}, [props.children]);

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