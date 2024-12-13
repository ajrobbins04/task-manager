import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  // called when TaskEdit's save event is fired
  // to save the task changes via the service
  onSave(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask); 
  }
  
  // called when TaskEdit's cancel event is fired
  // to close the edit task form
  onCancel(): void {
    this.toggleNewTaskForm();
  }
}
