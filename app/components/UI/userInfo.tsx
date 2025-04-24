import { IUserInfoProps } from "@/app/types/userInfo"

export const UserInfo = (props:IUserInfoProps) => {
    return(
<li key={props.index} className={`flex items-center gap-2 bg-[#1E1E2F] rounded-[13px] p-[9px] justify-between ${props.className && props.className}`}>
  <div className="flex items-center gap-2 bg-[#1E1E2F] rounded-[13px]">
<div><img src={props.img} className='rounded-[50px]' width={43} height={43} /></div>
<div className='flex flex-col'>
  <span className='text-[1em] text-[#F1F1F1] font-[400]'>{props.name}</span>
  <span className='text-[1em] text-[#F1F1F1] font-[400]'>Total Tasks:{props.total}</span>
</div>
</div>
<div className="flex flex-col justify-center items-center gap-[4px]">
  {props.state ? <><div>{props.state == 1 ?<svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.09091 11.1818C8.90254 11.1818 11.1818 8.90254 11.1818 6.09091C11.1818 3.27928 8.90254 1 6.09091 1C3.27928 1 1 3.27928 1 6.09091C1 8.90254 3.27928 11.1818 6.09091 11.1818Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3.33459 10.3746L2.45459 17L6.09095 14.8182L9.72732 17L8.84732 10.3673" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
 :''}</div><div className={`text-[#D9D9D9] font-[400] text-[1.42em] ${props.state !== 1 && 'translate-y-[10px]'}`}>#{props.state}</div></>:''}
</div>
</li>
    )
}

