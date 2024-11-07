// services/task.service.ts
import { Injectable } from '@angular/core';
import { Task } from '../../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = 'tasks'; // Key for storing tasks in local storage

  constructor() { }

  // Get all tasks
  getTasks(): Task[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    return tasks ? JSON.parse(tasks) as Task[] : [];
  }

  // Add a new task
  addTask(task: Task): void {
    const tasks = this.getTasks();
    
    // Automatically assign a unique ID
    task.id = this.generateUniqueId(tasks); // Generate a unique ID for the task
    tasks.push(task); // Add the new task to the list
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks)); // Save to local storage
  }

  // Generate a unique ID
  private generateUniqueId(tasks: Task[]): number {
    if (tasks.length === 0) {
      return 1; // Start IDs from 1 if no tasks exist
    }
    const maxId = Math.max(...tasks.map(task => task.id)); // Get the maximum existing ID
    return maxId + 1; // Return the next ID
  }

  // Delete a task by name (or you can use a unique identifier)
  deleteTask(taskId: number): void {
    let tasks = this.getTasks();
    tasks = tasks.filter(task => task.id !== taskId); // Remove task with the given ID
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks)); // Update local storage
  }

  // Edit a task
  editTask(updatedTask: Task): void {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id); // Use ID for editing
    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask; // Update the task
      localStorage.setItem(this.localStorageKey, JSON.stringify(tasks)); // Save to local storage
    }
  }

  // Optionally, you can add methods to find a task by name or ID
  findTaskByName(name: string): Task | undefined {
    const tasks = this.getTasks();
    return tasks.find(task => task.name === name);
  }

  // Find a task by ID
  findTaskById(id: number): Task | undefined {
    const tasks = this.getTasks();
    return tasks.find(task => task.id === id);
  }
}