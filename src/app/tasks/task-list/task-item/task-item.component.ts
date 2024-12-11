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
  @Output() taskStatusChange = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<string>();

  // toggle task item's details for visibility
  showOptions: boolean = false;
  justClicked: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  // so a completed task can be checked, and unchecked later if necessary
  toggleTaskStatus() {
    this.task.status = this.task.status === 'Completed' ? 'Incomplete' : 'Completed';
    this.taskStatusChange.emit(this.task.id);

    this.justClicked = true;

    // so instances where a box is checked don't immediately
    // turn to red when the cursor hovers over it afterwards
    setTimeout(() => {
      this.justClicked = false;
    }, 1000);
  }

  onEdit() {
    this.editTask.emit(this.task.id);
  }

  onDelete() {
    this.taskService.deleteTask(this.task.id);
  }
}
