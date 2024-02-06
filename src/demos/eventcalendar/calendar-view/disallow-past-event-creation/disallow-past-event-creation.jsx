import { Eventcalendar, getJson, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './disallow-past-event-creation.css';

setOptions({
  // localeJs,
  // themeJs
});

const today = new Date();

function App() {
  const [myEvents, setEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { current: myView } = useRef({ calendar: { labels: true } });

  const myInvalid = useMemo(
    () => [
      {
        recurring: {
          repeat: 'daily',
          until: today,
        },
      },
    ],
    [],
  );

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleEventCreateFailed = useCallback((args) => {
    if (!args.originEvent) {
      setToastMessage("Can't create event in the past");
      setToastOpen(true);
    }
  }, []);

  const handleEventUpdateFailed = useCallback((args) => {
    if (!args.oldEventOccurrence) {
      setToastMessage("Can't move event in the past");
      setToastOpen(true);
    }
  }, []);

  const handleEventCreate = useCallback((args) => {
    const oldEvent = args.originEvent;
    const start = oldEvent && oldEvent.start ? oldEvent.start : null;

    // handle recurring events
    if (start && start < today) {
      setToastMessage("Can't move past event");
      setToastOpen(true);
      return false;
    }
  }, []);

  const handleEventUpdate = useCallback((args) => {
    const oldEvent = args.oldEvent;
    const start = oldEvent && oldEvent.start ? oldEvent.start : null;
    const oldEventOccurrence = args.oldEventOccurrence;
    const occurrenceStart = oldEventOccurrence && oldEventOccurrence.start ? oldEventOccurrence.start : null;

    // handle recurring events
    if ((start && start < today) || (occurrenceStart && occurrenceStart < today)) {
      return false;
    }
  }, []);

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/events/?vers=5',
      (events) => {
        for (const event of events) {
          // convert dates to date objects
          event.start = event.start ? new Date(event.start) : event.start;
          event.end = event.end ? new Date(event.end) : event.end;
          // mark past events as fixed by setting the event.editable property to false
          event.editable = event.start && today < event.start;
        }
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <>
      <Eventcalendar
        className="md-disallow-past-event-creation"
        view={myView}
        data={myEvents}
        invalid={myInvalid}
        clickToCreate={true}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        onEventCreateFailed={handleEventCreateFailed}
        onEventUpdateFailed={handleEventUpdateFailed}
        onEventCreate={handleEventCreate}
        onEventUpdate={handleEventUpdate}
      />
      <Toast isOpen={isToastOpen} message={toastMessage} onClose={handleToastClose} />
    </>
  );
}

export default App;
