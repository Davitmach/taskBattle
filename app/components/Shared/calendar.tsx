'use client'
import { useEffect, useRef, useState } from "react"
import { Day } from "../UI/day"
import { TimeInput } from "./timeInput"
import { AccordingBtn, AccordingBtnWithoutAnim } from "../UI/accordingBtn"
import { soundService } from "@/app/service/soundService"
import { ICalendar } from "@/app/types/calendar"
const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
export const Calendar = (props:ICalendar)=> {
  //     const now = new Date();
  // const currentMonth = now.getMonth();
  // const currentYear = now.getFullYear();

  // const [month, setMonth] = useState(currentMonth);
  // const [year, setYear] = useState(currentYear);
  //   const [activeDay,setActiveDay] = useState<string>('')
  //   const refHour = useRef<HTMLInputElement>(null);
  //   const refMin = useRef<HTMLInputElement>(null);
    const nextMonth = () => {
    if (props.month === 11) {
      props.setMonth(0);
      props.setYear(y => y + 1);
      props.setDay('')
    } else {
      props.setMonth(m => m + 1);
      props.setDay('')
    }
  };

  
  const prevMonth = () => {
    if (props.year === props.currentYear && props.month === props.currentMonth) return; 
    if (props.month === 0) {
      props.setMonth(11);
      props.setYear(y => y - 1);
      props.setDay('')
    } else {
      props.setMonth(m => m - 1);
      props.setDay('')
    }
  };
  
  const daysInMonth = new Date(props.year, props.month + 1, 0).getDate();
  const firstDay = new Date(props.year, props.month, 1).getDay();
  const offset = (firstDay === 0) ? 6 : firstDay - 1;
  const totalCells = offset + daysInMonth;

const calendarCells = Array.from({ length: daysInMonth }, (_, i) => i + 1);



    return(
        <div className="flex flex-col items-center fadeIn bg-[#1E1E2F] rounded-[16px] py-[12px] px-[18px] w-full">
       <div className="Date flex w-full justify-between items-start">
        <div><AccordingBtnWithoutAnim onClick={prevMonth} className="rotate-[-90deg]"  color="#D9D9D9" innerColor="#1E1E2F"/></div>
        <div className="flex items-center flex-col gap-[5px]">
           <div className="text-[#FFFFFF] text-[20px] no-select">{props.year}</div>
           <div  className=" w-[100px] text-center text-[#FFFFFF] text-[20px] no-select">{MONTHS[props.month]}</div>
        </div>
        <div><AccordingBtnWithoutAnim onClick={nextMonth} className="rotate-[90deg]"  color="#D9D9D9" innerColor="#1E1E2F"/></div>
       </div>
      <div className="w-full Day grid grid-cols-7 gap-[8px] mt-[16px]">
  {calendarCells.map((day) => (
    <Day
      key={day}
      day={day.toString()}
      active={props.day}
      setActive={(d) => props.setDay(d.toString())}
    />
  ))}
</div>

       <div className="Time mt-[10px]">
        <TimeInput refHours={props.refHour} refMinutes={props.refMin}/>
       </div>
        </div>
    )
}
