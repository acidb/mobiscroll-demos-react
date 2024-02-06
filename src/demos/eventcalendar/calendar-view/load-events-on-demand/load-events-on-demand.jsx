import { Eventcalendar, getJson, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useMemo, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [events, setEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);

  const myView = useMemo(() => ({ calendar: { labels: true } }), []);

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handlePageLoading = useCallback((args) => {
    const year = args.month.getFullYear();
    const month = args.month.getMonth();

    getJson(
      'https://trial.mobiscroll.com/monthlyevents/?year=' + year + '&month=' + month + '&vers=5',
      (data) => {
        setEvents(data);
        setToastOpen(true);
      },
      'jsonp',
    );
  }, []);

  return (
    <>
      <Eventcalendar
        // drag
        data={events}
        view={myView}
        onPageLoading={handlePageLoading}
      />
      <Toast message="New events loaded" isOpen={isToastOpen} onClose={handleToastClose} />
    </>
  );
}

export default App;
