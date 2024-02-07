import { Eventcalendar, getJson, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './synchronized-views.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [mySelectedDate, setSelectedDate] = useState(new Date());

  const dayView = useMemo(() => ({ agenda: { type: 'day' } }), []);
  const monthView = useMemo(() => ({ calendar: { popover: false, labels: false } }), []);

  const handleDateChange = useCallback((event) => {
    setSelectedDate(event.date);
  }, []);

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/events/?vers=5',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <div className="mbsc-grid mds-sync-view">
      <div className="mbsc-row mbsc-no-padding">
        <div className="mbsc-col-12 mbsc-col-md-4 mbsc-col-xl-3">
          <Eventcalendar
            data={myEvents}
            height="auto"
            selectedDate={mySelectedDate}
            view={monthView}
            onSelectedDateChange={handleDateChange}
          />
        </div>
        <div className="mds-sync-cal mbsc-col-12 mbsc-col-md-8 mbsc-col-xl-9">
          <Eventcalendar data={myEvents} selectedDate={mySelectedDate} view={dayView} onSelectedDateChange={handleDateChange} />
        </div>
      </div>
    </div>
  );
}

export default App;
