'use client';

import { useNotification } from "@/app/provider/notification";

export const Notification = () => {
    const {notifications} = useNotification();

   if(notifications.message.length>0) {
        return <div className="z-[99999999999]  text-[#F1F1F1] font-[400] text-[1em] flex justify-between px-[9px] py-[12px] anim_turnDown w-[95%] max-w-[400px] fixed left-[50%] translate-x-[-50%] translate-y-[-50%] top-[40px] bg-red-500 rounded-[13px] border  Gradient">{notifications.message}<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#F1F1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 7V11" stroke="#F1F1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 15H11.01" stroke="#F1F1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </div>
    } 
    else {
        return null
    }
}