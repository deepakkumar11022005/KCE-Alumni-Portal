import React from 'react';
import UpcomingEvents from './UpcomingEvents';

const events = [
  {
    image: 'https://via.placeholder.com/300x180',
    title: 'Event 1',
    date: '2024-09-15',
    description: 'This is a description of the first event.',
  },
  {
    image: 'https://via.placeholder.com/300x180',
    title: 'Event 2',
    date: '2024-09-22',
    description: 'This is a description of the second event.',
  },
  // Add more events here
];

const App = () => (
  <div>
    <UpcomingEvents events={events} />
  </div>
);

export default App;
