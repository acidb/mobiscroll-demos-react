import { Eventcalendar, getJson, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './work-week-hours.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastText, setToastText] = useState();

  const myInvalids = useMemo(
    () => [
      {
        start: '12:00',
        end: '13:00',
        title: 'Lunch break',
        type: 'lunch',
        recurring: {
          repeat: 'weekly',
          weekDays: 'MO,TU,WE,TH,FR',
        },
      },
    ],
    [],
  );

  const myView = useMemo(
    () => ({
      schedule: {
        type: 'week',
        startDay: 1,
        endDay: 5,
        startTime: '09:00',
        endTime: '18:00',
      },
    }),
    [],
  );

  const handleEventCreateFailed = useCallback((args) => {
    if (args.invalid.type === 'lunch') {
      setToastText("Can't create this task on lunch break.");
      setToastOpen(true);
    }
  }, []);

  const handleEventUpdateFailed = useCallback((args) => {
    if (args.invalid.type === 'lunch') {
      setToastText("Can't schedule this task on lunch break.");
      setToastOpen(true);
    }
  }, []);

  const handleCloseToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com//workday-events/?vers=5',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <div>
      <Eventcalendar
        dragToCreate={true}
        dragToMove={true}
        invalid={myInvalids}
        data={myEvents}
        view={myView}
        onEventCreateFailed={handleEventCreateFailed}
        onEventUpdateFailed={handleEventUpdateFailed}
      />
      <Toast message={toastText} isOpen={isToastOpen} onClose={handleCloseToast} />
    </div>
  );
}

export default App;
