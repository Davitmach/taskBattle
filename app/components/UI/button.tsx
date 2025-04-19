import { IButtonProps, ButtonType } from "@/app/types/button"
import { LoadingBar } from "../Shared/loadingBar"

export const Button = (props:IButtonProps)=> {
    const Styles: Record<ButtonType, React.CSSProperties> = {
        Purple:{
            backgroundColor: '#2D2D4F',
            color: '#F1F1F1',
            border: 'none',   
            borderRadius: '13px',
            cursor: 'pointer', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        Green:{
            backgroundColor: '#A2E9BA',
            color: '#1E1E2F',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            
        }
    }
    return(
        <button style={Styles[props.type]} disabled={props.disabled} onClick={props?.onClick} className={`${props?.className}  outline-none hover:opacity-[.9] transition-[3400] `} >{props.loading == false? props.children : <LoadingBar height={40} width={40} size={4} color="#F1F1F1"/>}</button>
    )
}
