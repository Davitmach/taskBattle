
import { TaskApiConfig } from "../config/apiConfig";
import { useCustomRouter } from "../hooks/Router";
import { useNotification } from "../provider/notification";

import axios from 'axios';
const DOMEN = process.env.NEXT_PUBLIC_SERVER;
type TTask = {
  id: string;
  title: string;
  type: "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  status: "IN_PROGRESS";
  timeout: number;
  endTime: string;
  owner: {
    id: string;
    name: string;
    icon: string;
  };
  participants: {
    id: string;
    name: string;
    icon: string;
  }[];
  comment: null | string;
};

class TaskService {
  private tasks: TTask[] = [];

  public constructor() {
    this.tasks = this.tasks;
  }

 async createTask(showNotification:(message: string) => void, minutes:string,hour:string,day:string,month:number,year:number,  router: ReturnType<typeof useCustomRouter>,title: string,type: "MULTI" | "SINGLE",friendId?: string[]) {
  if (!hour) {
    showNotification("У вас не установлены часы");
    return;
  }

  if (!minutes) {
    showNotification("У вас не установлены минуты");
    return;
  }

  if (!title.trim()) {
    showNotification("Вы не ввели заголовок");
    return;
  }

  if (!day) {
    showNotification("Вы не выбрали дату");
    return;
  }
  if(type=='MULTI' && friendId?.length==0) {
    showNotification('Вы не выбрали друзей') 
    return
  }
  
  const localDate = new Date(
  Number(year),
  Number(month) , 
  Number(day),
  Number(hour),
  Number(minutes),
  0, 
  0  
);
const now = new Date();
if (localDate < now) {
  showNotification("Нельзя выбрать прошедшую дату");
  return;
}
const timezoneOffset = localDate.getTimezoneOffset() * 60 * 1000;


const utcDate = new Date(localDate.getTime() - timezoneOffset);

const endTime = utcDate.toISOString();
console.log(hour,'час');
console.log(minutes,'минуты')
  console.log(day,endTime);
  
  const data = await axios.post(DOMEN+TaskApiConfig.CREATETASK,{
    title:title,
    type:type,
    status:'IN_PROGRESS',
    endTime:endTime,
    friendId:friendId
  },{
    headers:{
      'tg-init-data':window.Telegram.WebApp.initData
    }
  })
 
  
console.log(data);
if(data.data) {
  router("/");  
  return data.data
  
}


    
  }
  async getTasks() {
   
     const Get = await axios.get(DOMEN+TaskApiConfig.TASKS,{
      headers:{
        'tg-init-data':window.Telegram.WebApp.initData
      }
     })
     const data = Get.data;
     if(data) {
   
      const set = localStorage.setItem('TASKS',JSON.stringify(data?.data))}
      return data.data;
     
    
  }
  async getOfflineTask() {
 const CheckTask = localStorage.getItem('TASKS');
    if(CheckTask) {
     const Parsed = JSON.parse(CheckTask);
     return Parsed
    }
    
  }
  openPageCreateTask(router: ReturnType<typeof useCustomRouter>) {
      router('/newtask');
  }
  async updateTasks() {
    const data = await axios.get(DOMEN+TaskApiConfig.TASKS,{
      headers:{
        'tg-init-data':window.Telegram.WebApp.initData
      }
    })
    const res = data.data;
    localStorage.setItem('TASKS',JSON.stringify(res?.data));
    return res?.data;
  }
  async acceptTask(id:string) {
    const data = await axios.get(DOMEN+TaskApiConfig.COMPLETETASK+id,{
      headers:{
        'tg-init-data':window.Telegram.WebApp.initData
      }
    })
    if(data) {
      return data.data;
    }
  }
  async cancelTask(id:string) {
    const data = await axios.get(DOMEN+TaskApiConfig.CANCELTASK+id,{
      headers:{
        'tg-init-data':window.Telegram.WebApp.initData
      }
    })
    if(data) {
      return data.data;
    }
  }

  setTask(tasks:TTask[]) {
  const SET = localStorage.setItem('TASKS',JSON.stringify(tasks));
  var CHECK = localStorage.getItem('TASKS');
  if(CHECK) {
  const PARSE = JSON.parse(CHECK);


  }
  else {
    console.error('Данные не записались в локальное хранилище');
    
  }
  }

}

export const taskService = new TaskService();
