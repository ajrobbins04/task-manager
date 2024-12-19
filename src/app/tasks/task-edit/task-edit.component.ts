import { Component, Output, EventEmitter, OnInit } from '@angular/core';
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
        // determine if a task is being edited or added
        this.editMode = !(this.route.snapshot.url.some(segment => segment.path === 'new'));

        // return when adding a new task
        if (!this.editMode) {
          return;
        }

        // retrieve task id from url 
        const taskId = this.route.snapshot.paramMap.get('id'); 
        console.log('taskId status: ', taskId);

        // retrieve task using taskId
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
    console.log('submitted!')
    console.log('Form validity:', form.valid);
    console.log('Form value:', form.value);
    console.log(this.chosenDate);
   
    if (form.valid) {
      console.log('Emitting taskEditSaved with task:', this.task, 'and chosenDate:', this.chosenDate);
      this.taskEditSaved.emit({
        task: this.task,  
        chosenDate: this.chosenDate // date passed separately from task
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
