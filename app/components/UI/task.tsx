'use client'

import { ITaskProps, ITaskWithFuncProps } from '@/app/types/task'
import { useEffect, useRef, useState } from 'react'
import { Clock } from './svg'
import { useRouter } from 'next/navigation'

export const Task = (props:ITaskProps)=> {
  const [substring,setSubstring] = useState<number>(25);
  useEffect(() => {
    const updateSubstring = () => {
      if (window.innerWidth < 403) {
        setSubstring(15);
      } 
      else if (window.innerWidth < 315) {
        setSubstring(10);
      }
  
      else {
        setSubstring(25);
      }
    };
  
    updateSubstring(); 
    window.addEventListener('resize', updateSubstring); 
  
    return () => {
      window.removeEventListener('resize', updateSubstring);
    };
  }, []);
  const {push} = useRouter();
  const openModal = (task:any) => {
    console.log('qaqem beynit');
    const queryParams = new URLSearchParams({
      modal: 'dynamic',
      title: task.title,
      type: task.type,
      date: task.date,
      friends:encodeURIComponent(JSON.stringify(task.friends)),
    }).toString();
  
  push(`?${queryParams}`);
  };
  return(
    <div  onClick={()=> openModal({date:props.date,title:props.title,type:props.type,friends:props.friends})}  className={`bg-[${props.color}] p-[10px] rounded-[8px] cursor-grab h-[69px] flex items-start justify-between`}>
    <div className='flex flex-col h-full justify-between'>
      <div className='text-[#1E1E1E] text-[1.14em] font-[400] text-nowrap'>{props.title.length >substring ?props.title.substring(0,substring)+`...` : props.title}</div>
      <div className='text-[#000000] text-[1em] font-[400]'>{props.type}</div>
    </div>
   <div className='flex items-center gap-[3px] text-[1em] font-[400] text-[#1E1E1E] text-nowrap'><Clock/>{props.timeout} минут</div>
  </div>

  )
}

export const TaskWithFunc = (props:ITaskWithFuncProps) => {
  const {push} = useRouter();
  const openModal = (task:any) => {
    console.log('qaqem beynit');
    
    const queryParams = new URLSearchParams({
      modal: 'dynamic',
      title: task.title,
      type: task.type,
      date: task.date,
      friends:encodeURIComponent(JSON.stringify(task.friends)),
    }).toString();
  
  push(`?${queryParams}`);
  };
  
  const ref = useRef<HTMLDivElement>(null);
  const [widthPercent, setWidthPercent] = useState<number>(100);
  const [showIcons, setShowIcons] = useState<boolean>(false);
  const startXRef = useRef<number | null>(null);
  const [time,setTime] = useState<number>(0);
 const [substring,setSubstring] = useState<number>(25);
 const [show,setShow] = useState<boolean>(true);
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleStart = (clientX: number) => {
      startXRef.current = clientX
    }

    const handleMove = (clientX: number) => {
      if (startXRef.current === null) return
      const deltaX = clientX - startXRef.current

      if (deltaX < 0) { 
        const newWidth = Math.max(67, 100 + deltaX / 2)
    
        if(newWidth < 80) {
        setShow(false);
        }
        else {
          setShow(true);
        }
        setWidthPercent(newWidth)

       
        if (newWidth == 67) {
          setShowIcons(true)
        }
      } else if (deltaX > 0) { 
     
 
        
        const newWidth = Math.min(100, widthPercent + (deltaX / 5))
        if(newWidth < 80) {
          setShow(false);
          }
          else {
            setShow(true);
          }
        setWidthPercent(newWidth)

     
        if (widthPercent > 80 ) {
          setShowIcons(false)
        }
      }
    }

    const handleEnd = () => {
      startXRef.current = null
     
      
      if (widthPercent < 68) {
      
        setWidthPercent(67) 
      } else {
        setWidthPercent(100) 
      
      }
    }


    const onTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientX)
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX)
    const onTouchEnd = handleEnd

    const onMouseDown = (e: MouseEvent) => handleStart(e.clientX)
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const onMouseUp = handleEnd

    el.addEventListener('touchstart', onTouchStart)
    el.addEventListener('touchmove', onTouchMove)
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchEnd)

    el.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)

      el.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [widthPercent])

useEffect(()=> {
if(props.timeout) {
  setTime(props.timeout);
}
},[props.timeout])

useEffect(() => {
  const updateSubstring = () => {
    if (window.innerWidth < 403) {
      setSubstring(15);
    } 
    else if (window.innerWidth < 315) {
      setSubstring(10);
    }

    else {
      setSubstring(25);
    }
  };

  updateSubstring(); 
  window.addEventListener('resize', updateSubstring); 

  return () => {
    window.removeEventListener('resize', updateSubstring);
  };
}, []);
useEffect(()=> {
if(time>0) {
  const interval = setInterval(() => {
    setTime((prevTime) => prevTime - 1)
  }, 60000)

  return () => clearInterval(interval)
}
},[time])

  return (
    <div  className='flex items-center justify-between gap-[10px]'>
      <div
      onClick={()=> openModal({date:props.date,title:props.title,type:props.type,friends:props.friends})}
        ref={ref}
        style={{
          width: `${widthPercent}%`,
          transition: 'width 0.3s ease',
          userSelect: 'none',
        }}
        className="bg-[#DDDD9C] p-[10px] rounded-[8px] cursor-grab h-[69px] flex items-start justify-between"
      >
        <div className='flex flex-col h-full justify-between'>
          <div className='text-[#1E1E1E] text-[1.14em] font-[400] text-nowrap'>{props.title.length >substring ?props.title.substring(0,substring)+`...` : props.title}</div>
          <div className='text-[#000000] text-[1em] font-[400]'>{props.type}</div>
        </div>
        {show &&<div className='flex items-center gap-[3px] text-[1em] font-[400] text-[#1E1E1E] text-nowrap'><Clock/>{time} минут</div>}
      </div>

 
      {showIcons && (
        <div className='anim_scale flex w-auto  gap-[10px]' style={{ transition: 'opacity 0.3s ease' }}>
          <div className='bg-[#A2E9BA] flex items-center justify-center rounded-[8px] w-[50px] h-[50px] flex-shrink-0 cursor-pointer'>
            <svg width="36" height="27" viewBox="0 0 36 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12.5L13 22.5L33 2.5" stroke="white" strokeWidth="6"/>
            </svg>
          </div>
          <div className='bg-[#BE3A50D9] flex items-center justify-center rounded-[8px] w-[50px] h-[50px] flex-shrink-0 cursor-pointer'>
            <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 2.5L33 32.5M33 2.5L3 32.5" stroke="white" strokeWidth="6"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
