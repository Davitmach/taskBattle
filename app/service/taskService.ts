import { useCustomRouter } from "../hooks/Router";

class TaskService {
    createTask(router: ReturnType<typeof useCustomRouter>) {
      router('/newtask'); 
      console.log(133);
    }
  }
  
  export const taskService = new TaskService();
  