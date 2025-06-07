'use client'
import { useLoadingState } from "@/app/store"
export const Loading = () => {
    const { LoadedState } = useLoadingState();
    // if(LoadedState) return null
    if(LoadedState == false) return(
        <div className="w-full h-[100vh] Gradient fixed top-0 left-0 z-[999999] flex items-center justify-center">
            <h1 className="max-w-[257px] w-full text-[4.57em] text-[#F1F1F1] text-center anim_pulseScale">Task 
            Battle</h1>
        </div>
    )
}
