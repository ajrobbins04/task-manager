export class Task {
    constructor(
     public id: string,
     public title: string,
     public details: string | null,
     public selectedDate: Date | null, 
     public startTime: string | 'Anytime',
     public endTime: string | null,
     public deadlineDate: Date | null,
     public priority: 'Low' | 'Medium' | 'High',
     public status: 'Incomplete' | 'Completed'
    ) {}
}