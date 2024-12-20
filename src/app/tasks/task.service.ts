import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task, DailyTask } from './task.model';


@Injectable({
    providedIn: 'root'  // makes service globally available
})

export class TaskService {
    private apiUrl = 'http://localhost:3000/tasks';

    private chosenDateSubject = new BehaviorSubject<string>(''); // initial date set by tasks component
    private filteredTasksSubject = new BehaviorSubject<Task[]>([]);
    
    chosenDate$ = this.chosenDateSubject.asObservable();
    filteredTasks$ = this.filteredTasksSubject.asObservable();

    private justClickedTasks: Map<string, boolean> = new Map(); // used for ui purposes 

    constructor(private http: HttpClient) {}

    // set new date value and notify subscribers
    setChosenDate(newDate: string) {
        this.chosenDateSubject.next(newDate);
        this.getTasksForDate(newDate);
    }

    getChosenDate(): string {
        return this.chosenDateSubject.value;
    }

    // retrieve tasks for chosen date 
    getTasksForDate(date: string): void {

        // make GET request
        this.http.get<Task[]>(`${this.apiUrl}/${date}`)
            .subscribe({
                next: (tasks) => {
                    console.log('Tasks retrieved from API:', tasks);
                    this.updateChosenDateTasks(tasks); // Update subscribers with the tasks
                },
                error: (err) => console.error('Error fetching tasks:', err)
            });
    }

    // no http request necessary - task should already be in 
    // filteredTasks if it's currently displayed in the ui
    getTaskById(taskId: string): Task {
        return this.filteredTasksSubject.value.find(task => task.id === taskId);  
    }

    // emit array of updated tasks for a given date
    updateChosenDateTasks(tasks: Task[]): void {
        console.log('Updating filtered tasks:', tasks);
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
        this.http.put<Task>(`${this.apiUrl}/${updatedTask.id}`, updatedTask)
        .subscribe({
            next: (response) => {
            console.log('Task updated successfully:', response);

            // Update the local task list
            const currentTasks = this.filteredTasksSubject.value;
            const updatedTasks = currentTasks.map(task =>
            task.id === updatedTask.id ? response : task
            );

            this.filteredTasksSubject.next(updatedTasks);
        },
      error: (err) => {
        console.error('Error updating task:', err);
      }
    });
    }

    updateTaskStatus(taskId: string, newStatus: 'Completed' | 'Incomplete'): void {
        
        const url = `${this.apiUrl}/update-status/${taskId}`; 
        const chosenDate = this.chosenDateSubject.value;

        const body = {
            status: newStatus, 
            date: chosenDate // sent to locate correct dailyTask easily
        };

        this.http.put(url, body).subscribe({
            next: (response) => {
                console.log('Task status updated successfully:', response);
                this.getTasksForDate(chosenDate); // must refresh values for the current day
            },
            error: (err) => {
                console.error('Failed to update task status:', err);
            },
        });
    }


}
      
