import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'manager-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
})
export class TaskEditComponent implements OnInit {
  editMode: boolean;
  date: string;
  dayId: string;
  @Input() task: Task | null = null; // the task being edited, or null if adding a new task

  @Output() editCanceled = new EventEmitter<void>();
  @Output() editSaved = new EventEmitter<{ task: Task; date: string }>(); // obj returned w/two properties

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editMode = !!this.task;  // True if editing existing task
    this.dayId = this.taskService.getCurrentDayId();
    this.date = this.editMode
      ? this.task.startTime?.split('T')[0]
      : this.taskService.getChosenDate();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;
    const { title, details, startTime, endTime, status } = form.value;
  
    const taskPayload: Task = {
      id: this.editMode ? this.task.id : null,
      title: title.trim(),
      details: details?.trim() || null,
      startTime: startTime ? `${this.date}T${startTime}` : null,
      endTime: endTime ? `${this.date}T${endTime}` : null,
      status
    };
  
    if (this.editMode) {
      this.taskService.updateTask(this.dayId, taskPayload.id, taskPayload);
    } else {
      this.taskService.addTask(taskPayload, this.date);
    }
  
    this.editSaved.emit({ task: taskPayload, date: this.date });
  }

  // called when the user clicks the cancel button
  onCancel(): void {
    this.editCanceled.emit();
  }  

  // called when a task is moved to a different date
  onDateChange(newDate: string): void {
    this.date = newDate;
  }
}
