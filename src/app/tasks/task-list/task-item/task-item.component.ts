import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'task-manager-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})

export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  @Output() editTask = new EventEmitter<string>();

  isEditing: boolean; // track whether the task is being edited

  constructor(private taskService: TaskService,
              private router: Router,
  ) {}

  ngOnInit(): void {}

  startEditing(): void {
    this.isEditing = true; 
    this.editTask.emit(this.task.id);
  }

  stopEditing(): void {
    this.isEditing = false; 
  }

  saveChanges(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask) // save changes via the service
    this.stopEditing(); // exit edit mode after saving
  }

  // delete directly using the service
  deleteTask(): void {
    this.taskService.deleteTask(this.task);
  }

  // so a completed task can be checked, and unchecked later if necessary
  toggleTaskStatus(): void {
    this.task.status = this.task.status === 'Completed' ? 'Incomplete' : 'Completed';
    this.taskService.markAsJustClicked(this.task.id);
    this.taskService.updateTaskStatus(this.task.id, this.task.status);
  }

  // so instances where a box is checked don't immediately
  // turn to red when the cursor hovers over it afterwards
  isJustClicked(): boolean {
    return this.taskService.isJustClicked(this.task.id); 
  }
}
