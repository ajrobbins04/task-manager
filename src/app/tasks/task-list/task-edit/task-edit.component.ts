import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'task-manager-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit {
  @Input() task: Task; // the task to edit
  @Output() taskEditSaved = new EventEmitter<Task>(); 
  @Output() taskEditCanceled = new EventEmitter<void>(); 
  

  originalTask: Task; // the original, unedited task

  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.originalTask = { ...this.task }; // create copy of task prior to editing it
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.taskEditSaved.emit({ 
        ...this.originalTask,
        ...this.task // overwrite original task data with updated data
      })
    }
  }

  onCancel(): void {
    this.task = { ...this.originalTask }; // restore original task 
    this.taskEditCanceled.emit();
  }
}
