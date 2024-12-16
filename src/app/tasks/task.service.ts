import { EventEmitter, OnInit, Injectable } from '@angular/core';
import { Task } from './task.model';
import { MOCKTASKS } from './MOCKTASKS';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'  // makes service globally available
})

export class TaskService {
    private tasksByDate: { [date: string]: Task[] } = {}; // a dict with string dates as keys

    private chosenDateSubject = new BehaviorSubject<string>('2024-12-07'); 
    private filteredTasksSubject = new BehaviorSubject<Task[]>([]);
    
    chosenDate$ = this.chosenDateSubject.asObservable();
    filteredTasks$ = this.filteredTasksSubject.asObservable();

    private justClickedTasks: Map<string, boolean> = new Map(); // used for ui purposes 

    constructor() {
        this.tasksByDate = MOCKTASKS;
        this.getTasksByDate(this.chosenDateSubject.value);
    }


    setChosenDate(newDate: string) {
        this.chosenDateSubject.next(newDate);
        this.getTasksByDate(newDate);
    }

    private getTasksByDate(date: string): void {
        const tasks = this.tasksByDate[date] || []; 
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

    getTask(id: string) {
        for (let task of this.tasksByDate) {
            if (task.id === id) {
                return task;
            }
        }
        return null;
    }

    addTask(task: Task) {
        this.tasks.push(task);
        this.filterTasksByDate(this.chosenDateSubject.value);
    }

    deleteTask(task: Task) {
        if (!task) {
            console.log('no task...')
            return;
        }
        const pos = this.tasks.indexOf(task);
        if (pos < 0) {
            console.log('no index...')
            return;
        }
        console.log(task);
        this.tasks.splice(pos, 1);
        this.tasks = this.tasks.slice();
      
        this.filterTasksByDate(this.chosenDateSubject.value);
    
    }

    updateTask(updatedTask: Task): void {
        
    }

    updateTaskStatus(taskId: string, newStatus: 'Completed' | 'Incomplete'): void {
        // Update the task's status and emit the updated tasks
        this.tasks = this.tasks.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        );

        this.getTasksByDate(this.chosenDateSubject.value);
      }
      
}