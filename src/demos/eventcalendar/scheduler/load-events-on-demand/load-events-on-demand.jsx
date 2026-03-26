import { Eventcalendar, getJson, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useMemo, useState } from 'react';

setOptions({
  // themeJs,
  // localeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);

  const myView = useMemo(
    () => ({
      scheduler: { type: 'day' },
    }),
    [],
  );

  const handleCloseToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handlePageLoading = useCallback((args) => {
    const year = args.month.getFullYear();
    const month = args.month.getMonth();
    const day = args.firstDay.getDate();

    getJson(
      'https://trial.mobiscroll.com/weeklyevents/?year=' + year + '&month=' + month + '&day=' + day,
      (data) => {
        const newEvents = [];

        for (const value of data) {
          newEvents.push({
            start: value.start,
            end: value.end || '',
            allDay: value.allDay,
            title: value.title,
            color: value.color,
          });
        }

        setEvents(newEvents);
        setToastOpen(true);
      },
      'jsonp',
    );
  }, []);

  return (
    <div>
      <Eventcalendar
        // drag
        data={myEvents}
        view={myView}
        onPageLoading={handlePageLoading}
      />
      <Toast message="New events loaded" isOpen={isToastOpen} onClose={handleCloseToast} />
    </div>
  );
}

export default App;
