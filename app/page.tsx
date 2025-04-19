'use client'
import { useCallback } from "react";
import { Button } from "./components/UI/button";
import { TaskHomePageInfoBlock } from "./components/UI/infoBlock";

export default function Home() {
 
const HandleClick =  ()=> {
console.log(1);

}
  return (
   <>
<TaskHomePageInfoBlock color="#FACC15" color2="#DDDD9C" title="В процессе" type='inprocess'/>
   </>
  );
}
