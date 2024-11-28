import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service'; 
import { UserService } from '../../services/user.service'; 
import { Task } from '../../models/Task'; 

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task: Task = {
    id: 0,
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    status: 'Pending',
    userId:0,
  };
  daysRequired: number = 0;

  constructor(private router: Router, private taskService: TaskService, private userService: UserService) { } 

  calculateDays() {
    const start = new Date(this.task.startDate);
    const end = new Date(this.task.endDate);
    const timeDiff = end.getTime() - start.getTime();
    this.daysRequired = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  }

  onSubmit() {
    if (this.userService.isAuthenticated()) { 
      console.log('Task submitted:', this.task);
      this.taskService.addTask(this.task); 
      this.task = {
        id: 0,
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        status: 'Pending',
        userId:0,
      }
      this.router.navigate(['/task-list']); 
    } else {
      console.error('User  is not authenticated. Task submission failed.');
    }
  }
}