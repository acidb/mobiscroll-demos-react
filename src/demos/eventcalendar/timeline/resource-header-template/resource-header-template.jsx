import { Eventcalendar, getJson, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './resource-header-template.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);

  const myView = useMemo(
    () => ({
      timeline: {
        type: 'week',
        startDay: 1,
        endDay: 5,
      },
    }),
    [],
  );

  const myResources = useMemo(
    () => [
      {
        id: 1,
        name: 'Flatiron Room',
        seats: 90,
        color: '#fdf500',
      },
      {
        id: 2,
        name: 'The Capital City',
        seats: 250,
        color: '#ff0101',
      },
      {
        id: 3,
        name: 'Heroes Square',
        seats: 400,
        color: '#01adff',
      },
      {
        id: 4,
        name: 'Thunderdome',
        seats: 1200,
        color: '#239a21',
      },
      {
        id: 5,
        name: 'King’s Landing',
        seats: 550,
        color: '#ff4600',
      },
      {
        id: 6,
        name: 'Gathering Field',
        seats: 900,
        color: '#8f1ed6',
      },
    ],
    [],
  );

  const renderCustomResource = useCallback(
    (resource) => (
      <div className="md-resource-header-template-cont">
        <div className="md-resource-header-template-name">{resource.name}</div>
        <div className="md-resource-header-template-seats">{resource.seats} seats</div>
      </div>
    ),
    [],
  );

  const renderCustomHeader = useCallback(
    () => (
      <div className="md-resource-header-template-title">
        <div className="md-resource-header-template-name">Room</div>
        <div className="md-resource-header-template-seats">Capacity</div>
      </div>
    ),
    [],
  );

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/daily-weekly-events/',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <Eventcalendar
      // drag
      view={myView}
      data={myEvents}
      resources={myResources}
      renderResource={renderCustomResource}
      renderResourceHeader={renderCustomHeader}
      cssClass="md-resource-header-template"
    />
  );
}

export default App;
