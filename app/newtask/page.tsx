'use client';
import { useEffect, useState } from "react";
import { Back } from "../components/UI/back";
import { Radio } from "../components/UI/radio";
import { Title } from "../components/UI/title";
import { useCustomRouter } from "../hooks/Router";
import { InfoBlock } from "../components/UI/infoBlock";
import { UserInfo } from "../components/UI/userInfo";
import { Select } from "../components/UI/select";
import { Calendar } from "../components/Shared/calendar";
import { Button } from "../components/UI/button";

export default function Page() {
       const router = useCustomRouter();
       const [active,setActive] = useState('Одиночное');
       const [selectedFriend,setSelectedFriend] = useState<string[]>([]);
        const GoBack = ()=> {
    router('/');
        }
        useEffect(()=> {
console.log(selectedFriend);

        },[selectedFriend])
    return(
        <div className="container pt-[7px] scrollbar-hide relative anim_fadeIn">
             <Back onclick={GoBack} className="absolute cursor-pointer left-[0] top-[40px]"/>
             <Title className="font-[400] text-[4.57em]"color={'#F1F1F1'}>New Task</Title>
             <div className="search_input  w-full relative mt-[-10px] "><input placeholder="Название таска..." /></div>
           <div className="inline-flex flex-col gap-[4px] w-full ">
             <Radio setActive={setActive} active={active}  text={'Совместное'}/>
              <Radio setActive={setActive} active={active}  text={'Одиночное'}/>
              </div>
             {active=='Совместное' && <InfoBlock title="Друзья" ><ul className="flex flex-col gap-[8px]"><UserInfo setFriendSelect={setSelectedFriend} friendSelect={selectedFriend} isSelectFriend={true} id="1"  className="w-full" color="#2D2D4F" img="https://randomuser.me/api/portraits/lego/2.jpg" name="'de"  total={3} index={3}/><UserInfo setFriendSelect={setSelectedFriend} isSelectFriend={true} friendSelect={selectedFriend} id="2"  className="w-full" color="#2D2D4F" img="https://randomuser.me/api/portraits/lego/2.jpg" name="'de"  total={3} index={3}/><UserInfo setFriendSelect={setSelectedFriend} isSelectFriend={true} id="3" friendSelect={selectedFriend}  className="w-full" color="#2D2D4F" img="https://randomuser.me/api/portraits/lego/2.jpg" name="'de"  total={3} index={3}/><UserInfo setFriendSelect={setSelectedFriend} isSelectFriend={true} id="4" friendSelect={selectedFriend}  className="w-full" color="#2D2D4F" img="https://randomuser.me/api/portraits/lego/2.jpg" name="'de"  total={3} index={3}/><UserInfo setFriendSelect={setSelectedFriend} isSelectFriend={true} id="5" friendSelect={selectedFriend}  className="w-full" color="#2D2D4F" img="https://randomuser.me/api/portraits/lego/2.jpg" name="'de"  total={3} index={3}/></ul></InfoBlock>} 
        <Calendar/>
        <Button loading={false} type='Purple' className="w-full py-[8px] text-[27px]">Создать задачу</Button>
        </div>
    )
}