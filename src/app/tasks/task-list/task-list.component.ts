import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
@Component({
  selector: 'manager-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  @Output() editTask = new EventEmitter<Task>();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onEditTask(task: Task): void {
    this.editTask.emit(task);
  }

}
