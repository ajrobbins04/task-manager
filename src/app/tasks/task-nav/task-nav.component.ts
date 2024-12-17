import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'task-manager-task-nav',
  templateUrl: './task-nav.component.html',
  styleUrl: './task-nav.component.css'
})

export class TaskNavComponent {
  chosenDate: Date; 

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.chosenDate$.subscribe((date) => {
      //this.chosenDate = date; 
    });
  }

  goToPreviousDay() {
    const newDate = new Date(this.chosenDate.getTime() - 24 * 60 * 60 * 1000); // Subtract 1 day
    //this.taskService.setChosenDate(newDate);

  }

  goToNextDay() {
    const newDate = new Date(this.chosenDate.getTime() + 24 * 60 * 60 * 1000); // Add 1 day
    //this.taskService.setChosenDate(newDate);
  }
}
