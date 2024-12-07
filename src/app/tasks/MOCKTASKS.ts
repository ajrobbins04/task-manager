import {Task} from './task.model';

export const MOCKTASKS: Task[] = [
    {
      id: '1',
      title: 'Complete statistics project',
      description: 'Reminder: project must incorporate all 5 steps of the statistical process.',
      dueDate: new Date('2024-12-10'), 
      priority: 'High',
      status: 'Incomplete'
    },
    {
      id: '2',
      title: 'Prepare presentation slides',
      description: 'Create and finalize slides for the quarterly team meeting.',
      dueDate: new Date('2024-12-15'),
      priority: 'Medium',
      status: 'Incomplete'
    },
    {
      id: '3',
      title: 'Submit expense report',
      description: 'Collect receipts and submit the expense report for reimbursement.',
      dueDate: null,
      priority: 'Low',
      status: 'Incomplete'
    },
    {
      id: '4',
      title: 'Finalize Angular project',
      description: 'Review and debug the code, then push the final version to GitHub.',
      dueDate: new Date('2024-12-20'),
      priority: 'High',
      status: 'Completed'
    },
    {
      id: '5',
      title: 'Schedule team check-in',
      description: 'Find a time that works for everyone and send calendar invites.',
      dueDate: new Date('2024-12-13'),
      priority: 'Medium',
      status: 'Incomplete'
    }
];