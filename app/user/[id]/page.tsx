'use client';


import { AnyUserInfo } from "@/app/components/Shared/userInfo";
import { Back } from "@/app/components/UI/back";
import { Button } from "@/app/components/UI/button";
import { InfoBlock } from "@/app/components/UI/infoBlock";
import { UserInfo } from "@/app/components/UI/userInfo";
import { useCustomRouter } from "@/app/hooks/Router";
import { useLoadingState } from "@/app/store";
import { useParams } from "next/navigation";

export default function Page() {
    const router = useCustomRouter();
    const params = useParams();
    const {LoadedState} = useLoadingState();
    const back = ()=> {
router('/');
    }
    return(
        <div className="container !gap-[10px] pt-[7px] scrollbar-hide relative"><Back onclick={back} className="absolute left-[15px] top-[15px] cursor-pointer"/>
        
        <Button type='Purple' className={`${LoadedState && 'anim_fadeIn'} !bg-[#1E1E2F] py-[16px] w-full mt-[70px] flex gap-[7px] text-[1.43em]`} disabled={false} loading={false} >Пожаловаться<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.86 1H15.14L21 6.86V15.14L15.14 21H6.86L1 15.14V6.86L6.86 1Z" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11 7V11" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11 15H11.01" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</Button>
<AnyUserInfo img="https://randomuser.me/api/portraits/lego/2.jpg" date="2014.04.20" name="David" tasks={{inprocess:3,cancel:54,success:4}} friendship={false}/>
<InfoBlock title="Друзья"><ul><UserInfo className="w-full" color="#2D2D4F" img="https://randomuser.me/api/portraits/lego/2.jpg" name="'de"  total={3} index={3}/></ul></InfoBlock>
<InfoBlock title="Награды"><ul><UserInfo className="w-full" color="#2D2D4F" img="https://randomuser.me/api/portraits/lego/2.jpg" name="'de"  total={3} index={3}/></ul></InfoBlock>
        </div>
    )
}