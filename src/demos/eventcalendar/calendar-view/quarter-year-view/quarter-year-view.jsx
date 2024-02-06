import {
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  CalendarToday,
  Eventcalendar,
  getJson,
  Segmented,
  SegmentedGroup,
  setOptions /* localeImport */,
} from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './quarter-year-view.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [calendarType, setCalendarType] = useState('quarter');
  const [myEvents, setEvents] = useState([]);

  const myView = useMemo(
    () => (calendarType === 'quarter' ? { calendar: { type: 'month', size: 3 } } : { calendar: { type: 'year' } }),
    [calendarType],
  );

  const calendarHeight = useMemo(() => (calendarType === 'quarter' ? 'auto' : '100%'), [calendarType]);

  const changeView = useCallback((event) => {
    setCalendarType(event.target.value);
  }, []);

  const calendarHeader = useCallback(
    () => (
      <>
        <CalendarNav />
        <div className="quarter-year-header-picker">
          <SegmentedGroup value={calendarType} onChange={changeView}>
            <Segmented value="quarter">Quarter</Segmented>
            <Segmented value="year">Year</Segmented>
          </SegmentedGroup>
        </div>
        <CalendarPrev />
        <CalendarToday />
        <CalendarNext />
      </>
    ),
    [calendarType, changeView],
  );

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/events/?vers=5',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return <Eventcalendar data={myEvents} view={myView} height={calendarHeight} renderHeader={calendarHeader} />;
}

export default App;
