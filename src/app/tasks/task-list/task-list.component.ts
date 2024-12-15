import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
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

  // tasks filtered by the chosen date to be displayed
  @Input() chosenDateTasks: Task[]; 
  @Output() editTask = new EventEmitter<string>();
  @Output() addTask = new EventEmitter<void>();
  
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute ) {}

    ngOnInit(): void {}

    onEditTask(taskId: string): void {

      this.editTask.emit(taskId);
      
    }

    onAdd(): void {
      this.addTask.emit();
    }

}
