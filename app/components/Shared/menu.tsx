'use client';
import { PageConfig } from "@/app/config/pageConfig";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export const Menu = () => {
    const Path = usePathname();
    const keys = Object.keys(PageConfig) as Array<keyof typeof PageConfig>;
    const [active, setActive] = useState<keyof typeof PageConfig>(keys[1]);

    useEffect(() => {
        const found = keys.find((key) => PageConfig[key] === Path);
        if (found) setActive(found);
    }, [Path]);

    return(
        <div className="menu_container max-w-[500px] w-full mx-auto fixed bottom-0 left-2/4 translate-x-[-50%] bg-[#2D2D4F] rounded-t-[16px] flex justify-between items-center py-[22px] px-[20px]">
{Object.keys(PageConfig).map((key)=> (
    <div  className={`${active == key ? 'Active' :'Disable'}   font-[400] text-[1.43em] cursor-pointer `}   key={key}>{key}</div>
))}

        </div>
    )

}