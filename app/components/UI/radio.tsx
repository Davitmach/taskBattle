import { IRadio } from "@/app/types/radio"

export const Radio = (props:IRadio)=> {
    const HandleActive = ()=> {
        props.setActive(props.text);
    }
    return(
        <div className="flex items-center gap-[8px] cursor-pointer"  onClick={HandleActive}>
            <div className="w-[20px] h-[20px] duration-[400ms] active:scale-[0.9] rounded-[100px] bg-[#1E1E2F]  flex items-center justify-center">{props.active == props.text &&<div className="w-[10px] h-[10px] rounded-[100px] bg-[#7F5AF0]"></div>}</div>
            <div className="text-[#FFFFFF] flex gap-[4px] text-[15px] ">{props.text}</div>
        </div>
    )
}