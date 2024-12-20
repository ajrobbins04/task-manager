import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'task-manager-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  showEditForm: boolean = false;
  isNewTaskMode: boolean = false;

  chosenDate$: Observable<string>;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute ) {}


  ngOnInit(): void {
    // normally current day would be the chosen date
    // at first, but it isn't for demo purposes
    this.taskService.setChosenDate('2024-12-07');
  }

  onAddTask(): void {
    this.showEditForm = true;
    console.log('Show edit form set to true'); 
    this.isNewTaskMode = true;
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEditTask(taskId: string): void {
    this.showEditForm = true;
    console.log('Show edit form set to true'); 
    this.isNewTaskMode = false;
    this.router.navigate([taskId, 'edit'], { relativeTo: this.route });
  }

  onSaveTask(event: { task: Task; date: string }): void {
    console.log('onSaveTask executed');
    console.log(this.isNewTaskMode);
    const { task, date } = event; // unpack the passed object 

    const chosenDate = this.taskService.getChosenDate();

    if (this.isNewTaskMode) {
      this.taskService.addTask(task, date);
    } else {
      this.taskService.updateTask(task, chosenDate, date);  // Add a new task
    }

    this.taskService.getTasksForDate(chosenDate);
    this.onCancelTask();
  }
  onCancelTask(): void {
    console.log('Task edit canceled event received');
    this.showEditForm = false; // hide the edit form
    this.router.navigate(['/tasks']); // return to the task list
  }

}