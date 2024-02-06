import { Button, Eventcalendar, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useMemo, useState } from 'react';

const now = new Date();

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([
    {
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14),
      title: 'General orientation',
      color: '#35bb5a',
    },
  ]);

  const [mySelectedDate, setMySelectedDate] = useState();
  const [isToastOpen, setToastOpen] = useState(false);

  const myView = useMemo(
    () => ({
      schedule: {
        type: 'day',
      },
    }),
    [],
  );

  const handleCloseToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  const addEvent = useCallback(() => {
    const newEvent = {
      // base properties
      title: 'Product planning',
      color: '#56ca70',
      start: new Date(2018, 11, 21, 13),
      end: new Date(2018, 11, 21, 14),
      // add any property you'd like
      busy: true,
      description: 'Weekly meeting with team',
      location: 'Office',
    };

    setMySelectedDate(new Date(2018, 11, 21));
    setEvents([...myEvents, newEvent]);
    setToastOpen(true);
  }, [myEvents]);

  return (
    <div>
      <Eventcalendar data={myEvents} view={myView} selectedDate={mySelectedDate} />
      <div className="mbsc-button-group-block">
        <Button onClick={addEvent}>Add event to calendar</Button>
      </div>
      <Toast message="Event added" isOpen={isToastOpen} onClose={handleCloseToast} />
    </div>
  );
}

export default App;
