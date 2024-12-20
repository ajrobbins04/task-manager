export class Task {
    constructor(
     public id: string,
     public title: string,
     public details: string | null,
     public startTime: string | null,
     public endTime: string | null,
     public status: 'Incomplete' | 'Completed'
    ) {}
}
export interface DailyTask {
    date: string; 
    tasks: Task[]; 
}