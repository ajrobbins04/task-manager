import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'task-manager-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  
  chosenDate: Date = new Date('2024-12-07');
  tasks: Task[];
  chosenDateTasks: Task[];


  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
      this.tasks = this.taskService.getAllTasks();
      this.filterTasksByDate();
  }

  filterTasksByDate() {
    this.chosenDateTasks = this.tasks.filter(
      task => task.selectedDate?.toDateString() === this.chosenDate.toDateString()
    );

    console.log(this.chosenDateTasks);
  }

  onDateChanged(newDate: Date) {
    this.chosenDate = newDate;
    this.filterTasksByDate();
  }

}
