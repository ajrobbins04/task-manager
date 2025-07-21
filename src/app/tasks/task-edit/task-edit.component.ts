import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from '../task.service';
import { Task, DailyTasks } from '../task.model';

@Component({
  selector: 'manager-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
})
export class TaskEditComponent implements OnInit {
  @Input() task: Task | null = null; // the task being edited, or null if adding a new task

  editMode: boolean;
  date: string;
  dayId: string;
  
  @Output() editCanceled = new EventEmitter<void>();
  @Output() editSaved = new EventEmitter<{ task: Task; date: string }>(); // obj returned w/two properties

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const mode = params['mode'];
      this.editMode = mode === 'edit';
  
      this.dayId = this.taskService.getCurrentDayId();
  
      if (!this.editMode) {
        this.task = {
          id: null,
          title: '',
          details: '',
          startTime: '',
          endTime: '',
          status: 'Incomplete',
        };
        this.date = this.taskService.getChosenDate();
      } else if (this.task) {
        this.date = this.task.startTime.split('T')[0];
      }
  
      console.log('Edit mode?', this.editMode, 'Date initialized:', this.date);
    });
  }
  
  onSubmit(form: NgForm): void {

    if (form.invalid){
      console.error('Form is invalid');
      return;
    }
      
    const { title, details, startTime, endTime} = form.value;

    // Function to extract time from ISO string
    const extractTime = (iso: string) => iso?.split('T')[1] || null;

    const taskPayload: Task = {
      id: this.editMode ? this.task.id : null,
      title: title.trim(),
      details: details?.trim() || null,
      startTime: startTime ? extractTime(`${this.date}T${startTime}`) : null,
      endTime: endTime ? extractTime(`${this.date}T${endTime}`) : null,
      status: 'Incomplete',
    };

    const payloadWithDate = {
      ...taskPayload,
      date: this.date 
    };

    if (this.editMode) {
      console.log('Updating task:', taskPayload);
      this.taskService.updateTask(this.dayId, taskPayload.id, payloadWithDate);
    } else {
      console.log('Adding new task:', taskPayload);
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
    console.log('Date changed to:', newDate);
    this.date = newDate;
  }
}
