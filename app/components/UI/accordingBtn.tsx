'use client'
import { IAccordingBtnProps, IAccordingBtnWithoutAnimProps } from "@/app/types/accordingBtn"
import { useEffect } from "react"

export const AccordingBtn = (props:IAccordingBtnProps) => {

    if(props.state == false) return <svg className="cursor-pointer duration-[400ms] active:scale-[0.9]" onClick={props.onClick} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="15" height="15" rx="3" fill={props.color}/>
    <path d="M11 10H4L7.5 5L11 10Z" fill={props.innerColor ? props.innerColor:'#D9D9D9'}/>
    </svg>
    
    else return(
        <svg className="cursor-pointer duration-[400ms] active:scale-[0.9]" onClick={props.onClick} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="15" height="15" rx="3" fill={props.color}/>
<path d="M4 6H11L7.5 11L4 6Z" fill={props.innerColor ? props.innerColor:'#D9D9D9'}/>
</svg>
    )
}
export const AccordingBtnWithoutAnim = (props:IAccordingBtnWithoutAnimProps) => {

 return(
    <svg className={`cursor-pointer duration-[400ms] active:scale-[0.9]  ${props.className}`} onClick={props.onClick} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="15" height="15" rx="3" fill={props.color}/>
    <path d="M11 10H4L7.5 5L11 10Z" fill={props.innerColor ? props.innerColor:'#D9D9D9'}/>
    </svg>
 )
}