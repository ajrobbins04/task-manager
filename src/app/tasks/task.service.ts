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

    // using BehaviorSubject so initial tasks value doesn't
    // need to be emitted manually
    tasksChanged = new BehaviorSubject<Task[]>(this.tasks);
    // so other components cannot modify tasks
    tasks$ = this.tasksChanged.asObservable();


    constructor() {
        this.tasks = MOCKTASKS;
        this.maxTaskId = this.getMaxId();
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
        this.tasksChanged.next(this.getAllTasks());
    }

    deleteTask(taskId: string) {
      
    }
}