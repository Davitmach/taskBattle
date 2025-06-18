'use client'
import { Title } from "../components/UI/title";
import { Back } from "../components/UI/back";
import { useCustomRouter } from "../hooks/Router";
import { UserInfo } from "../components/UI/userInfo";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../service/userService";


export default function Page() {
    const Top = [
        {
          "img": "https://randomuser.me/api/portraits/lego/2.jpg",
          "name": "Мария",
          "tasks": 1
        },
        {
          "img": "https://randomuser.me/api/portraits/lego/9.jpg",
          "name": "Анастасия",
          "tasks": 2
        },
        {
          "img": "https://randomuser.me/api/portraits/lego/9.jpg",
          "name": "Роман",
          "tasks":333
        },
        {
          "img": "https://randomuser.me/api/portraits/lego/3.jpg",
          "name": "Роман",
          "tasks": 5555
        },
        {
          "img": "https://randomuser.me/api/portraits/lego/6.jpg",
          "name": "Светлана",
          "tasks": 5
        },
        {
            "img": "https://randomuser.me/api/portraits/lego/7.jpg",
            "name": "Анастасия",
            "tasks": 55
            },
            {
            "img": "https://randomuser.me/api/portraits/lego/8.jpg",
            "name": "Роман",
            "tasks": 55
            },
            {
            "img": "https://randomuser.me/api/portraits/lego/4.jpg",
            "name": "Роман",
            "tasks": 55
            },
            {
            "img": "https://randomuser.me/api/portraits/lego/5.jpg",
            "name": "Светлана",
            "tasks": 55
        },
        {
            "img": "https://randomuser.me/api/portraits/lego/2.jpg",
            "name": "Анастасия",
            "tasks": 55
        },
        {
            "img": "https://randomuser.me/api/portraits/lego/9.jpg",
            "name": "Роман",
            "tasks": 55
        }
      ]
      
    const router = useCustomRouter();
  
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['top'],
    queryFn: () => userService.Top(),
    retry: false,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    staleTime: 3000,
  });
  useEffect(()=> {
console.log(data);

  },[data])
    return(
    <>
        <div className="container pt-[7px] scrollbar-hide relative anim_fadeIn">
            <div>
            <Back onclick={()=> router('/')} className="absolute left-0 top-[15px] cursor-pointer" />
            <Title className="font-[400] text-[4.57em]"color={'#F1F1F1'}>TOP</Title>
            </div>
         <div className="w-full h-full relative">
         <ul className="flex flex-col gap-[5px] pb-[160px]">
            {Top.map((item,index)=> (
                <UserInfo color="#1E1E2F" img={item.img} index={index} key={index} name={item.name} total={item.tasks} state={index+1}/>
            ))}
         </ul>
        
         </div>
        </div>
         <div className=" max-w-[400px]  fixed bottom-[80px] left-[50%] translate-x-[-50%] w-[92%]"><UserInfo color="#1E1E2F" className="  border border-white" img={'https://randomuser.me/api/portraits/lego/2.jpg'} index={1} name="David" total={455} state={4}/></div>
         </>
    )
}