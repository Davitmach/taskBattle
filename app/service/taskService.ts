
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
  const data = await axios.get(DOMEN+TaskApiConfig.TASKS,{
    headers:{
      'tg-init-data':'33555'
    }
  })
  console.log(data);
  


  console.log("Создание задачи:");
  console.log({ hour, minutes, day, month, year, title, type, friendId });


  // router("/");  
    
  }
  getTasks() {
    console.log(this.tasks);
  }
  openPageCreateTask(router: ReturnType<typeof useCustomRouter>) {
      router('/newtask');
  }
  updateTasks() {}
  acceptTask() {}
  cancelTask() {}
  getTask() {}
  setTask(tasks:TTask[]) {
  const SET = localStorage.setItem('TASKS',JSON.stringify(tasks));
  var CHECK = localStorage.getItem('TASKS');
  if(CHECK) {
  const PARSE = JSON.parse(CHECK);
  console.log(process.env.NEXT_PUBLIC_QAQ);

  }
  else {
    console.error('Данные не записались в локальное хранилище');
    
  }
  }
}

export const taskService = new TaskService();
