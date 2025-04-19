'use client'

import { useEffect, useRef, useState } from 'react'

export const Task = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [widthPercent, setWidthPercent] = useState(100)
  const [showIcons, setShowIcons] = useState(false) 
  const startXRef = useRef<number | null>(null)

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
        const newWidth = Math.max(68, 100 + deltaX / 2)
        setWidthPercent(newWidth)

       
        if (newWidth == 68) {
          setShowIcons(true)
        }
      } else if (deltaX > 0) { 
     
 
        
        const newWidth = Math.min(100, widthPercent + (deltaX / 5))
 
        
        setWidthPercent(newWidth)

     
        if (widthPercent > 80 ) {
          setShowIcons(false)
        }
      }
    }

    const handleEnd = () => {
      startXRef.current = null
      if (widthPercent < 70) {
        setWidthPercent(68) 
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

  return (
    <div className='flex items-center justify-between gap-[10px]'>
      <div
        ref={ref}
        style={{
          width: `${widthPercent}%`,
          transition: 'width 0.3s ease',
          userSelect: 'none',
        }}
        className="bg-[#DDDD9C] touch-none p-4 rounded-md cursor-grab"
      >
        qaqaqaq
      </div>

 
      {showIcons && (
        <div className='anim_scale flex w-auto overflow-hidden gap-[10px]' style={{ transition: 'opacity 0.3s ease' }}>
          <div className='bg-[#A2E9BA] flex items-center justify-center rounded-[8px] w-[50px] h-[50px] flex-shrink-0'>
            <svg width="36" height="27" viewBox="0 0 36 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12.5L13 22.5L33 2.5" stroke="white" strokeWidth="6"/>
            </svg>
          </div>
          <div className='bg-[#BE3A50D9] flex items-center justify-center rounded-[8px] w-[50px] h-[50px] flex-shrink-0'>
            <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 2.5L33 32.5M33 2.5L3 32.5" stroke="white" strokeWidth="6"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
