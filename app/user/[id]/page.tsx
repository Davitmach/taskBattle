'use client';


import { AnyUserInfo } from "@/app/components/Shared/userInfo";
import { Back } from "@/app/components/UI/back";
import { Button } from "@/app/components/UI/button";
import { InfoBlock, TaskHomePageInfoBlock } from "@/app/components/UI/infoBlock";
import { Reward } from "@/app/components/UI/reward";
import { UserInfo } from "@/app/components/UI/userInfo";
import { useCustomRouter } from "@/app/hooks/Router";
import { useLoadingState } from "@/app/store";
import { desc } from "framer-motion/client";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const router = useCustomRouter();
    const params = useParams();
    const {LoadedState} = useLoadingState();
    const [open,setOpen] = useState(false);
    const [info,setInfo] = useState({
        title:'',
        description:'',
        info:''
    })
    const back = ()=> {
router('/');
    }
    const openM= (title:string,description:string,info:string) => {
        setOpen(true);
        setInfo({
            title:title,
            description:description,
            info:info
        })
    }
    const closeM = ()=> {
        setOpen(false);
        setInfo({
            title:'',
            description:'',
            info:''
        })
    }
    return(
        <>
        <div className="container !gap-[10px] pt-[7px] scrollbar-hide relative"><Back onclick={back} className="absolute left-[15px] top-[15px] cursor-pointer"/>
        
        <Button type='Purple' className={`${LoadedState && 'anim_fadeIn'} !bg-[#1E1E2F] py-[16px] w-full mt-[70px] flex gap-[7px] text-[1.43em]`} disabled={false} loading={false} >Пожаловаться<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.86 1H15.14L21 6.86V15.14L15.14 21H6.86L1 15.14V6.86L6.86 1Z" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11 7V11" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11 15H11.01" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</Button>
<AnyUserInfo img="https://randomuser.me/api/portraits/lego/2.jpg" date="2014.04.20" name="David" tasks={{inprocess:3,cancel:54,success:4}} friendship={false}/>
<InfoBlock title="Друзья"><ul><UserInfo className="w-full" color="#2D2D4F" img="https://randomuser.me/api/portraits/lego/2.jpg" name="'de"  total={3} index={3}/></ul></InfoBlock>
<InfoBlock title="Награды"><Reward  onClick={() => openM("Какой ты быстрый!!", "Награда за выполнение задния за 1 минуту", "Награда есть у 10% пользователей")}  info="Награда есть у 10% пользователей" title="Какой ты быстрый!!" description="Награда за выполнение задния за 1 минуту" /></InfoBlock>
   <TaskHomePageInfoBlock type="complete" />
   <TaskHomePageInfoBlock type="inprocess" />
   <TaskHomePageInfoBlock type="cancel" />
        </div>

        {open &&<div className="bg-[#1E1E2FBF] w-full h-[100vh] z-[999999] fixed left-0 top-0"> <div className="min-h-[342px] anim_fadeIn bg-[#2D2D4F] flex flex-col justify-start relative items-center gap-[15px] p-[15px] rounded-[16px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[400px] w-[91%] ">
            <svg onClick={closeM} className="absolute right-[15px] top-[15px] cursor-pointer" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2L17 17M17 2L2 17" stroke="white" strokeWidth="3"/>
</svg>

            <div><svg width="42" height="37" viewBox="0 0 42 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M39.428 4.57137H31.9996V1.71426C31.9996 0.764275 31.2353 0 30.2853 0H10.857C9.90701 0 9.14273 0.764275 9.14273 1.71426V4.57137H1.71426C0.764275 4.57137 0 5.33564 0 6.28563V10.2856C0 12.8355 1.60712 15.4569 4.42137 17.4783C6.67134 19.0997 9.40702 20.1283 12.2784 20.4569C14.5212 24.1782 17.1426 25.7139 17.1426 25.7139V30.8567H13.7141C11.1927 30.8567 9.14273 32.3353 9.14273 34.8567V35.7138C9.14273 36.1852 9.52844 36.5709 9.99987 36.5709H31.1424C31.6139 36.5709 31.9996 36.1852 31.9996 35.7138V34.8567C31.9996 32.3353 29.9496 30.8567 27.4282 30.8567H23.9997V25.7139C23.9997 25.7139 26.6211 24.1782 28.8639 20.4569C31.7424 20.1283 34.4781 19.0997 36.7209 17.4783C39.528 15.4569 41.1423 12.8355 41.1423 10.2856V6.28563C41.1423 5.33564 40.378 4.57137 39.428 4.57137ZM7.09276 13.7712C5.34993 12.5141 4.57137 11.1141 4.57137 10.2856V9.14273H9.15702C9.22845 11.4713 9.5713 13.5141 10.0713 15.2998C8.99274 14.9284 7.98561 14.4141 7.09276 13.7712ZM36.5709 10.2856C36.5709 11.4356 35.3067 12.8641 34.0495 13.7712C33.1567 14.4141 32.1424 14.9284 31.0639 15.2998C31.5639 13.5141 31.9067 11.4713 31.9781 9.14273H36.5709V10.2856Z" fill="#FACC15"/>
</svg>
</div>
            <div className="text-white font-[400] text-[1.4em]">{info.title}</div>
            <div className="text-white font-[400] text-[1.4em]">{info.description}</div>
            <div className="text-[#FACC15] font-[400] text-[1.4em] w-full flex justify-start "><p className="max-w-[198px] w-full">{info.info}</p></div>
            </div></div>}
        </>
    )
}