import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'task-manager-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: [
    '../../app.component.css',
    './task-list.component.css'
  ]
})

export class TaskListComponent {

  // tasks filtered by the chosen date to be displayed
  chosenDateTasks: Task[] = [];
  @Output() editTask = new EventEmitter<string>();
  @Output() addTask = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.filteredTasks$.subscribe({
        next: (tasks) => {
            console.log('Received tasks in TaskListComponent:', tasks);
            this.chosenDateTasks = tasks;
        },
        error: (err) => console.error('Error subscribing to tasks:', err),
    });
}

    onEditTask(taskId: string): void {
      this.editTask.emit(taskId); 
    }

    onAdd(): void {
      this.addTask.emit();
    }

}
