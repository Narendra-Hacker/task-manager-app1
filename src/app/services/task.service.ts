// services/task.service.ts
import { Injectable } from '@angular/core';
import { Task } from '../../models/Task';
import { UserService } from './user.service'; // Import UserService

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = 'tasks'; // Key for storing tasks in local storage

  constructor(private userService: UserService) { } // Inject UserService

  // Get all tasks for the logged-in user
  getTasks(): Task[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    const userId = this.userService.getLoggedInUserId(); // Get the logged-in user's ID
    return tasks ? JSON.parse(tasks).filter((task: Task) => task.userId === userId) : []; // Filter by userId
  }

  // Get all tasks for all users
  getAllTasks(): Task[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    return tasks ? JSON.parse(tasks) : []; // Return all tasks without filtering
  }

  // Add a new task
  addTask(task: Task): void {
    const userId = this.userService.getLoggedInUserId(); // Get the logged-in user's ID

    if (userId === null) {
      throw new Error('User  is not logged in. Cannot add task.'); // Handle the case where userId is null
    }

    const allTasks = this.getAllTasks(); // Get all tasks

    // Automatically assign a unique ID and userId
    task.id = this.generateUniqueId(allTasks); // Generate a unique ID for the task
    task.userId = userId; // Set the userId from the logged-in user
    allTasks.push(task); // Add the new task to the list
    localStorage.setItem(this.localStorageKey, JSON.stringify(allTasks)); // Save to local storage
  }

  // Generate a unique ID
  private generateUniqueId(tasks: Task[]): number {
    if (tasks.length === 0) {
      return 1; // Start IDs from 1 if no tasks exist
    }
    const maxId = Math.max(...tasks.map(task => task.id)); // Get the maximum existing ID
    return maxId + 1; // Return the next ID
  }

  // Delete a task by ID
  deleteTask(taskId: number): void {
    let tasks = this.getAllTasks(); // Get all tasks for all users
    tasks = tasks.filter(task => task.id !== taskId); // Remove task with the given ID
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks)); // Update local storage
  }

  // Edit a task
  editTask(updatedTask: Task): void {
    const tasks = this.getAllTasks(); // Get all tasks for all users
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id); // Use ID for editing
    if (taskIndex !== -1) {
      // Ensure userId is not updated
      updatedTask.userId = tasks[taskIndex].userId; // Keep the existing userId
      tasks[taskIndex] = updatedTask; // Update the task
      localStorage.setItem(this.localStorageKey, JSON.stringify(tasks)); // Save to local storage
    }
  }

  // Optionally, you can add methods to find a task by name or ID
  findTaskByName(name: string): Task | undefined {
    const tasks = this.getAllTasks(); // Get all tasks for all users
    return tasks.find(task => task.name === name);
  }

  // Find a task by ID
  findTaskById(id: number): Task | undefined {
    const tasks = this.getAllTasks(); // Get all tasks for all users
    return tasks.find(task => task.id === id);
  }
}