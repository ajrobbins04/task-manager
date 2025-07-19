import { Component, OnInit } from '@angular/core';
import { Task } from './task.model'; 
import { TaskService } from './task.service'; 

@Component({
  selector: 'manager-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})

export class TasksComponent implements OnInit {
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.setChosenDate('2025-07-04')
  };
  
}


