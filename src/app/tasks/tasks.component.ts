import { Component, OnInit } from '@angular/core';
import { Task } from './task.model'; 
import { TaskService } from './task.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'manager-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})

export class TasksComponent implements OnInit {

  // controls the visibility of the task edit form
  showEditForm: boolean = false;
  taskToEdit: Task | null = null;

  constructor(private taskService: TaskService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.taskService.setChosenDate('2025-07-04')
  };

  onAddTask(): void {
    this.taskToEdit = null;
    this.showEditForm = true;
    this.router.navigate(['/tasks/new'], { queryParams: { mode: 'new' } });
  }

  onEditTask(task: Task): void {
    this.taskToEdit = task;
    this.showEditForm = true;
    this.router.navigate(['/tasks/edit', task.id], { queryParams: { mode: 'edit' } });
  }

  onSaveTask(event: { task: Task; date: string }): void {
    this.showEditForm = false;
    // Optionally reload tasks or handle the new/updated task
  }

  onCancelEdit(): void {
    this.showEditForm = false;
    this.taskToEdit = null; // Reset the task being edited
  }
}


