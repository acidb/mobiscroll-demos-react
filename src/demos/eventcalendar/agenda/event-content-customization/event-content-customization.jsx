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
  const [toastText, setToastText] = useState();

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

  const getParticipant = useCallback((id) => {
    switch (id) {
      case 1:
        return {
          img: 'https://img.mobiscroll.com/demos/m1.png',
          name: 'Barry L.',
        };
      case 2:
        return {
          img: 'https://img.mobiscroll.com/demos/f1.png',
          name: 'Hortense T.',
        };
      case 3:
        return {
          img: 'https://img.mobiscroll.com/demos/m2.png',
          name: 'Carl H.',
        };
    }
  }, []);

  const add = useCallback((data) => {
    setToastText(data.title + ' clicked');
    setToastOpen(true);
  }, []);

  const customEventContent = useCallback(
    (data) => (
      <>
        <div>{data.title}</div>
        <div className="md-custom-event-cont">
          <img className="md-custom-event-img" src={getParticipant(data.original.participant).img} />
          <div className="mbsc-custom-event-name">{getParticipant(data.original.participant).name}</div>
          <Button className="md-custom-event-btn" color="secondary" variant="outline" onClick={() => add(data.original)}>
            Add participant
          </Button>
        </div>
      </>
    ),
    [add, getParticipant],
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
      <Eventcalendar renderEventContent={customEventContent} view={myView} data={myEvents} />
      <Toast message={toastText} isOpen={isToastOpen} onClose={handleCloseToast} />
    </>
  );
}

export default App;
