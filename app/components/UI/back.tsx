import { IBackProps } from "@/app/types/back"

export const Back = (props:IBackProps) => { 
return(
    <svg onClick={props.onclick} className={`${props.className} duration-[400ms] active:scale-[0.9]`} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25 13H1" stroke="#F1F1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13 25L1 13L13 1" stroke="#F1F1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

)

}