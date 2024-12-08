import { Task } from './task.model';

export const MOCKTASKS: Task[] = [
  {
    id: '1',
    title: 'Complete Statistics Project',
    details: 'This project covers the entire statistical process.',
    selectedDate: new Date('2024-12-04'),
    startTime: '09:00',
    endTime: '10:00',
    deadlineDate: new Date('2024-12-07'),
    status: 'Incomplete'
  },
  {
    id: '2',
    title: 'Prepare Presentation Slides',
    details: 'There should be a minimum of 8 slides',
    selectedDate: new Date('2024-12-04'),
    startTime: 'Anytime',
    endTime: null,
    deadlineDate: new Date('2024-12-09'),
    status: 'Incomplete'
  },
  {
    id: '3',
    title: 'Do Laundry',
    details: 'Remember to empty out the pockets first!',
    selectedDate: new Date('2024-12-05'),
    startTime: '10:00',
    endTime: '11:00',
    deadlineDate: null,
    status: 'Incomplete'
  },
  {
    id: '4',
    title: 'Work on Angular Project',
    details: 'Ensure all CRUD operations work as expected.',
    selectedDate: new Date('2024-12-07'),
    startTime: '13:00',
    endTime: null,
    deadlineDate: new Date('2024-12-09'),
    status: 'Incomplete'
  },   
  {
    id: '5',
    title: 'Schedule Team Check-In',
    details: 'Coordinate with team members to set up a video call.',
    selectedDate: new Date('2024-12-09'),
    startTime: 'Anytime',
    endTime: null,
    deadlineDate: new Date('2024-12-11'),
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
    status: 'Incomplete'
  },
  {
    id: '7',
    title: 'Draft Email Campaign',
    details: 'Focus on engaging subject lines and strong CTAs.',
    selectedDate: new Date('2024-12-10'),
    startTime: '08:30',
    endTime: null,
    deadlineDate: new Date('2024-12-15'),
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
    status: 'Incomplete'
  },
  {
    id: '9',
    title: 'Run to the Store',
    details: 'Use grocery list hanging on the fridge.',
    selectedDate: new Date('2024-12-11'),
    startTime: '14:00',
    endTime: '15:00',
    deadlineDate: null,
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
    status: 'Incomplete'
  },
  {
    id: '11',
    title: 'Submit Final Budget Report',
    details: null,
    selectedDate: new Date('2024-12-14'),
    startTime: '09:00',
    endTime: '09:15',
    deadlineDate: null,
    status: 'Incomplete'
  },
  {
    id: '12',
    title: 'Finalize Angular Project',
    details: 'Ensure all components are responsive and accessible.',
    selectedDate: new Date('2024-12-14'),
    startTime: '10:30',
    endTime: '12:45',
    deadlineDate: new Date('2024-12-16'),
    status: 'Incomplete'
  },
  {
    id: '13',
    title: 'Call Mary',
    details: 'Today is her birthday!',
    selectedDate: new Date('2024-12-15'),
    startTime: 'Anytime',
    endTime: null,
    deadlineDate: null,
    status: 'Incomplete'
  },
  {
    id: '14',
    title: 'Shop for Christmas Gifts',
    details: 'Still looking for gifts for Kylee, Rebecca, and the family white elephant exchange.',
    selectedDate: new Date('2024-12-15'),
    startTime: '18:00',
    endTime: '20:00',
    deadlineDate: null,
    status: 'Incomplete'
  },
  {
    id: '15',
    title: 'Pay Utility Bills',
    details: null,
    selectedDate: new Date('2024-12-15'),
    startTime: '09:00',
    endTime: '09:30',
    deadlineDate: null,
    status: 'Incomplete'
  },
  {
    id: '16',
    title: 'Organize Workspace',
    details: 'Tidy up desk and declutter papers.',
    selectedDate: new Date('2024-12-15'),
    startTime: '16:00',
    endTime: '17:00',
    deadlineDate: null,
    status: 'Incomplete'
  }
];
