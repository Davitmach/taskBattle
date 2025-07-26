'use client';
import { PageConfig } from "@/app/config/pageConfig";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCustomRouter } from "@/app/hooks/Router";
import { useLoadingState } from "@/app/store";

export const Menu = () => {
  const Router = useCustomRouter();
  const Path = usePathname();
const {LoadedState,setLoad} = useLoadingState();

  const entries = Object.entries(PageConfig) as [keyof typeof PageConfig, (typeof PageConfig)[keyof typeof PageConfig]][];

  const [active, setActive] = useState<keyof typeof PageConfig>(entries[1][0]);

  useEffect(() => {
    const found = entries.find(([, path]) => path === Path);
    if (found) setActive(found[0]);
  }, [Path]);
if(Path.includes('find')) return null
if(Path.includes('user')) return null
if(Path.includes('newtask')) return null
  return (
    <div className={`${LoadedState && 'anim_fadeIn'} menu_container max-w-[400px] w-full mx-auto fixed bottom-0 left-2/4 translate-x-[-50%] bg-[#2D2D4F] rounded-t-[16px] flex justify-between items-center py-[22px] px-[20px]`}>
      {entries.map(([key, path]) => (
        <div
          datatype={path}
          className={`${
            active === key ? 'Active' : 'Disable'
          } font-[400] text-[1.43em] cursor-pointer duration-[200ms] active:scale-[0.9]`}
          key={key}
          onClick={() => {Router(PageConfig[key])
            setLoad(true)
          }} 
        >
          {key}
        </div>
      ))}
    </div>
  );
};
