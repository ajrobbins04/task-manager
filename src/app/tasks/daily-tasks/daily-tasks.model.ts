import { Task } from "../task.model";

export interface DailyTask {
    date: Date;
    tasks: Task[];
}