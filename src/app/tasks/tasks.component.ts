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

  taskToEdit: Task | null = null; // holds either a task being edited or null
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
    this.isNewTaskMode = true;
    this.taskToEdit = null;
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEditTask(task: Task): void {
    this.showEditForm = true;
    this.isNewTaskMode = false;
    this.taskToEdit = task; 
    this.router.navigate([this.taskToEdit.id, 'edit'], { relativeTo: this.route });
  }

  onSaveTask(event: { task: Task; date: string }): void {
    const { task, date } = event;

    if (this.isNewTaskMode) {
      this.taskService.addTask(task);
    } else {
      this.taskService.updateTask(task);  // Add a new task
    }
    
    this.onCancelTask();
  }
  onCancelTask(): void {
    this.showEditForm = false; // hide the edit form
    this.router.navigate(['/tasks']); // return to the task list
  }

}