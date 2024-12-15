import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'task-manager-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})

export class TaskEditComponent implements OnInit {

  taskId: string; // id for the task to edit
  originalTask: Task; // the original, unedited task
  task: Task; // the edited version
  editMode: boolean;

  @Output() closeEditForm = new EventEmitter<void>(); 
  @Output() closeNewTaskForm = new EventEmitter<void>(); 


  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  
    this.route.params.subscribe(
      (params: Params) => {

        this.editMode = !(this.route.snapshot.url.some(segment => segment.path === 'new'));

        // return when adding a new task
        if (!this.editMode) {
          return;
        }
        const idSegment = this.route.snapshot.url.find(segment => !isNaN(Number(segment.path)));
        const taskId = idSegment ? Number(idSegment.path) : null;
        console.log(taskId);

        // try to fetch existing Task using its ID
        this.originalTask = this.taskService.getTask(this.taskId);

        // return if no Task is found
        if (!this.originalTask) {
          return;
        }

        // clone original task object
        this.task = JSON.parse(JSON.stringify(this.originalTask));

      }
    )
  }

  inEditMode(): boolean {
    return this.editMode;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const value = form.value;

      const newTask = new Task(
        value.id, 
        value.title,
        value.details,
        value.selectedDate,
        value.startTime,
        value.endTime,
        value.deadlineDate,
        value.status
      );
  
      if (this.editMode) {
        this.taskService.updateTask(newTask); // Update the existing task
      } else {
        this.taskService.addTask(newTask); // Add a new task
      }
      this.onCancel();
    }
  }

  // Cancel the task editing or creation
  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}
