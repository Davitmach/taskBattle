'use client';
import { useEffect, useRef, useState } from "react";
import { Back } from "../components/UI/back";
import { Radio } from "../components/UI/radio";
import { Title } from "../components/UI/title";
import { useCustomRouter } from "../hooks/Router";
import { InfoBlock } from "../components/UI/infoBlock";
import { UserInfo } from "../components/UI/userInfo";
import { Select } from "../components/UI/select";
import { Calendar } from "../components/Shared/calendar";
import { Button } from "../components/UI/button";
import { taskService } from "../service/taskService";
import { useNotification } from "../provider/notification";
import { useUserProfile } from "../store";

export default function Page() {
          const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
       const router = useCustomRouter();
       const {friends} = useUserProfile();
       const [active,setActive] = useState('Одиночное');
       const [selectedFriend,setSelectedFriend] = useState<string[]>([]);
         const [month, setMonth] = useState(currentMonth);
         const [year, setYear] = useState(currentYear);
           const [activeDay,setActiveDay] = useState<string>('')
           const refHour = useRef<HTMLInputElement>(null);
           const refMin = useRef<HTMLInputElement>(null);
           const refTitle = useRef<HTMLInputElement>(null);
           const {showNotification} = useNotification();
        const GoBack = ()=> {
    router('/');
        }

        const CreateTask = ()=> {
          if(!refMin.current || !refHour.current || !refTitle.current) return;
            const type: "MULTI" | "SINGLE" = active === "Совместное" ? "MULTI" : "SINGLE";
          
            taskService.createTask(showNotification, refMin.current.value,refHour.current.value,activeDay,month,year,router,refTitle.current.value,type,selectedFriend)
          
        }

    return(
        <div className="container pt-[7px] scrollbar-hide relative  ">
             <Back onclick={GoBack} className="absolute cursor-pointer left-[0] top-[40px]"/>
             <Title className="font-[400] text-[4.57em]"color={'#F1F1F1'}>New Task</Title>
             <div className="search_input  w-full relative mt-[-10px] "><input ref={refTitle}  placeholder="Название таска..." /></div>
           <div className="inline-flex flex-col gap-[4px] w-full ">
             <Radio setActive={setActive} active={active}  text={'Совместное'}/>
              <Radio setActive={setActive} active={active}  text={'Одиночное'}/>
              </div>
             {active=='Совместное' && <InfoBlock title="Друзья" ><ul className="flex flex-col gap-[8px]">
              {
                friends.length>0 && friends.map((e,index)=> (
<UserInfo setFriendSelect={setSelectedFriend} friendSelect={selectedFriend} isSelectFriend={true} id={e.id}  className="w-full" color="#2D2D4F" img={e.icon} name={e.name}  total={e._count.tasks} index={index}/>
                ))
              }
              
</ul></InfoBlock>} 
        <Calendar setDay={setActiveDay} setMonth={setMonth} setYear={setYear} year={year}  currentMonth={currentMonth} currentYear={currentYear} day={activeDay} month={month} refHour={refHour} refMin={refMin}/>
        <Button onClick={CreateTask} loading={false} type='Purple' className="duration-[200ms] active:scale-[0.9] w-full py-[8px] text-[27px]">Создать задачу</Button>
        </div>
    )
}