import { Button, Eventcalendar, getJson, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './customize-event-popover.css';

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
      calendar: {
        labels: false,
        popover: true,
        popoverClass: 'custom-event-popover',
      },
    }),
    [],
  );

  const handleToastClose = useCallback(() => {
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

  const add = useCallback(
    (ev, data) => {
      ev.stopPropagation();
      setToastText(getParticipant(data.participant).name + "'s event clicked");
      setToastOpen(true);
    },
    [getParticipant],
  );

  const customEventContent = useCallback(
    (data) => (
      <>
        <div>{data.title}</div>
        <div className="md-custom-event-cont">
          <img className="md-custom-event-img" src={getParticipant(data.original.participant).img} />
          <div className="mbsc-custom-event-name">{getParticipant(data.original.participant).name}</div>
          <Button className="md-custom-event-btn" color="primary" variant="outline" onClick={(domEvent) => add(domEvent, data.original)}>
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
      <Eventcalendar
        // drag
        renderPopoverEventContent={customEventContent}
        data={myEvents}
        view={myView}
      />
      <Toast message={toastText} isOpen={isToastOpen} onClose={handleToastClose} />
    </>
  );
}

export default App;
