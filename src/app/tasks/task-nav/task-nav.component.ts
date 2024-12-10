import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'task-manager-task-nav',
  templateUrl: './task-nav.component.html',
  styleUrl: './task-nav.component.css'
})

export class TaskNavComponent {
  @Input() chosenDate: Date; 
  @Output() dateChanged = new EventEmitter<Date>();

  goToPreviousDay() {
    this.chosenDate = new Date(this.chosenDate.getTime() - 24 * 60 * 60 * 1000); // Subtract 1 day
    this.dateChanged.emit(this.chosenDate);
  }

  goToNextDay() {
    this.chosenDate = new Date(this.chosenDate.getTime() + 24 * 60 * 60 * 1000); // Add 1 day
    this.dateChanged.emit(this.chosenDate);
  }
}
