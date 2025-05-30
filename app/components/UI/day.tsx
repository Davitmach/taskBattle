'use client';
import {TDay } from "@/app/types/calendar"
import { useEffect, useState } from "react";

export const Day = (props:TDay)=> {
    const [active,setActive] = useState<boolean>(false);
    const HandleClick = ()=> {
props.setActive(props.day)

    }
    useEffect(()=> {
if(props.active== props.day) {
    setActive(true)
}
else {
    setActive(false);
}
    },[props.active])
    return(
        <div onClick={HandleClick} className={`text-[#FFFFFF] text-[20px] cursor-pointer font-[400] ${active && 'bg-[#2D2D4F]'} w-[37px] h-[28px] flex items-center justify-center rounded-[4px]`}>{props.day}</div>
    )
}