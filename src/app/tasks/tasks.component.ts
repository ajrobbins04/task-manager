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

  chosenDate$: Observable<Date>;
  filteredTasks$: Observable<Task[]>;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.chosenDate$ = this.taskService.chosenDate$;
    this.filteredTasks$ = this.taskService.chosenDateTasks$;
  }

  onAddTask(): void {
    this.showEditForm = true;
    this.isNewTaskMode = true;
    this.taskToEdit = null;
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEditTask(taskId: string): void {
    const task = this.taskService.getTask(taskId);
    this.showEditForm = true;
    this.isNewTaskMode = false;
    this.taskToEdit = task; // pass the task being edited to the form
    this.router.navigate([task.id, 'edit'], { relativeTo: this.route });
  }

  onSaveTask(task: Task): void {
    if (this.isNewTaskMode) {
      this.taskService.addTask(task); // Add a new task
    } else {
      this.taskService.updateTask(task); // Update the existing task
    }
    this.onCancelTask();
  }

  // Cancel the task editing or creation
  onCancelTask(): void {
    this.showEditForm = false;
    this.router.navigate(['/tasks']);
  }


}
