import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Task, DailyTasks } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/tasks'; 
  private currentDayId: string | null = null; 

  // tracks the currently selected date
  private chosenDateSubject = new BehaviorSubject<string>('');
  // holds the list of tasks for the current date
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  // emits the current date and tasks to subscribers
  chosenDate$ = this.chosenDateSubject.asObservable();
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) { }

  // sets the new chosen date and retrieves tasks for that date
  // this will update all subscribers to the chosenDate$ observable
  setChosenDate(newDate: string): void {
    this.chosenDateSubject.next(newDate);
    this.getTasksByDate(newDate);
  }

  // sets the list of tasks to the tasks$ observable
  setTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
  }

  getChosenDate(): string {
    return this.chosenDateSubject.getValue();
  }

  getCurrentDayId(): string | null {
    return this.currentDayId;
  }

  // retrieves tasks for the currently selected date and the current day ID for future use
  getTasksByDate(date: string): void {
    this.http.get<{ dayId: string; tasks: Task[] }>(`${this.baseUrl}/byDate/${date}`)
      .subscribe({
        next: response => {
          //this.setChosenDate(date);       // will update all subscribers
          this.setTasks(response.tasks);   
          this.currentDayId = response.dayId;    
        },
        error: err => {
          console.error('Failed to load day by date:', err);
          this.tasksSubject.next([]);
        }
      });
  }
  
  updateTask(dayId: string, id: string, updatedTask: Task): void {
    this.http.put<{ message: string; task: Task; dailyTasks: any }>(
      `${this.baseUrl}/${dayId}/${id}`,
      updatedTask
    ).subscribe({
      next: response => {
        console.log('Task updated successfully:', response.task);
  
        // Optionally re-fetch tasks to ensure state is up to date
        const currentDate = this.getChosenDate();
        this.getTasksByDate(currentDate);
      },
      error: err => {
        console.error('Failed to update task:', err);
      }
    });
  }
  

  addTask(task: Task, date: string): void {
    const payload = { ...task, date };
    this.http.post(`${this.baseUrl}`, payload).subscribe({
      next: () => {
        this.getTasksByDate(date); 
      },
      error: (err) => {
        console.error('Add failed', err);
      }
    });
  }
  
  deleteTask(id: string): void {
    this.http.delete(`${this.baseUrl}/${this.currentDayId}/${id}`).subscribe({
      next: () => {
        const currentDate = this.getChosenDate();
        this.getTasksByDate(currentDate); // Refresh tasks after deletion
        console.log(`Task with id ${id} deleted successfully.`);
      },
      error: (err) => {
        console.error('Delete failed', err);
      }
    });
  }
}
