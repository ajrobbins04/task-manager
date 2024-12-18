import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'task-manager-task-nav',
  templateUrl: './task-nav.component.html',
  styleUrl: './task-nav.component.css'
})

export class TaskNavComponent {
  chosenDate: Date; 
  isFirstLoad: boolean = true;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.chosenDate$.subscribe((dateString) => {
      // convert to date object for easier date transitions
      this.chosenDate = new Date(dateString);

    });
  }

  goToPreviousDay() {
    const newDate = new Date(this.chosenDate.getTime() - 24 * 60 * 60 * 1000); // subtract 1 day
    const dateString = newDate.toISOString().split('T')[0]; // convert back to a string

    // Pass the formatted string to the service
    this.taskService.setChosenDate(dateString);

  }

  goToNextDay() {
    const newDate = new Date(this.chosenDate.getTime() + 24 * 60 * 60 * 1000); // add 1 day
    const dateString = newDate.toISOString().split('T')[0]; // convert back to a string
    this.taskService.setChosenDate(dateString);
  }
}
