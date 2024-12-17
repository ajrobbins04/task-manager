import { EventEmitter, OnInit, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task, DailyTask } from './task.model';


@Injectable({
    providedIn: 'root'  // makes service globally available
})

export class TaskService implements OnInit {
    private apiUrl = 'http://localhost:3000/tasks';
    private tasksForDate: { [date: string]: Task[] } = {}; // a dict with string dates as keys

    private chosenDateSubject = new BehaviorSubject<string>('2024-12-07'); 
    private filteredTasksSubject = new BehaviorSubject<Task[]>([]);
    
    chosenDate$ = this.chosenDateSubject.asObservable();
    filteredTasks$ = this.filteredTasksSubject.asObservable();

    private justClickedTasks: Map<string, boolean> = new Map(); // used for ui purposes 

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.getTasksForDate(this.chosenDateSubject.value);
    }

    setChosenDate(newDate: string) {
        this.chosenDateSubject.next(newDate);
        this.getTasksForDate(newDate);
    }

    getTasksForDate(date: string): void {
        // make GET request
        this.http.get<DailyTask>(`${this.apiUrl}/${date}`)
            // extract just the tasks array from dailyTask
            // using map to tranform the received value
            .pipe(
                map((dailyTask: DailyTask) => dailyTask.tasks)
            ).subscribe ({
                next: (tasks) => this.updateChosenDateTasks(tasks),
                error: (err) => console.error('Error fetching tasks: ', err)  
            })
    }

    getTaskById(taskId: string): Observable<Task> {
        const url = `${this.apiUrl}/${taskId}`; // Construct the endpoint URL
        return this.http.get<Task>(url); // Send the GET request
    }

    // emit array of updated tasks for a given date
    updateChosenDateTasks(tasks: Task[]): void {
        this.filteredTasksSubject.next(tasks);
    }
    // will delay a newly completed task from turning red on hover 
    // immediately after it's been clicked (and vice-versa)
    markAsJustClicked(taskId: string): void {
        this.justClickedTasks.set(taskId, true);
      
        // Clear the just-clicked state after a delay
        setTimeout(() => {
          this.justClickedTasks.delete(taskId);
        }, 1500);
    }

    isJustClicked(taskId: string): boolean {
        return this.justClickedTasks.get(taskId) || false;
    }
    addTask(task: Task): void {

    }

    deleteTask(task: Task) {
        if (!task) {
            console.log('no task...')
            return;
        }
    
    }

    updateTask(updatedTask: Task): void {
        
    }

    updateTaskStatus(taskId: string, newStatus: 'Completed' | 'Incomplete'): void {
        // Update the task's status and emit the updated tasks

      }
      
}