'use client'
import { useState } from "react";
import { MyUserInfo } from "../components/Shared/userInfo";
import { InfoBlock, TaskHomePageInfoBlock } from "../components/UI/infoBlock";
import { Reward } from "../components/UI/reward";
import { UserInfo } from "../components/UI/userInfo";
type Task = {
    title: string;
    type: string;
    timeout: number;
    date: string;
    friends?: { img: string; name: string; total: number }[];
  };
const data:Task[] = [
    { title: "Написать вступление к проекту", type: "Одиночное", timeout: 10, date: "23:03:2024 24:34" },
    { title: "Созвон с тимлидом", type: "Совместное", timeout: 25, friends: [{ img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIH3cVN9nVOwezMJZgjRo0YhASylFMo1nJpw&s", name: "Аня", total: 3 },{ img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIH3cVN9nVOwezMJZgjRo0YhASylFMo1nJpw&s", name: "Аня", total: 3 },{ img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIH3cVN9nVOwezMJZgjRo0YhASylFMo1nJpw&s", name: "Аня", total: 3 },{ img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIH3cVN9nVOwezMJZgjRo0YhASylFMo1nJpw&s", name: "Аня", total: 3 }], date: "23:03:2024 24:34" },
    { title: "Дизайн главной страницы", type: "Одиночное", timeout: 40, date: "23:03:2024 24:34" },
    { title: "Обсуждение архитектуры", type: "Совместное", timeout: 30, friends: [{ img: "/avatars/user2.png", name: "Богдан", total: 4 }], date: "23:03:2024 24:34" },
    { title: "Тестирование логина", type: "Одиночное", timeout: 15, date: "23:03:2024 24:34" },
    { title: "Вёрстка формы регистрации", type: "Одиночное", timeout: 35, date: "23:03:2024 24:34" },
    { title: "Созвон по задачам спринта", type: "Совместное", timeout: 20, friends: [{ img: "/avatars/user3.png", name: "Вика", total: 2 }], date: "23:03:2024 24:34" },
    { title: "Обновить README", type: "Одиночное", timeout: 10, date: "23:03:2024 24:34" },
    { title: "UI ревью компонентов", type: "Совместное", timeout: 45, friends: [{ img: "/avatars/user4.png", name: "Сергей", total: 6 }], date: "23:03:2024 24:34" },
    { title: "Фикс багов на проде", type: "Одиночное", timeout: 50, date: "23:03:2024 24:34" },
    { title: "Обсудить идеи по улучшению UX", type: "Совместное", timeout: 30, friends: [{ img: "/avatars/user5.png", name: "Катя", total: 5 }], date: "23:03:2024 24:34" },
    { title: "Переезд на новую библиотеку", type: "Одиночное", timeout: 60, date: "23:03:2024 24:34" },
    { title: "Созвон с дизайнером", type: "Совместное", timeout: 25, friends: [{ img: "/avatars/user6.png", name: "Артур", total: 3 }], date: "23:03:2024 24:34" },
    { title: "Рефакторинг модулей", type: "Одиночное", timeout: 45, date: "23:03:2024 24:34" },
    { title: "Ревью pull request'ов", type: "Одиночное", timeout: 20, date: "23:03:2024 24:34" },
    { title: "Составить план на неделю", type: "Одиночное", timeout: 15, date: "23:03:2024 24:34" },
    { title: "Демо для заказчика", type: "Совместное", timeout: 30, friends: [{ img: "/avatars/user7.png", name: "Денис", total: 4 }], date: "23:03:2024 24:34" },
    { title: "Оптимизация запросов", type: "Одиночное", timeout: 35, date: "23:03:2024 24:34" },
    { title: "Созвон по багрепортам", type: "Совместное", timeout: 40, friends: [{ img: "/avatars/user8.png", name: "Настя", total: 2 }], date: "23:03:2024 24:34" },
    { title: "Добавить документацию к API", type: "Одиночное", timeout: 25, date: "23:03:2024 24:34" },
    { title: "UX-тестирование с пользователями", type: "Совместное", timeout: 50, friends: [{ img: "/avatars/user9.png", name: "Лёша", total: 7 }], date: "23:03:2024 24:34" },
    { title: "Подготовка релизной версии", type: "Одиночное", timeout: 60, date: "23:03:2024 24:34" },
    { title: "Ревью задач других команд", type: "Совместное", timeout: 30, friends: [{ img: "/avatars/user10.png", name: "Валя", total: 3 }], date: "23:03:2024 24:34" },
    { title: "Проверка адаптивности сайта", type: "Одиночное", timeout: 20, date: "23:03:2024 24:34" },
]
export default function Page() {
    const [open,setOpen] = useState(false);
    const [info,setInfo] = useState({
            title:'',
            description:'',
            info:''
        })
   const openM= (title:string,description:string,info:string) => {
        setOpen(true);
        setInfo({
            title:title,
            description:description,
            info:info
        })
    }
    const closeM = ()=> {
        setOpen(false);
        setInfo({
            title:'',
            description:'',
            info:''
        })
    }
    return(
        <>
        <div className="container anim_fadeIn">
<MyUserInfo name="Davit"  img="https://randomuser.me/api/portraits/lego/9.jpg" date="2014.04.03" tasks={{
    cancel:3,
    inprocess:4,
    success:3
}}/>
<InfoBlock title="Друзья"><ul><UserInfo delete={true} id="2312321" className="w-full" color="#2D2D4F" img="https://randomuser.me/api/portraits/lego/2.jpg" name="'de"  total={3} index={3}/></ul></InfoBlock>
<InfoBlock title="Награды"><Reward  onClick={() => openM("Какой ты быстрый!!", "Награда за выполнение задния за 1 минуту", "Награда есть у 10% пользователей")}  info="Награда есть у 10% пользователей" title="Какой ты быстрый!!" description="Награда за выполнение задния за 1 минуту" /></InfoBlock>
   <TaskHomePageInfoBlock data={data} type="complete" />
   <TaskHomePageInfoBlock data={data} type="inprocess" />
   <TaskHomePageInfoBlock data={data} type="cancel" />

        </div>
          {open &&<div className="bg-[#1E1E2FBF] w-full h-[100vh] z-[999999] fixed left-0 top-0"> <div className="min-h-[342px] anim_fadeIn bg-[#2D2D4F] flex flex-col justify-start relative items-center gap-[15px] p-[15px] rounded-[16px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[400px] w-[91%] ">
            <svg onClick={closeM} className="absolute right-[15px] top-[15px] cursor-pointer" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2L17 17M17 2L2 17" stroke="white" strokeWidth="3"/>
</svg>

            <div><svg width="42" height="37" viewBox="0 0 42 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M39.428 4.57137H31.9996V1.71426C31.9996 0.764275 31.2353 0 30.2853 0H10.857C9.90701 0 9.14273 0.764275 9.14273 1.71426V4.57137H1.71426C0.764275 4.57137 0 5.33564 0 6.28563V10.2856C0 12.8355 1.60712 15.4569 4.42137 17.4783C6.67134 19.0997 9.40702 20.1283 12.2784 20.4569C14.5212 24.1782 17.1426 25.7139 17.1426 25.7139V30.8567H13.7141C11.1927 30.8567 9.14273 32.3353 9.14273 34.8567V35.7138C9.14273 36.1852 9.52844 36.5709 9.99987 36.5709H31.1424C31.6139 36.5709 31.9996 36.1852 31.9996 35.7138V34.8567C31.9996 32.3353 29.9496 30.8567 27.4282 30.8567H23.9997V25.7139C23.9997 25.7139 26.6211 24.1782 28.8639 20.4569C31.7424 20.1283 34.4781 19.0997 36.7209 17.4783C39.528 15.4569 41.1423 12.8355 41.1423 10.2856V6.28563C41.1423 5.33564 40.378 4.57137 39.428 4.57137ZM7.09276 13.7712C5.34993 12.5141 4.57137 11.1141 4.57137 10.2856V9.14273H9.15702C9.22845 11.4713 9.5713 13.5141 10.0713 15.2998C8.99274 14.9284 7.98561 14.4141 7.09276 13.7712ZM36.5709 10.2856C36.5709 11.4356 35.3067 12.8641 34.0495 13.7712C33.1567 14.4141 32.1424 14.9284 31.0639 15.2998C31.5639 13.5141 31.9067 11.4713 31.9781 9.14273H36.5709V10.2856Z" fill="#FACC15"/>
</svg>
</div>
            <div className="text-white font-[400] text-[1.4em]">{info.title}</div>
            <div className="text-white font-[400] text-[1.4em]">{info.description}</div>
            <div className="text-[#FACC15] font-[400] text-[1.4em] w-full flex justify-start "><p className="max-w-[198px] w-full">{info.info}</p></div>
            </div></div>}

          {open &&<div className="bg-[#1E1E2FBF] w-full h-[100vh] z-[999999] fixed left-0 top-0"> <div className="min-h-[342px] anim_fadeIn bg-[#2D2D4F] flex flex-col justify-start relative items-center gap-[15px] p-[15px] rounded-[16px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[400px] w-[91%] ">
            <svg onClick={closeM} className="absolute right-[15px] top-[15px] cursor-pointer" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2L17 17M17 2L2 17" stroke="white" strokeWidth="3"/>
</svg>

            <div><svg width="42" height="37" viewBox="0 0 42 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M39.428 4.57137H31.9996V1.71426C31.9996 0.764275 31.2353 0 30.2853 0H10.857C9.90701 0 9.14273 0.764275 9.14273 1.71426V4.57137H1.71426C0.764275 4.57137 0 5.33564 0 6.28563V10.2856C0 12.8355 1.60712 15.4569 4.42137 17.4783C6.67134 19.0997 9.40702 20.1283 12.2784 20.4569C14.5212 24.1782 17.1426 25.7139 17.1426 25.7139V30.8567H13.7141C11.1927 30.8567 9.14273 32.3353 9.14273 34.8567V35.7138C9.14273 36.1852 9.52844 36.5709 9.99987 36.5709H31.1424C31.6139 36.5709 31.9996 36.1852 31.9996 35.7138V34.8567C31.9996 32.3353 29.9496 30.8567 27.4282 30.8567H23.9997V25.7139C23.9997 25.7139 26.6211 24.1782 28.8639 20.4569C31.7424 20.1283 34.4781 19.0997 36.7209 17.4783C39.528 15.4569 41.1423 12.8355 41.1423 10.2856V6.28563C41.1423 5.33564 40.378 4.57137 39.428 4.57137ZM7.09276 13.7712C5.34993 12.5141 4.57137 11.1141 4.57137 10.2856V9.14273H9.15702C9.22845 11.4713 9.5713 13.5141 10.0713 15.2998C8.99274 14.9284 7.98561 14.4141 7.09276 13.7712ZM36.5709 10.2856C36.5709 11.4356 35.3067 12.8641 34.0495 13.7712C33.1567 14.4141 32.1424 14.9284 31.0639 15.2998C31.5639 13.5141 31.9067 11.4713 31.9781 9.14273H36.5709V10.2856Z" fill="#FACC15"/>
</svg>
</div>
            <div className="text-white font-[400] text-[1.4em]">{info.title}</div>
            <div className="text-white font-[400] text-[1.4em]">{info.description}</div>
            <div className="text-[#FACC15] font-[400] text-[1.4em] w-full flex justify-start "><p className="max-w-[198px] w-full">{info.info}</p></div>
            </div></div>}
            </>
    )
}