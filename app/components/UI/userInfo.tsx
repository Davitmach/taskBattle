import { useCustomRouter } from "@/app/hooks/Router"
import { IUserInfoProps } from "@/app/types/userInfo"
import { Select } from "./select";
import { userService } from "@/app/service/userService";
import { useQueryClient } from "@tanstack/react-query";

export const UserInfo = (props:IUserInfoProps) => {
  const queryClient = useQueryClient();
  const router = useCustomRouter();
  const handleClick = () => {
    if(props.id) {
router('/user/:id',{id: props.id.toString()})
    }
  }
const Delete = async (e: React.MouseEvent<HTMLOrSVGElement>) => {
  e.stopPropagation();
  
  if (props.id && props.friendId) {
    try {
      // Удаляем друга и ждем завершения запроса
      await userService.DeleteFriend(props.id, props.friendId);
      
      // 1. Инвалидируем кэш запроса друзей
      queryClient.invalidateQueries({
        queryKey: ['userFriends'] // Тот же ключ, что и в useQuery для друзей
      });
      
      // 2. Опционально: сразу делаем новый запрос
      await queryClient.refetchQueries({
        queryKey: ['userFriends']
      });
      
    } catch (error) {
      console.error('Ошибка при удалении друга:', error);
    }
  }
};
    return(
<li onClick={handleClick} style={{background:props.color}} key={props.index} className={`flex items-center gap-2  rounded-[13px] p-[9px] justify-between cursor-pointer ${props.className && props.className}`}>
  <div style={{background:props.color}} className={`flex items-center gap-2  rounded-[13px]`}>
<div><img src={props.img} className='rounded-[50px]' width={43} height={43} /></div>
<div className='flex flex-col'>
  <span className='text-[1em] text-[#F1F1F1] font-[400]'>{props.name}</span>
  <span className='text-[1em] text-[#F1F1F1] font-[400]'>Total Tasks:{props.total}</span>
</div>
</div>
<div className="flex flex-col justify-center items-center gap-[4px]">
    {
    props.delete ==true ?
      <svg onClick={Delete} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 6L6 18" stroke="#FF4D6D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6 6L18 18" stroke="#FF4D6D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
:props.delete=='cancel' && <div onClick={Delete}  className="text-[#FF4D6D] text-[13px]">Отменить</div>
  }
  {
    props.friend ? <div><svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 19.5V17.5C16 16.4391 15.5786 15.4217 14.8284 14.6716C14.0783 13.9214 13.0609 13.5 12 13.5H5C3.93913 13.5 2.92172 13.9214 2.17157 14.6716C1.42143 15.4217 1 16.4391 1 17.5V19.5" stroke="#F1F1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.5 9.5C10.7091 9.5 12.5 7.70914 12.5 5.5C12.5 3.29086 10.7091 1.5 8.5 1.5C6.29086 1.5 4.5 3.29086 4.5 5.5C4.5 7.70914 6.29086 9.5 8.5 9.5Z" stroke="#F1F1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 9.5L19 11.5L23 7.5" stroke="#F1F1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    </div> :''
  }

  {
    props.isSelectFriend == true &&
   <><Select default={props.id as string}  active={props.friendSelect as string[]} setActive={props.setFriendSelect as React.Dispatch<React.SetStateAction<string[]>>}/></> 
  }
  {props.state ? <><div>{props.state == 1 ?<svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.09091 11.1818C8.90254 11.1818 11.1818 8.90254 11.1818 6.09091C11.1818 3.27928 8.90254 1 6.09091 1C3.27928 1 1 3.27928 1 6.09091C1 8.90254 3.27928 11.1818 6.09091 11.1818Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3.33459 10.3746L2.45459 17L6.09095 14.8182L9.72732 17L8.84732 10.3673" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
 :''}</div><div className={`text-[#D9D9D9] font-[400] text-[1.42em]  ${props.state !== 1 && 'translate-y-[10px]'}`}>#{props.state}</div></>:''}
</div>
</li>
    )
}

