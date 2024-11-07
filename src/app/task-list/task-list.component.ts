import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/Task';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator'; // Import PageEvent
import { MatSelectChange } from '@angular/material/select'; // Import MatSelectChange
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'] // Corrected from styleUrl to styleUrls
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  paginatedTasks: Task[] = [];
  searchTerm: string = '';
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 0;
  pageSizes: number[] = [5, 10, 20];
  selectedStatus: string = ''; // For filtering by status
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
    this.setupSearch();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
    this.updatePagination();
  }

  updatePagination(): void {
    const filteredTasks = this.filterTasks();
    this.totalPages = Math.ceil(filteredTasks.length / this.pageSize);
    this.paginatedTasks = filteredTasks.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  filterTasks(): Task[] {
    return this.tasks.filter(task => 
      task.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedStatus ? task.status === this.selectedStatus : true) // Filter by status if selected
    );
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1; // Reset to first page on new search
      this.updatePagination();
    });
  }

  changePage(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1; // pageIndex is zero-based
    this.updatePagination();
  }

  onPageSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.pageSize = Number(select.value);
    this.currentPage = 1; // Reset to first page on page size change
    this.updatePagination();
  }

  onStatusChange(event: MatSelectChange): void {
    this.selectedStatus = event.value; // Update the selected status
    this.currentPage = 1; // Reset to first page on status change
    this.updatePagination(); // Update pagination based on the new filter
  }

  toggleStatus(task: Task): void {
    task.status = task.status === 'Pending' ? 'Completed' : 'Pending';
    this.taskService.editTask(task);
    this.updatePagination(); // Update the displayed tasks after status change
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
    this.loadTasks(); // Reload tasks after deletion
  }

  navigateToAddTask(){
    console.log("navigate to add task");
    this.router.navigate(['/task-form']);
  }
}