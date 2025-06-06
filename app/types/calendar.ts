import { Dispatch, RefObject, SetStateAction } from "react";

export type TDay = {
active:string,
day:string;
setActive:React.Dispatch<React.SetStateAction<string>>
}
export type TTimeInput = {
    refHours: RefObject<HTMLInputElement | null>;
    refMinutes: RefObject<HTMLInputElement | null>;
}

export interface ICalendar {
  refHour: RefObject<HTMLInputElement|null>;
  refMin: RefObject<HTMLInputElement|null>;
  day: string ;
  currentYear:number;
  currentMonth:number;
  month: number;
  year:number;
  setDay: Dispatch<SetStateAction<string >>;
  setMonth: Dispatch<SetStateAction<number>>;
  setYear: Dispatch<SetStateAction<number>>;
}