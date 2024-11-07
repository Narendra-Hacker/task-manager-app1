import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service'; // Import the TaskService
import { UserService } from '../services/user.service'; // Import the UserService
import { Task } from '../../models/Task'; // Import the Task model

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
    status: 'Pending'
  };
  daysRequired: number = 0;

  constructor(private router: Router, private taskService: TaskService, private userService: UserService) { } // Inject TaskService and UserService

  calculateDays() {
    const start = new Date(this.task.startDate);
    const end = new Date(this.task.endDate);
    const timeDiff = end.getTime() - start.getTime();
    this.daysRequired = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
  }

  onSubmit() {
    if (this.userService.isAuthenticated()) { // Check if the user is authenticated
      console.log('Task submitted:', this.task);
      this.taskService.addTask(this.task); // Call the service to add the task
      this.task = {
        id: 0,
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        status: 'Pending'
      }

      // Here you would call a service to save the task and set up email notifications
      this.setupEmailNotifications(this.task.startDate, this.task.endDate);


      // Redirect or clear form as needed
      this.router.navigate(['/task-list']); // Example redirect
    } else {
      console.error('User  is not authenticated. Task submission failed.');
      // Optionally, redirect to login or show an error message
    }
  }

  setupEmailNotifications(startDate: Date, endDate: Date) {
    const oneHourBeforeStart = new Date(startDate.getTime() - 60 * 60 * 1000);
    const oneHourBeforeEnd = new Date(endDate.getTime() - 60 * 60 * 1000);

    // Here you would implement the email sending logic
    console.log('Email will be sent at:', oneHourBeforeStart, 'and', oneHourBeforeEnd);
    // You can use a service to handle email notifications
  }
}