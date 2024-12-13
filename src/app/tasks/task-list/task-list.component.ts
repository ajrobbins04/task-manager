import { Component, OnInit, Input } from '@angular/core';
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

  // receives tasks filtered by the chosen date from its parent
  @Input() chosenDateTasks: Task[]; 
  showNewTaskForm: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  toggleNewTaskForm(): void {
    this.showNewTaskForm = !this.showNewTaskForm; 
  }

  // will hide new form after calling service to add the task
  addTask(task: Task): void {
    this.taskService.addTask(task);
    this.showNewTaskForm = false; 
  }

}
