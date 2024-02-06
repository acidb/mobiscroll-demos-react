import { Eventcalendar, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useMemo, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

const now = new Date();
const y = now.getFullYear();
const m = now.getMonth();
const d = now.getDate();

function App() {
  const [isToastOpen, setToastOpen] = useState(false);

  const myEvents = useMemo(
    () => [
      {
        start: new Date(y, m, d - 3),
        end: new Date(y, m, d - 1),
        title: 'Event 1',
      },
      {
        start: new Date(y, m, d),
        end: new Date(y, m, d + 2),
        title: 'Event 2 (no event overlap)',
        overlap: false,
      },
      {
        start: new Date(y, m, d + 3),
        end: new Date(y, m, d + 5),
        title: 'Event 3',
      },
      {
        start: new Date(y, m, d + 5),
        end: new Date(y, m, d + 7),
        title: 'Event 4 (no event overlap)',
        overlap: false,
      },
    ],
    [],
  );

  const myView = useMemo(() => ({ calendar: { type: 'month', labels: 'all' } }), []);

  const handleEventFailed = useCallback(() => {
    setToastOpen(true);
  }, []);

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  return (
    <>
      <Eventcalendar
        data={myEvents}
        view={myView}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        clickToCreate={true}
        eventOverlap={false}
        onEventUpdateFailed={handleEventFailed}
        onEventCreateFailed={handleEventFailed}
        exclusiveEndDates={true}
      />
      <Toast message="Make sure not to double book" isOpen={isToastOpen} onClose={handleToastClose} />
    </>
  );
}

export default App;
