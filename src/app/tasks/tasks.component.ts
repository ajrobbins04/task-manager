import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'task-manager-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  filteredTasks$: Observable<Task[]>;
  currentDate$: Observable<Date>;
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.filteredTasks$ = this.taskService.filteredTasks$;
    this.currentDate$ = this.taskService.chosenDate$;
  }

}
