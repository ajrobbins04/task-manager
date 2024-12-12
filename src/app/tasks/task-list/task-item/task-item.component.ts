import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'task-manager-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})

export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  @Output() editTask = new EventEmitter<string>();

  // toggle task item's details for visibility
  showOptions: boolean = false;
  justClicked: boolean = false;

  constructor(private taskService: TaskService,
              private router: Router,
  ) {}

  ngOnInit(): void {}

  // so a completed task can be checked, and unchecked later if necessary
  toggleTaskStatus() {
    this.task.status = this.task.status === 'Completed' ? 'Incomplete' : 'Completed';
    this.taskService.updateTaskStatus(this.task.id, this.task.status);

    this.justClicked = true;

    // so instances where a box is checked don't immediately
    // turn to red when the cursor hovers over it afterwards
    setTimeout(() => {
      this.justClicked = false;
    }, 1000);
  }

  // notify parent that edit action was triggered
  onEdit() {
    this.editTask.emit(this.task.id);
  }

  // delete directly using the service
  onDelete() {
    this.taskService.deleteTask(this.task);
  }
}
