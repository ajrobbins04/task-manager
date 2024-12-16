import { Task } from './task.model';

// Define the DailyTask structure
interface DailyTask {
  date: Date;
  tasks: Task[];
}

export const MOCKTASKS: DailyTask[] = [
  {
    date: new Date('2024-12-04'),
    tasks: [
      {
        id: '1',
        title: 'Complete Statistics Project',
        details: 'This project covers the entire statistical process.',
        startTime: '09:00',
        endTime: '10:00',
        status: 'Incomplete'
      },
      {
        id: '2',
        title: 'Prepare Presentation Slides',
        details: 'There should be a minimum of 8 slides',
        startTime: null,
        endTime: null,
        status: 'Incomplete'
      }
    ]
  },
  {
    date: new Date('2024-12-05'),
    tasks: [
      {
        id: '3',
        title: 'Do Laundry',
        details: 'Remember to empty out the pockets first!',
        startTime: '10:00',
        endTime: '11:00',
        status: 'Incomplete'
      }
    ]
  },
  {
    date: new Date('2024-12-07'),
    tasks: [
      {
        id: '4',
        title: 'Work on Angular Project',
        details: 'Ensure all CRUD operations work as expected.',
        startTime: '13:00',
        endTime: null,
        status: 'Incomplete'
      }
    ]
  },
  {
    date: new Date('2024-12-09'),
    tasks: [
      {
        id: '5',
        title: 'Schedule Team Check-In',
        details: 'Coordinate with team members to set up a video call.',
        startTime: null,
        endTime: null,
        status: 'Incomplete'
      },
      {
        id: '6',
        title: 'Review Quarterly Budget',
        details: 'Analyze spending trends and propose adjustments.',
        startTime: '11:00',
        endTime: '11:30',
        status: 'Incomplete'
      }
    ]
  },
  {
    date: new Date('2024-12-10'),
    tasks: [
      {
        id: '7',
        title: 'Draft Email Campaign',
        details: 'Focus on engaging subject lines and strong CTAs.',
        startTime: '08:30',
        endTime: null,
        status: 'Incomplete'
      }
    ]
  },
  {
    date: new Date('2024-12-11'),
    tasks: [
      {
        id: '8',
        title: 'Plan Holiday Party',
        details: 'Include venue booking, catering, and gift exchange plans.',
        startTime: null,
        endTime: null,
        status: 'Incomplete'
      },
      {
        id: '9',
        title: 'Run to the Store',
        details: 'Use grocery list hanging on the fridge.',
        startTime: '14:00',
        endTime: '15:00',
        status: 'Incomplete'
      }
    ]
  },
  {
    date: new Date('2024-12-13'),
    tasks: [
      {
        id: '10',
        title: 'Brainstorm Ideas for Q1 Goals',
        details: 'Focus on customer acquisition and retention strategies.',
        startTime: '16:00',
        endTime: null,
        status: 'Incomplete'
      }
    ]
  },
  {
    date: new Date('2024-12-14'),
    tasks: [
      {
        id: '11',
        title: 'Submit Final Budget Report',
        details: null,
        startTime: '09:00',
        endTime: '09:15',
        status: 'Incomplete'
      },
      {
        id: '12',
        title: 'Finalize Angular Project',
        details: 'Ensure all components are responsive and accessible.',
        startTime: '10:30',
        endTime: '12:45',
        status: 'Incomplete'
      }
    ]
  },
  {
    date: new Date('2024-12-15'),
    tasks: [
      {
        id: '13',
        title: 'Call Mary',
        details: 'Today is her birthday!',
        startTime: null,
        endTime: null,
        status: 'Incomplete'
      },
      {
        id: '14',
        title: 'Shop for Christmas Gifts',
        details: 'Still looking for gifts for Kylee, Rebecca, and the family white elephant exchange.',
        startTime: '18:00',
        endTime: '20:00',
        status: 'Incomplete'
      },
      {
        id: '15',
        title: 'Pay Utility Bills',
        details: null,
        startTime: '09:00',
        endTime: '09:30',
        status: 'Incomplete'
      },
      {
        id: '16',
        title: 'Organize Workspace',
        details: 'Tidy up desk and declutter papers.',
        startTime: '16:00',
        endTime: '17:00',
        status: 'Incomplete'
      }
    ]
  }
];
