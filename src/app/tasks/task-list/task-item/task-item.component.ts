import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'task-manager-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})

export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  @Output() taskStatusChanged = new EventEmitter<Task>();

  // toggle task item's details for visibility
  showOptions: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  toggleTaskStatus() {
    this.task.status = this.task.status === 'Completed' ? 'Incomplete' : 'Completed';
    this.taskStatusChanged.emit(this.task);
  }
}
