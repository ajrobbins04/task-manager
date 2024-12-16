import { Task } from "./task.model";

export const MOCKTASKS: { [date: string]: Task[] } = {
  '2024-12-04': [
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
  ],
  '2024-12-05': [
    {
      id: '3',
      title: 'Do Laundry',
      details: 'Remember to empty out the pockets first!',
      startTime: '10:00',
      endTime: '11:00',
      status: 'Incomplete'
    }
  ],
  '2024-12-07': [
    {
      id: '4',
      title: 'Work on Angular Project',
      details: 'Ensure all CRUD operations work as expected.',
      startTime: '13:00',
      endTime: null,
      status: 'Incomplete'
    }
  ],
  '2024-12-09': [
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
};

