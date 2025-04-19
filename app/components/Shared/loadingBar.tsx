import { ILoadingBarProps } from "@/app/types/loadingBar"

export const LoadingBar = (props:ILoadingBarProps) => { 

    return(
        <div style={{
            width: props.width,
            height: props.height,
         
            borderWidth: props.size,
          borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: props.color,

           
        }} className="anim_rotate  rounded-[50px]     "></div>
    )
}