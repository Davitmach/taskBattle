'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { UserInfo } from '../UI/userInfo';
import { taskService } from '@/app/service/taskService';
import { useNotification } from '@/app/provider/notification';
import { useCustomRouter } from '@/app/hooks/Router';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../UI/button';

function ModalContent() {
  const searchParams = useSearchParams();
  const rout = useRouter();
  const router = useCustomRouter();
  const Query = useQueryClient();
const { showNotification} = useNotification();
  const modal = searchParams.get('modal');
  const title = searchParams.get('title');
  const type = searchParams.get('type');
  const date = searchParams.get('date');
  const friendsRaw = searchParams.get('friends');
const status = searchParams.get('status');
const taskId = searchParams.get('taskId');
const myTask = searchParams.get('myTask');
const reqReady = searchParams.get('reqReady');
const totalReady = searchParams.get('totalReady');
  const [isOpen, setIsOpen] = useState(false);
  const [mytask,setMyTask] = useState(true);
  const [req,setReq]=useState(0);
  const [tot,setTot] = useState(0);
  const [friends, setFriends] = useState<{id:string, name: string; icon: string; _count:{
    tasks:number,
     taskParticipations:number
  } }[]>([]);

useEffect(() => {
  setIsOpen(!!modal);
  console.log('Modal params:', { myTask, reqReady, totalReady, friendsRaw });

  if (friendsRaw) {
    try {
      const parsed = JSON.parse(decodeURIComponent(friendsRaw));
      if (Array.isArray(parsed)) {
        setFriends(parsed);
      }
    } catch (err) {
      console.error('Ошибка парсинга friends:', err);
    }
  }

  if (myTask !== null) {
    setMyTask(myTask === 'true');
  }

  const req = Number(reqReady);
  const tot = Number(totalReady);

  if (!isNaN(req)) setReq(req);
  if (!isNaN(tot)) setTot(tot);
}, [modal, friendsRaw, myTask, reqReady, totalReady]);

  const closeModal = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('modal');
    newParams.delete('title');
    newParams.delete('friends');
    newParams.delete('type');
    newParams.delete('date');
    newParams.delete('status');
    newParams.delete('taskId');
    newParams.delete('myTask');
    newParams.delete('reqReady');
    newParams.delete('totalReady')
    rout.back()
  };

  // if (!isOpen) return null;

  return (
    <div 
      style={{
        pointerEvents: isOpen ? 'auto' : 'none',
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
      }}
    className="opacity-0 invisible duration-[400ms] fixed inset-0 z-50 flex items-center justify-center bg-[#1E1E2FBF]">
      <div className="modal_page bg-[#2D2D4F] py-[19px] px-[15px] rounded-[16px] w-full mx-[10px] max-w-[400px] relative flex flex-col justify-between">
        <svg className='absolute right-[15px] top-[15px] cursor-pointer' onClick={closeModal} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L17 17M17 2L2 17" stroke="white" strokeWidth="3"/>
        </svg>
        <div>
          <h2 className='text-[#F1F1F1] text-[2em] font-[400] text-center'>{title}</h2>
          <p className='text-[#F1F1F1] text-[1.43em] font-[400] text-center'>{type}</p>

          {friends.length > 0 && (
            <div className="mt-4 mb-[10px]">
              <ul className="mt-1 space-y-[8px] max-h-[140px] overflow-y-auto scrollbar-hide">
                {friends.map(async(friend, index) => {
                  
                const total = (friend._count?.tasks || 0) + (friend._count?.taskParticipations || 0);

                 
                  
                  return(
                  <UserInfo color='#1E1E2F' id={friend.id}  key={index} index={index} img={friend.icon} name={friend.name} total={total}/>
                  )
                })}
              </ul>
            </div>
          )}
          <span className='text-white text-[1em] font-[400] w-full flex justify-center'>Дата окончания: {date?.split('T')[0]}</span>
        </div>

{totalReady&& reqReady&& <div className='w-full flex items-center justify-center text-[#FFFFFF] font-[400] text-[20px]'>{tot}/{req}</div> }
{mytask==true && status =='process' && <div className='flex w-full justify-center gap-[13px] mt-[20px]'>
          <svg className='cursor-pointer' onClick={()=> taskService.acceptTask(taskId as string,router,showNotification,Query)} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="8" fill="#A2E9BA"/>
            <path d="M10 25L20 35L40 15" stroke="white" strokeWidth="6"/>
          </svg>
          <svg className='cursor-pointer' onClick={()=> taskService.cancelTask(taskId as string,router,showNotification,Query)} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="8" fill="#BE3A50" fillOpacity="0.85"/>
            <path d="M10 10L40 40M40 10L10 40" stroke="white" strokeWidth="6"/>
          </svg>
        </div>}
        {/* {mytask==false &&
        // <Button>Ready</Button>
        }  */}
       
      </div>
    </div>
  );
}

export default function ModalManager() {
  return (
    <Suspense fallback={null}>
      <ModalContent />
    </Suspense>
  );
}
