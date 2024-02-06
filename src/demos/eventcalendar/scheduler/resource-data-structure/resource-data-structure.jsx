import { Eventcalendar, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useMemo } from 'react';
import './resource-data-structure.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const myResources = useMemo(
    () => [
      {
        // base properties
        id: 1,
        name: 'Ryan',
        color: '#ca4747',
        eventCreation: true,
        // add any property you'd like
        title: 'UX Designer',
        job: 'Apollo Project',
      },
      {
        // base properties
        id: 2,
        name: 'Kate',
        color: '#cc9900',
        eventCreation: true,
        // add any property you'd like
        title: 'Product Developer',
        job: 'Yorick Project',
      },
      {
        // base properties
        id: 3,
        name: 'John',
        color: '#01adff',
        eventCreation: true,
        // add any property you'd like
        title: 'Network Administrator',
        job: 'Titus Project',
      },
    ],
    [],
  );

  const myView = useMemo(
    () => ({
      schedule: {
        type: 'day',
      },
    }),
    [],
  );

  const myEvents = useMemo(
    () => [
      {
        start: 'dyndatetime(y,m,d,15)',
        end: 'dyndatetime(y,m,d,18)',
        title: 'General orientation',
        resource: 1,
      },
      {
        start: 'dyndatetime(y,m,d,9)',
        end: 'dyndatetime(y,m,d,11)',
        text: 'Stakeholder mtg.',
        resource: 2,
      },
      {
        start: 'dyndatetime(y,m,d,13,30)',
        end: 'dyndatetime(y,m,d,15)',
        text: "Lunch @ Butcher's",
        resource: 3,
      },
    ],
    [],
  );

  const renderCustomResource = useCallback(
    (resource) => (
      <div>
        <div className="resource-name">{resource.name}</div>
        <div className="md-resource-data-structure-title">{resource.title}</div>
      </div>
    ),
    [],
  );

  return <Eventcalendar view={myView} data={myEvents} resources={myResources} renderResource={renderCustomResource} />;
}

export default App;
