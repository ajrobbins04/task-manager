import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../task.model'
import { TaskService } from '../../task.service';

@Component({
  selector: 'manager-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() editTask = new EventEmitter<Task>();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    // Initialization logic can go here
  }

  onEditTask() {
    this.editTask.emit(this.task);
  }
  
  onDeleteTask() {
    this.taskService.deleteTask(this.task.id)
  }
}
