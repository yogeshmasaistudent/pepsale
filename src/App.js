// App.jsx
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SwimLaneUI from './Components/SwimLaneUI';

const config = {
  states: ['todo', 'inProgress', 'review', 'done'],
  allowedTransitions: {
    todo: ['inProgress'],
    inProgress: ['review', 'todo'],
    review: ['done', 'inProgress'],
    done: ['todo'],
  },
  transitionFields: {
    inProgress: [
      { name: 'assignee', label: 'Assignee', type: 'text' },
      { name: 'startDate', label: 'Start Date', type: 'date' },
    ],
    review: [
      { name: 'reviewer', label: 'Reviewer', type: 'text' },
    ],
    done: [
      { name: 'completionDate', label: 'Completion Date', type: 'date' },
    ],
  },
};

function App() {
  return (
    <ChakraProvider>
      <SwimLaneUI config={config} />
    </ChakraProvider>
  );
}

export default App;