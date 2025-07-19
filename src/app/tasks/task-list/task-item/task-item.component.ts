import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../task.model'

@Component({
  selector: 'manager-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;

  constructor() { }

  ngOnInit(): void {
    // Initialization logic can go here
  }

  onTaskClick(): void {
    // Logic to handle task click can be added here
    console.log('Task clicked:', this.task);
  }

}
