import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'task-manager-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})

export class TaskEditComponent implements OnInit {

  editMode: boolean;
  originalTask: Task;
  task: Task;

  @Input() chosenDate: string; // is separate from Task

  @Output() taskEditCanceled = new EventEmitter<void>(); 

  // returns obj with 2 properties: task, and chosenDate
  @Output() taskEditSaved = new EventEmitter<{task: Task; chosenDate: string}>();

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  
    this.route.params.subscribe(
      (params: Params) => {

        this.editMode = !(this.route.snapshot.url.some(segment => segment.path === 'new'));
        console.log('Edit mode status: ', this.editMode);
        // return when adding a new task
        if (!this.editMode) {
          return;
        }

        const taskId = this.route.snapshot.paramMap.get('id'); 
        console.log('taskId status: ', taskId);
        if (taskId) {
          this.task = this.taskService.getTaskById(taskId);
        }
        // return if no Task is found
        else {
          return;
        }

        // clone original task object
        this.originalTask = JSON.parse(JSON.stringify(this.task));
        console.log('Task received in TaskEditComponent:', this.originalTask);
      }
    )
  }

  inEditMode(): boolean {
    return this.editMode;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      // emit object containing the u
      this.taskEditSaved.emit({
        task: { ...this.task },
        chosenDate: this.chosenDate
      });
    }
  }

  // called when a task is moved to a different date
  onDateChange(newDate: string): void {
    this.chosenDate = newDate;
  }

  // Cancel the task editing or creation
  onCancel(): void {
    console.log('Cancel button clicked');
    this.taskEditCanceled.emit();
  }
}
