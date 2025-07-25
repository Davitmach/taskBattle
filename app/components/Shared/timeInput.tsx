// 'use client';
// import { TTimeInput } from "@/app/types/calendar";
// import { useEffect, useState } from "react";

// export const TimeInput = (props: TTimeInput) => {
//   const [hours, setHours] = useState("00");
//   const [minutes, setMinutes] = useState("00");

//   useEffect(() => {
//     if (props.refHours.current) props.refHours.current.value = hours;
//     if (props.refMinutes.current) props.refMinutes.current.value = minutes;
//   }, [hours, minutes]);

//   const handleInput = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     max: number,
//     setFn: (v: string) => void
//   ) => {
//     let val = e.target.value.replace(/\D/g, ""); // Удаляем всё, кроме цифр

//     if (val.length > 2) val = val.slice(0, 2);

//     const num = parseInt(val, 10);
//     if (!isNaN(num)) {
//       if (num > max) val = max.toString();
//     }

//     setFn(val);
//   };

//   return (
//     <div className="mt-[21px] inline-flex rounded-[3px] items-center bg-[#2D2D4F]">
//       <input
//         ref={props.refHours}
//         type="text"
//         inputMode="numeric"
//         value={hours}
//         onChange={(e) => handleInput(e, 23, setHours)}
//         className="w-[40px] text-center outline-none text-[22px] text-white"
//       />
//       <div className="text-white text-[22px]">:</div>
//       <input
//         ref={props.refMinutes}
//         type="text"
//         inputMode="numeric"
//         value={minutes}
//         onChange={(e) => handleInput(e, 59, setMinutes)}
//         className="w-[40px] text-[22px] outline-none text-center text-white"
//       />
//     </div>
//   );
// };
'use client'
import React from "react";
import { TTimeInput } from "@/app/types/calendar";
import { TimeScrollPicker } from "./TimeScrollPicker";
import '../../assets/scss/time.scss'
export const TimeInput = (props: TTimeInput) => {
  return (
    <div className="time-input-container">
      <TimeScrollPicker type="hours" refInput={props.refHours} />
      <div className="separator">:</div>
      <TimeScrollPicker type="minutes" refInput={props.refMinutes} />
    </div>
  );
};