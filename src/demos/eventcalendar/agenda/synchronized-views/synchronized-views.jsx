import { Eventcalendar, getJson, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './synchronized-views.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [mySelectedDate, setSelectedDate] = useState(new Date());
  const [myEvents, setEvents] = useState([]);

  const monthView = useMemo(() => ({ calendar: { popover: false, labels: false } }), []);
  const dayView = useMemo(() => ({ agenda: { type: 'day' } }), []);

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
    <div className="mbsc-grid md-demo-synchronized-views">
      <div className="mbsc-row mbsc-no-padding">
        <div className="mbsc-col-md-4 mbsc-col-12">
          <div>
            <Eventcalendar view={monthView} data={myEvents} selectedDate={mySelectedDate} onSelectedDateChange={handleDateChange} />
          </div>
        </div>
        <div className="mbsc-col-md-8 mbsc-col-12 md-col-right">
          <Eventcalendar view={dayView} data={myEvents} selectedDate={mySelectedDate} onSelectedDateChange={handleDateChange} />
        </div>
      </div>
    </div>
  );
}

export default App;
