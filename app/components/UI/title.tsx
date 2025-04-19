import { ITitleProps } from "@/app/types/title";

export const Title = (props:ITitleProps)=> {
return(
    <h1 style={{color:props.color}} className={props?.className}>{props.children}</h1>
)
}