import { Task } from './task.model';

export const MOCKTASKS: Task[] = [
  {
    id: '1',
    title: 'Complete Statistics Project',
    details: 'This project covers the entire statistical process.',
    selectedDate: new Date('2024-12-04'),
    startTime: '09:00',
    endTime: '10:00',
    deadlineDate: new Date('2024-12-10'),
    priority: 'High',
    status: 'Incomplete'
  },
  {
    id: '2',
    title: 'Prepare Presentation Slides',
    details: 'Slides for the quarterly meeting should include sales data.',
    selectedDate: new Date('2024-12-05'),
    startTime: 'Anytime',
    endTime: null,
    deadlineDate: new Date('2024-12-15'),
    priority: 'Medium',
    status: 'Incomplete'
  },
  {
    id: '3',
    title: 'Submit Expense Report',
    details: null, // No additional details for this task
    selectedDate: new Date('2024-12-06'),
    startTime: '09:00',
    endTime: '09:15',
    deadlineDate: null,
    priority: 'Low',
    status: 'Incomplete'
  },
  {
    id: '4',
    title: 'Finalize Angular Project',
    details: 'Ensure all components are responsive and accessible.',
    selectedDate: new Date('2024-12-07'),
    startTime: '13:00',
    endTime: '15:00',
    deadlineDate: new Date('2024-12-20'),
    priority: 'High',
    status: 'Completed'
  },
  {
    id: '5',
    title: 'Schedule Team Check-In',
    details: 'Coordinate with team members to set up a video call.',
    selectedDate: new Date('2024-12-08'),
    startTime: 'Anytime',
    endTime: null,
    deadlineDate: new Date('2024-12-13'),
    priority: 'Medium',
    status: 'Incomplete'
  },
  {
    id: '6',
    title: 'Review Quarterly Budget',
    details: 'Analyze spending trends and propose adjustments.',
    selectedDate: new Date('2024-12-09'),
    startTime: '11:00',
    endTime: '11:30',
    deadlineDate: new Date('2024-12-12'),
    priority: 'Medium',
    status: 'Incomplete'
  },
  {
    id: '7',
    title: 'Draft Email Campaign',
    details: 'Focus on engaging subject lines and strong CTAs.',
    selectedDate: new Date('2024-12-10'),
    startTime: '08:30',
    endTime: null,
    deadlineDate: new Date('2024-12-18'),
    priority: 'Low',
    status: 'Incomplete'
  },
  {
    id: '8',
    title: 'Plan Holiday Party',
    details: 'Include venue booking, catering, and gift exchange plans.',
    selectedDate: new Date('2024-12-11'),
    startTime: 'Anytime',
    endTime: null,
    deadlineDate: null,
    priority: 'High',
    status: 'Incomplete'
  },
  {
    id: '9',
    title: 'Organize Project Backlog',
    details: null, // No additional details for this task
    selectedDate: new Date('2024-12-12'),
    startTime: '10:30',
    endTime: '12:45',
    deadlineDate: new Date('2024-12-20'),
    priority: 'Medium',
    status: 'Incomplete'
  },
  {
    id: '10',
    title: 'Brainstorm Ideas for Q1 Goals',
    details: 'Focus on customer acquisition and retention strategies.',
    selectedDate: new Date('2024-12-13'),
    startTime: '16:00',
    endTime: null,
    deadlineDate: null,
    priority: 'Low',
    status: 'Incomplete'
  }
];
