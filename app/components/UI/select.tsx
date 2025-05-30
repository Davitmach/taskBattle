'use client';
import { ISelect } from "@/app/types/select"
import { useState } from "react";

export const Select = (props:ISelect)=> {
    const [active,setActive] = useState<boolean>(false);
     const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Останавливаем всплытие
    
    
    if(props.active.includes(props.default)) {
        props.setActive((prev)=> prev.filter((e)=> e !==props.default.toString()))
        setActive(false);
        
    }
    else {
        props.setActive((prev)=> [...prev,props.default.toString()]);
        setActive(true);
    }
     }

    return(
        <div  onClick={handleClick} className="bg-[#1E1E2F] w-[24px] h-[24px] rounded-[4px] cursor-pointer flex items-center justify-center"> <svg style={{
            opacity:active?'1':'0',
            transition:'.2s'
        }} width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 6L6 11L16 1" stroke="white" strokeWidth="2"/>
</svg></div>
    )
}