import { Button, Eventcalendar, Page, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useMemo, useState } from 'react';
import './event-data-structure.css';

setOptions({
  // localeJs,
  // themeJs
});

const now = new Date();

function App() {
  const [isToastOpen, setToastOpen] = useState(false);
  const [myEvents, setEvents] = useState([
    {
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14),
      title: 'General orientation',
      color: '#35bb5a',
    },
  ]);
  const [mySelectedDate, setSelectedDate] = useState();

  const myView = useMemo(() => ({ agenda: { type: 'month' } }), []);

  const handleSelectedDateChange = useCallback((args) => {
    setSelectedDate(args.date);
  }, []);

  const handleCloseToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  const addEvent = useCallback(() => {
    const newEvent = {
      // Base properties
      title: 'Product planning',
      color: '#56ca70',
      start: new Date(2018, 11, 21, 13),
      end: new Date(2018, 11, 21, 14),
      // Add any property you'd like
      busy: true,
      description: 'Weekly meeting with team',
      location: 'Office',
    };

    setSelectedDate(new Date(2018, 11, 21));
    setEvents((myEvents) => [...myEvents, newEvent]);
    setToastOpen(true);
  }, []);

  return (
    <Page className="mds-full-height">
      <div className="mds-full-height mbsc-flex-col">
        <div className="mbsc-flex-none">
          <Button onClick={addEvent} startIcon="plus">
            Add event to calendar
          </Button>
        </div>
        <div className="mds-overflow-hidden mbsc-flex-1-1">
          <Eventcalendar data={myEvents} view={myView} selectedDate={mySelectedDate} onSelectedDateChange={handleSelectedDateChange} />
        </div>
      </div>
      <Toast message="Event added" isOpen={isToastOpen} onClose={handleCloseToast} />
    </Page>
  );
}

export default App;
