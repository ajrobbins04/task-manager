import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
      
  }
}
