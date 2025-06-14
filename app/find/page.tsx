'use client'
import { useEffect, useRef, useState } from "react";
import { Back } from "../components/UI/back";
import { UserInfo } from "../components/UI/userInfo";
import { useCustomRouter } from "../hooks/Router";
import { userService } from "../service/userService";

export default function Page() {
    const router = useCustomRouter();
    const refInput = useRef<HTMLInputElement>(null);
    const [data,setData] = useState([]);
    const GoBack = ()=> {
router('/');
    }
    const HandleSearch = ()=> {
if(refInput.current) {
    userService.Find(refInput.current.value).then((e)=> {
        if(e) {
            setData(e);
        }
    })
}
    }
    useEffect(()=> {
console.log(data,'ddeadeadae');

    },[data])
    return(
        <div className="w-full h-[100vh] anim_fadeIn">
            <Back onclick={GoBack} className="translate-x-[15px] mb-[40px] translate-y-[15px] cursor-pointer"/>
            <div className="search_input  w-full relative"><input ref={refInput} placeholder="Напиши имя человека..." /><svg onClick={()=> {
                HandleSearch();
            }} className="absolute top-[50%] translate-y-[-50%] right-[15px] cursor-pointer" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 1L10 12" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M21 1L14 21L10 12L1 8L21 1Z" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
<div className="mt-[8px]">
    <ul>
        <UserInfo color="#1E1E2F" id={'324'} img="https://randomuser.me/api/portraits/lego/9.jpg" index={1} name="Dav" total={3543} friend={true} />
    </ul>
</div>
        </div>
    )
}