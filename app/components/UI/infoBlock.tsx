'use client';

import { ITaskHomePageInfoBlockProps } from "@/app/types/infoBlock";
import { Title } from "./title";
import { AccordingBtn } from "./accordingBtn";
import { useCallback, useEffect, useState } from "react";
import { Task } from "./task";

export const TaskHomePageInfoBlock = (props:ITaskHomePageInfoBlockProps) => {
    const [open,setOpen] = useState(false);
    const HandleOpen = useCallback(()=> {
setOpen(!open);
    },[open])



return(
<div className="task_home_page_info_block bg-[#1E1E2F] rounded-[16px] py-[10px] px-[15px] flex flex-col gap-[20px] ">
    <div className="flex items-center justify-between">
        <div><Title color={props.color} className={`text-[20px] font-[400] `}>{props.title}</Title></div>
        <div><AccordingBtn state={open} onClick={HandleOpen} color={props.color}/></div>
    </div>
    <div><Task/></div>
</div>
)
}