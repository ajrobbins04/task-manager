import { Component, OnInit } from '@angular/core';
import { Task } from './task.model'; 
import { TaskService } from './task.service'; 

@Component({
  selector: 'manager-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})

export class TasksComponent implements OnInit {

  // controls the visibility of the task edit form
  showEditForm: boolean = false;
  taskToEdit: Task | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.setChosenDate('2025-07-04')
  };

  onAddTask(): void {
    this.taskToEdit = null;
    this.showEditForm = true;
  }

  onEditTask(task: Task): void {
    this.taskToEdit = task;
    this.showEditForm = true;
  }

  onSaveTask(event: { task: Task; date: string }): void {
    this.showEditForm = false;
    // Optionally reload tasks or handle the new/updated task
  }

  onCancelEdit(): void {
    this.showEditForm = false;
  }
}


