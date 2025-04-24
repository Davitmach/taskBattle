import { useCustomRouter } from "../hooks/Router";

class TaskService {
    createTask(router: ReturnType<typeof useCustomRouter>) {
      router('/newtask'); 
    }
  }
  
  export const taskService = new TaskService();
  