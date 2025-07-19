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
  
  updateTask(dayId: string, id: string, task: Task): void {}

  addTask(task: Task, date: string): void {}
}
