import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../task.model'

@Component({
  selector: 'manager-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() editTask = new EventEmitter<Task>();


  constructor() { }

  ngOnInit(): void {
    // Initialization logic can go here
  }

  onEditTask() {
    this.editTask.emit(this.task);
  }
}
