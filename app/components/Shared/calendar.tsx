'use client'
import { useEffect, useRef, useState } from "react"
import { Day } from "../UI/day"
import { TimeInput } from "./timeInput"
import { AccordingBtn, AccordingBtnWithoutAnim } from "../UI/accordingBtn"
import { soundService } from "@/app/service/soundService"
const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
export const Calendar = ()=> {
      const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const currentDay = now.getDate();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
    const [activeDay,setActiveDay] = useState<string>('')
    const refHour = useRef<HTMLInputElement>(null);
    const refMin = useRef<HTMLInputElement>(null);
    const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
      setActiveDay('')
    } else {
      setMonth(m => m + 1);
      setActiveDay('')
    }
  };

  const prevMonth = () => {
    if (year === currentYear && month === currentMonth) return; 
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
      setActiveDay('')
    } else {
      setMonth(m => m - 1);
      setActiveDay('')
    }
  };
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const offset = (firstDay === 0) ? 6 : firstDay - 1;
  const totalCells = offset + daysInMonth;

const calendarCells = Array.from({ length: daysInMonth }, (_, i) => i + 1);
useEffect(()=> {
console.log(month);

},[month])

    return(
        <div className="flex flex-col items-center fadeIn bg-[#1E1E2F] rounded-[16px] py-[12px] px-[18px] w-full">
       <div className="Date flex w-full justify-between items-start">
        <div><AccordingBtnWithoutAnim onClick={prevMonth} className="rotate-[-90deg]"  color="#D9D9D9" innerColor="#1E1E2F"/></div>
        <div className="flex items-center flex-col gap-[5px]">
           <div className="text-[#FFFFFF] text-[20px]">{year}</div>
           <div  className=" w-[100px] text-center text-[#FFFFFF] text-[20px]">{MONTHS[month]}</div>
        </div>
        <div><AccordingBtnWithoutAnim onClick={nextMonth} className="rotate-[90deg]"  color="#D9D9D9" innerColor="#1E1E2F"/></div>
       </div>
      <div className="w-full Day grid grid-cols-7 gap-[8px] mt-[16px]">
  {calendarCells.map((day) => (
    <Day
      key={day}
      day={day.toString()}
      active={activeDay}
      setActive={(d) => setActiveDay(d.toString())}
    />
  ))}
</div>

       <div className="Time">
        <TimeInput refHours={refHour} refMinutes={refMin}/>
       </div>
        </div>
    )
}
