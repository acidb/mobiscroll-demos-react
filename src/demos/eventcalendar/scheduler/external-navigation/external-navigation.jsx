import { Datepicker, Eventcalendar, getJson, setOptions } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './external-navigation.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [mySelectedDate, setSelectedDate] = useState(new Date());
  const dayView = useMemo(() => ({ schedule: { type: 'day' } }), []);

  const handleDateChange = useCallback((args) => {
    setSelectedDate(args.value);
  }, []);

  const handleSelectedDateChange = useCallback((args) => {
    setSelectedDate(args.date);
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
    <div className="mds-external-nav-scheduler mbsc-flex">
      <div className="mds-external-nav-dp">
        <Datepicker display="inline" value={mySelectedDate} onChange={handleDateChange} />
      </div>
      <div className="mds-external-nav-ec mbsc-flex-1-1">
        <Eventcalendar data={myEvents} selectedDate={mySelectedDate} view={dayView} onSelectedDateChange={handleSelectedDateChange} />
      </div>
    </div>
  );
}

export default App;
