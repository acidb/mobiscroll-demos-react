import { Button, Eventcalendar, getJson, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './event-content-customization.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState();

  const myParticipants = useMemo(
    () => ({
      1: { name: 'Barry L.', img: 'https://img.mobiscroll.com/demos/m1.png' },
      2: { name: 'Hortense T.', img: 'https://img.mobiscroll.com/demos/f1.png' },
      3: { name: 'Carl H.', img: 'https://img.mobiscroll.com/demos/m2.png' },
    }),
    [],
  );

  const myView = useMemo(
    () => ({
      calendar: { type: 'week' },
      agenda: { type: 'day' },
    }),
    [],
  );

  const handleCloseToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  const add = useCallback((data) => {
    setToastMessage(data.title + ' clicked');
    setToastOpen(true);
  }, []);

  const customEventContent = useCallback(
    (data) => (
      <>
        <div>{data.title}</div>
        <div className="mds-agenda-event-content mbsc-flex mbsc-align-items-center">
          <img className="mds-agenda-event-avatar" src={myParticipants[data.original.participant].img} />
          <div className="mbsc-flex-1-0">{myParticipants[data.original.participant].name}</div>
          <Button className="mds-agenda-event-btn" color="secondary" onClick={() => add(data.original)}>
            Add participant
          </Button>
        </div>
      </>
    ),
    [add, myParticipants],
  );

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/custom-events/',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <>
      <Eventcalendar renderEventContent={customEventContent} data={myEvents} view={myView} />
      <Toast message={toastMessage} isOpen={isToastOpen} onClose={handleCloseToast} />
    </>
  );
}

export default App;
