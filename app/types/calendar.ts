import { RefObject } from "react";

export type TDay = {
active:string,
day:string;
setActive:React.Dispatch<React.SetStateAction<string>>
}
export type TTimeInput = {
    refHours: RefObject<HTMLInputElement | null>;
    refMinutes: RefObject<HTMLInputElement | null>;
}