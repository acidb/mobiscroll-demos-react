import { Eventcalendar, formatDate, getJson, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './date-header-template.css';

setOptions({
  // localeJs,
  // themeJs
});

const milestones = [
  {
    date: 'dyndatetime(y,m,d-2)',
    name: 'Project review',
    color: '#f5da7b',
  },
  {
    date: 'dyndatetime(y,m,d-1)',
    name: 'Product shipping',
    color: '#acf3a3',
  },
  {
    date: 'dyndatetime(y,m,d+1)',
    name: 'Cycle finish',
    color: '#ff84a0',
  },
];

function App() {
  const [myEvents, setEvents] = useState([]);

  const calView = useMemo(
    () => ({
      schedule: {
        type: 'week',
        allDay: false,
        startDay: 1,
        endDay: 5,
        startTime: '08:00',
        endTime: '17:00',
      },
    }),
    [],
  );

  const myResources = useMemo(
    () => [
      {
        id: 1,
        name: 'Ryan',
        color: '#f7c4b4',
        img: 'https://img.mobiscroll.com/demos/m1.png',
      },
      {
        id: 2,
        name: 'Kate',
        color: '#c6f1c9',
        img: 'https://img.mobiscroll.com/demos/f1.png',
      },
      {
        id: 3,
        name: 'John',
        color: '#e8d0ef',
        img: 'https://img.mobiscroll.com/demos/m2.png',
      },
    ],
    [],
  );

  const renderCustomDay = useCallback((args) => {
    const date = args.date;
    // const dayNr = date.getDay();
    const task = milestones.find((obj) => +new Date(obj.date) === +date) || {};

    return (
      <div className="header-template-container">
        <div className="header-template-date">
          <div className="header-template-day-name">{formatDate('DDDD', date)}</div>
          <div className="header-template-day">{formatDate('MMMM DD', date)}</div>
        </div>
        <div className="header-template-task" style={{ background: task.color }}>
          {task.name}
        </div>
      </div>
    );
  }, []);

  const renderCustomResource = useCallback(
    (resource) => (
      <div className="header-resource-template-content">
        <img className="header-resource-avatar" src={resource.img} />
        <div className="header-resource-name">{resource.name}</div>
      </div>
    ),
    [],
  );

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/resource-events/',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <Eventcalendar
      // drag
      view={calView}
      data={myEvents}
      resources={myResources}
      groupBy="date"
      renderDay={renderCustomDay}
      renderResource={renderCustomResource}
    />
  );
}

export default App;
