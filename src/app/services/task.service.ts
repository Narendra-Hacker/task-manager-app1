// services/task.service.ts
import { Injectable } from '@angular/core';
import { Task } from '../../models/Task';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = 'tasks'; 

  constructor(private userService: UserService) { } 
 
  getTasks(): Task[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    const userId = this.userService.getLoggedInUserId(); 
    return tasks ? JSON.parse(tasks).filter((task: Task) => task.userId === userId) : []; 
  }


  getAllTasks(): Task[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    return tasks ? JSON.parse(tasks) : []; 
  }

  addTask(task: Task): void {
    const userId = this.userService.getLoggedInUserId(); 

    if (userId === null) {
      throw new Error('User  is not logged in. Cannot add task.'); 
    }

    const allTasks = this.getAllTasks(); 


    task.id = this.generateUniqueId(allTasks); 
    task.userId = userId; 
    allTasks.push(task); 
    localStorage.setItem(this.localStorageKey, JSON.stringify(allTasks)); 
  }

 
  private generateUniqueId(tasks: Task[]): number {
    if (tasks.length === 0) {
      return 1; 
    }
    const maxId = Math.max(...tasks.map(task => task.id)); 
    return maxId + 1;
  }


  deleteTask(taskId: number): void {
    let tasks = this.getAllTasks(); 
    tasks = tasks.filter(task => task.id !== taskId); 
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks)); 
  }

 
  editTask(updatedTask: Task): void {
    const tasks = this.getAllTasks(); 
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id); 
    if (taskIndex !== -1) {
      updatedTask.userId = tasks[taskIndex].userId; 
      tasks[taskIndex] = updatedTask; 
      localStorage.setItem(this.localStorageKey, JSON.stringify(tasks)); 
    }
  }

 
  findTaskByName(name: string): Task | undefined {
    const tasks = this.getAllTasks(); 
    return tasks.find(task => task.name === name);
  }

 
  findTaskById(id: number): Task | undefined {
    const tasks = this.getAllTasks(); 
    return tasks.find(task => task.id === id);
  }
}