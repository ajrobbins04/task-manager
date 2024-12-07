import { EventEmitter, OnInit } from '@angular/core';
import { Task } from './task.model';
import { MOCKTASKS } from './MOCKTASKS';

export class TaskService {
    private tasks: Task[] = [];

    taskChangedEvent = new EventEmitter<Task[]>();
    taskSelectedEvent = new EventEmitter<Task>();

    constructor() {
        this.tasks = MOCKTASKS;
    }

    getAllTasks() {
        return this.tasks.slice();
    }

    getTasksByPriority(priority: 'Low' | 'Medium' | 'High'): Task[] {
        return this.tasks
            .filter(task => task.priority === priority)
            .slice();
    }

    getTask(id: string) {
        for (let task of this.tasks) {
            if (task.id === id) {
                return task;
            }
        }
        return null;
    }

    addMessage(task: Task) {
        this.tasks.push(task);
        this.taskChangedEvent.emit(this.getAllTasks());
    }
}