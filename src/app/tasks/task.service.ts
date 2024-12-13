import { EventEmitter, OnInit, Injectable } from '@angular/core';
import { Task } from './task.model';
import { MOCKTASKS } from './MOCKTASKS';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'  // makes service globally available
})

export class TaskService {
    private tasks: Task[] = [];
    private maxTaskId: number;

    // tracks tasks whose status icons (complete/incomplete) have been clicked recently
    private justClickedTasks: Map<string, boolean> = new Map();
    private chosenDateSubject = new BehaviorSubject<Date>(new Date('2024-12-07')); 
    private filteredTasksSubject = new BehaviorSubject<Task[]>([]);
    
    chosenDate$ = this.chosenDateSubject.asObservable();
    filteredTasks$ = this.filteredTasksSubject.asObservable();

    constructor() {
        this.tasks = MOCKTASKS;
        this.maxTaskId = this.getMaxId();
        this.filterTasksByDate(this.chosenDateSubject.value);
    }

    getMaxId(): number {
        let maxId = 0;
        for (let task of this.tasks) {
            const currentId = parseInt(task.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        }

        return maxId;
    }

    setChosenDate(newDate: Date) {
        this.chosenDateSubject.next(newDate);
        this.filterTasksByDate(newDate);
    }

    // filter tasks based on the selected date
    filterTasksByDate(date: Date) {
        const filteredTasks = this.tasks.filter(
          task => task.selectedDate?.toDateString() === date.toDateString()
        );
        console.log(filteredTasks);
        // emit filtered tasks to subscribers
        this.filteredTasksSubject.next(filteredTasks);
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

    getAllTasks() {
        return this.tasks.slice();
    }

    getTask(id: string) {
        for (let task of this.tasks) {
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
        this.filterTasksByDate(this.chosenDateSubject.value);
    }

    updateTaskStatus(taskId: string, newStatus: 'Completed' | 'Incomplete'): void {
        // Update the task's status and emit the updated tasks
        this.tasks = this.tasks.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        );

        this.filterTasksByDate(this.chosenDateSubject.value);
      }
      
}