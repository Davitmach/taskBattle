'use client';
import { useEffect,useState } from "react";
import { IAnyUserInfo, IMyUserInfo } from "@/app/types/userInfo"
import { Button } from "../UI/button"
import { useLoadingState } from "@/app/store";

export const AnyUserInfo = (props: IAnyUserInfo) => {
    const [substring, setSubstring] = useState(true); 
    const {LoadedState} = useLoadingState()
      useEffect(() => {       
        const updateSubstringg = () => {         
          if (window.innerWidth < 415) {   
            setSubstring(false);
          } 
          else {
            setSubstring(true);
          }
       
        };
      
        updateSubstringg(); 
        window.addEventListener('resize', updateSubstringg); 
      
        return () => {
          window.removeEventListener('resize', updateSubstringg);
        };
      }, []);
    return (
        <div className={`p-[10px] bg-[#1E1E2F] rounded-[16px] w-full ${LoadedState &&'anim_fadeIn'}`}>
            <div className={`flex gap-[10px] items-start justify-between ${typeof props.friendship !=='boolean' &&  props.friendship.status=='pending' && props.friendship.side=='incoming' &&'flex-col'}`}>
                <div className="flex gap-[8px]">
                    <div><img src={props.img} width={44} height={44} className="rounded-[6px]"/></div>
                    <div>
                        <h1 className="text-[1em] text-[#D9D9D9] font-[400]">{props.name}</h1>
                        <span className="text-[1.071em] text-[#D9D9D9] font-[400]">{substring  ? 'Аккаунт создан' :'Создан'}:{props.date}</span>
                    </div>
                </div>
                <div>
                    {typeof props.friendship !=='boolean' &&  props.friendship.status=='pending' && props.friendship.side=='incoming' ? 
                    
                    <div className={`flex  gap-[8px]`}>
                        <Button onClick={()=> {
                            if( typeof props.friendship  =='boolean')return;
                            console.log(props.friendship.id);
                            
                            
                        }} type='Green' loading={false} className="flex gap-[3px] !w-[109px] text-[1em] py-[11px] px-[7px]">
                     <span>Принять</span>
                      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.86364 11.6364V10.4546C9.86364 9.8277 9.61461 9.2265 9.17134 8.78324C8.72808 8.33997 8.12688 8.09094 7.5 8.09094H3.36364C2.73676 8.09094 2.13556 8.33997 1.69229 8.78324C1.24903 9.2265 1 9.8277 1 10.4546V11.6364" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.43175 5.72727C6.73715 5.72727 7.79539 4.66904 7.79539 3.36364C7.79539 2.05824 6.73715 1 5.43175 1C4.12635 1 3.06812 2.05824 3.06812 3.36364C3.06812 4.66904 4.12635 5.72727 5.43175 5.72727Z" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12.2273 3.95453V7.49998" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14 5.72729H10.4546" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                    </Button>
                        <Button onClick={()=> {
                            if( typeof props.friendship  =='boolean')return;
                            console.log(props.friendship.id);
                            
                            
                        }} type='Green' loading={false} className="flex gap-[3px] !w-[109px] text-[1em] py-[11px] px-[7px]">
                     <span>Отклонить</span>
                        <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M9.86364 11.6364V10.4546C9.86364 9.8277 9.61461 9.2265 9.17134 8.78324C8.72808 8.33997 8.12688 8.09094 7.5 8.09094H3.36364C2.73676 8.09094 2.13556 8.33997 1.69229 8.78324C1.24903 9.2265 1 9.8277 1 10.4546V11.6364" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                 <path d="M5.43175 5.72727C6.73715 5.72727 7.79539 4.66904 7.79539 3.36364C7.79539 2.05824 6.73715 1 5.43175 1C4.12635 1 3.06812 2.05824 3.06812 3.36364C3.06812 4.66904 4.12635 5.72727 5.43175 5.72727Z" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                 <path d="M14 5.72729H10.4546" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                             </svg>
                    </Button>
                    </div>
                    :    <Button onClick={()=> {
                        if(props.friendship==true) {
                            console.log(props.userId);
                            
                        }
                        else {
                             console.log(props.userId);
                        }
                     
                    }} type='Green' loading={false} className="text-[1em] py-[11px] px-[7px]">
                        {props.friendship === true ? (
                             <span className="flex items-center gap-[6px]">
                            Удалить
                             <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M9.86364 11.6364V10.4546C9.86364 9.8277 9.61461 9.2265 9.17134 8.78324C8.72808 8.33997 8.12688 8.09094 7.5 8.09094H3.36364C2.73676 8.09094 2.13556 8.33997 1.69229 8.78324C1.24903 9.2265 1 9.8277 1 10.4546V11.6364" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                 <path d="M5.43175 5.72727C6.73715 5.72727 7.79539 4.66904 7.79539 3.36364C7.79539 2.05824 6.73715 1 5.43175 1C4.12635 1 3.06812 2.05824 3.06812 3.36364C3.06812 4.66904 4.12635 5.72727 5.43175 5.72727Z" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                 <path d="M14 5.72729H10.4546" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                             </svg>
                         </span>
                        ) : props.friendship==false ? (
                            <span className="flex items-center gap-[6px]">
                                Добавить
                                <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.86364 11.6364V10.4546C9.86364 9.8277 9.61461 9.2265 9.17134 8.78324C8.72808 8.33997 8.12688 8.09094 7.5 8.09094H3.36364C2.73676 8.09094 2.13556 8.33997 1.69229 8.78324C1.24903 9.2265 1 9.8277 1 10.4546V11.6364" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.43175 5.72727C6.73715 5.72727 7.79539 4.66904 7.79539 3.36364C7.79539 2.05824 6.73715 1 5.43175 1C4.12635 1 3.06812 2.05824 3.06812 3.36364C3.06812 4.66904 4.12635 5.72727 5.43175 5.72727Z" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12.2273 3.95453V7.49998" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14 5.72729H10.4546" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                        ) : props.friendship.status=='pending' && props.friendship.side=='outgoing' &&  <span className="flex items-center gap-[6px]">
                            Отменить
                             <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M9.86364 11.6364V10.4546C9.86364 9.8277 9.61461 9.2265 9.17134 8.78324C8.72808 8.33997 8.12688 8.09094 7.5 8.09094H3.36364C2.73676 8.09094 2.13556 8.33997 1.69229 8.78324C1.24903 9.2265 1 9.8277 1 10.4546V11.6364" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                 <path d="M5.43175 5.72727C6.73715 5.72727 7.79539 4.66904 7.79539 3.36364C7.79539 2.05824 6.73715 1 5.43175 1C4.12635 1 3.06812 2.05824 3.06812 3.36364C3.06812 4.66904 4.12635 5.72727 5.43175 5.72727Z" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                 <path d="M14 5.72729H10.4546" stroke="#1E1E2F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                             </svg>
                         </span>}
                    </Button>}
                
                </div>
            </div>
            <div className="flex w-full justify-between mt-[24px]">
                <div className="flex flex-col justify-center items-center ">
                    <h1 className="font-[400] text-[1em] text-[#00C896]">Выполненные</h1>
                    <div className="font-[400] text-[1em] text-[#00C896]">{props.tasks.success}</div>
                </div>
                <div className="flex flex-col justify-center items-center ">
                    <h1 className="font-[400] text-[1em] text-[#FACC15]">В процессе</h1>
                    <div className="font-[400] text-[1em] text-[#FACC15]">{props.tasks.inprocess}</div>
                </div>
                <div className="flex flex-col justify-center items-center ">
                    <h1 className="font-[400] text-[1em] text-[#FF4D6D]">Отмененные</h1>
                    <div className="font-[400] text-[1em] text-[#FF4D6D]">{props.tasks.cancel}</div>
                </div>
            </div>
        </div>
    )
}
export const MyUserInfo = (props: IMyUserInfo) => {
    const [substring, setSubstring] = useState(true); 
    const {LoadedState} = useLoadingState()
      useEffect(() => {       
        const updateSubstringg = () => {         
          if (window.innerWidth < 415) {   
            setSubstring(false);
          } 
          else {
            setSubstring(true);
          }
       
        };
      
        updateSubstringg(); 
        window.addEventListener('resize', updateSubstringg); 
      
        return () => {
          window.removeEventListener('resize', updateSubstringg);
        };
      }, []);
    return (
        <div className={`mt-[18px] p-[10px] bg-[#1E1E2F] rounded-[16px] w-full ${LoadedState &&'anim_fadeIn'}`}>
            <div className="flex gap-[10px] items-center justify-between">
                <div className="flex gap-[8px]">
                    <div><img src={props.img} width={44} height={44} className="rounded-[6px]"/></div>
                    <div>
                        <h1 className="text-[1em] text-[#D9D9D9] font-[400]">{props.name}</h1>
                        <span className="text-[1.071em] text-[#D9D9D9] font-[400]">{substring  ? 'Аккаунт создан' :'Создан'}:{props.date}</span>
                    </div>
                </div>
            
            </div>
            <div className="flex w-full justify-between mt-[24px]">
                <div className="flex flex-col justify-center items-center ">
                    <h1 className="font-[400] text-[1em] text-[#00C896]">Выполненные</h1>
                    <div className="font-[400] text-[1em] text-[#00C896]">{props.tasks.success}</div>
                </div>
                <div className="flex flex-col justify-center items-center ">
                    <h1 className="font-[400] text-[1em] text-[#FACC15]">В процессе</h1>
                    <div className="font-[400] text-[1em] text-[#FACC15]">{props.tasks.inprocess}</div>
                </div>
                <div className="flex flex-col justify-center items-center ">
                    <h1 className="font-[400] text-[1em] text-[#FF4D6D]">Отмененные</h1>
                    <div className="font-[400] text-[1em] text-[#FF4D6D]">{props.tasks.cancel}</div>
                </div>
            </div>
        </div>
    )
}
