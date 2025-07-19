import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'manager-task-nav',
  templateUrl: './task-nav.component.html',
  styleUrl: './task-nav.component.css'
})
export class TaskNavComponent implements OnInit {

  chosenDate: Date;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.chosenDate$.subscribe(dateString => {
      // Convert the date string to a Date object for easier date transitions
      this.chosenDate = new Date(dateString);
    });
  }

  goToPreviousDay(): void {
    const newDate = new Date(this.chosenDate.getTime() - 24 * 60 * 60 * 1000); // Subtract one day
    this.taskService.setChosenDate(newDate.toISOString().split('T')[0]); // Format to YYYY-MM-DD to pass to the service
  }

  goToNextDay(): void {
    const newDate = new Date(this.chosenDate.getTime() + 24 * 60 * 60 * 1000); // Add one day
    this.taskService.setChosenDate(newDate.toISOString().split('T')[0]); // Format to YYYY-MM-DD to pass to the service
  }

}

