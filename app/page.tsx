
import { useCallback } from "react";
import { Button } from "./components/UI/button";
import { TaskHomePageInfoBlock } from "./components/UI/infoBlock";

export default function Home() {
 

  return (
   <div className="container">
    <Button type='Purple' className="w-full py-[6px] text-[27px]" disabled={false} loading={false} >Добавить задачу</Button>
   <TaskHomePageInfoBlock   type='complete'/>
   <TaskHomePageInfoBlock   type='inprocess'/>
<TaskHomePageInfoBlock   type='cancel'/>
</div>
  );
}
