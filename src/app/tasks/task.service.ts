import { EventEmitter, OnInit, Injectable } from '@angular/core';
import { Task } from './task.model';
import { MOCKTASKS } from './MOCKTASKS';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'  // makes service globally available
})

export class TaskService {
    private tasks: Task[] = [];
    private chosenDateTasks: Task[] = [];
    private maxTaskId: number;
    private taskChanged: BehaviorSubject<Task[]>;

    constructor() {
        this.tasks = MOCKTASKS;
        this.maxTaskId = this.getMaxId();
   
        // using BehaviorSubject so initial tasks value doesn't
        // need to be emitted manually
        this.taskChanged = new BehaviorSubject<Task[]>(this.tasks);
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
        this.taskChanged.next(this.getAllTasks());
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
        const tasksListClone = this.tasks.slice();
        this.tasks = tasksListClone;
        console.log(tasksListClone);
        this.taskChanged.next(tasksListClone);
    
    }
}