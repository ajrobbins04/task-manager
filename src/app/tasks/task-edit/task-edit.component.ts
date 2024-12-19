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
  task: Task;
  formattedDate: string;
  chosenDate: string; // is separate from Task

  @Output() taskEditCanceled = new EventEmitter<void>(); 
  @Output() taskEditSaved = new EventEmitter<{task: Task; chosenDate: string}>(); // obj returned w/two properties

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
        let task = null;
        if (taskId) {
          task = this.taskService.getTaskById(taskId);
        }
        // return if no Task is found
        else {
          return;
        }

        // clone original task object
        this.task = JSON.parse(JSON.stringify(task));
        console.log('Task received in TaskEditComponent:', this.task);
      }
      
    )
    // subscribe to chosenDate$
    this.taskService.chosenDate$.subscribe((dateString) => {
      console.log('Chosen date string:', dateString);
  
      this.chosenDate = dateString;
  
      if (this.task && this.chosenDate) {
        const dateObj = new Date(this.chosenDate);
        this.formattedDate = dateObj.toISOString().split('T')[0];
        console.log('Formatted date:', this.formattedDate);
      }
    });
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
