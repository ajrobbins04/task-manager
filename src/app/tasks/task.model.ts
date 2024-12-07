export class Task {
    constructor(
     public id: string,
     public title: string,
     public description: string,
     public dueDate: Date | null,
     public priority: 'Low' | 'Medium' | 'High',
     public status: 'Incomplete' | 'Completed'
    ) {}
}