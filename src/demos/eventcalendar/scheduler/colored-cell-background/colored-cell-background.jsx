import { Eventcalendar, getJson, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useEffect, useMemo, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);

  const myView = useMemo(() => ({ schedule: { type: 'week' } }), []);

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/events/?vers=5',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <Eventcalendar
      // drag
      data={myEvents}
      view={myView}
      colors={[
        {
          date: 'dyndatetime(y,m,d-2)',
          background: '#f3c3d480',
        },
        {
          start: 'dyndatetime(y,m,d-1,7)',
          end: 'dyndatetime(y,m,d-1,14)',
          background: '#fde4c880',
        },
        {
          start: 'dyndatetime(y,m,d+1,12)',
          end: 'dyndatetime(y,m,d+2, 20)',
          background: '#d5f1ea80',
        },
        {
          start: 'dyndatetime(y,m,d+6,6)',
          end: 'dyndatetime(y,m,d+6,8)',
          background: '#d5eaf780',
        },
        {
          start: 'dyndatetime(y,m,d+10)',
          end: 'dyndatetime(y,m,d+13)',
          allDay: true,
          background: '#e7ffe280',
        },
        {
          start: 'dyndatetime(y,m,d+16,10)',
          end: 'dyndatetime(y,m,d+17,8)',
          background: '#fbedd080',
        },
        {
          start: '12:00',
          end: '13:00',
          background: '#ffdbdb80',
          recurring: {
            repeat: 'weekly',
            weekDays: 'MO,TU,WE,TH,FR',
          },
          title: 'Lunch',
        },
      ]}
    />
  );
}

export default App;
