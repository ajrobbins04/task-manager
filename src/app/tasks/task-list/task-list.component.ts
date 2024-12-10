import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'task-manager-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: [
    '../../app.component.css',
    './task-list.component.css'
  ]
})

export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  onTaskStatusChange(updatedTask: Task) {
    console.log('change noted!')
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getAllTasks();
  }
}
