import { Button, Eventcalendar, formatDate, getJson, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './customizing-day-header.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);

  const myView = useMemo(
    () => ({
      agenda: {
        type: 'month',
        showEmptyDays: true,
      },
    }),
    [],
  );

  const addEvent = useCallback(
    (date) => {
      const newEvent = {
        title: 'Event',
        start: date,
      };

      setEvents([...myEvents, newEvent]);
      setToastOpen(true);
    },
    [myEvents],
  );

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const renderCustomDay = useCallback(
    (day) => (
      <div className="mbsc-flex mbsc-flex-1-1 mbsc-align-items-center">
        <div className="mbsc-flex-1-1">
          <div>{formatDate('D MMM YYYY', day.date)}</div>
        </div>
        <Button className="mds-custom-day-header-btn" color="primary" startIcon="plus" variant="outline" onClick={() => addEvent(day.date)}>
          Add event
        </Button>
      </div>
    ),
    [addEvent],
  );

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
    <>
      <Eventcalendar className="mds-custom-day-header" view={myView} data={myEvents} renderAgendaDay={renderCustomDay} />;
      <Toast message="Event added" isOpen={isToastOpen} onClose={handleToastClose} />
    </>
  );
}

export default App;
