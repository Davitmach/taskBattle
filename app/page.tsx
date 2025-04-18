'use client'

import { Menu } from "./components/Shared/menu";
import { useCustomRouter } from "./hooks/Router";
import { useMenuState } from "./store";
export default function Home() {
  const { LoadedState} = useMenuState()
  const Router = useCustomRouter();
  return (
   <>
   <div onClick={()=>Router('/user/:id', { id: 1234 })}>

   
   </div>
   <Menu/>
   </>
  );
}
