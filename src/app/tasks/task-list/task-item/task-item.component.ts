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
  @Output() taskSelected = new EventEmitter<void>();

  // toggle task item's details for visibility
  showDetails: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  toggleDetails() {
    // reverse current state w/each click
    this.showDetails = !this.showDetails;
  }
}
