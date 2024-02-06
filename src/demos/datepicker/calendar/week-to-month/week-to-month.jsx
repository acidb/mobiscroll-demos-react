import {
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  Datepicker,
  Segmented,
  SegmentedGroup,
  setOptions /* localeImport */,
} from '@mobiscroll/react';
import { useCallback, useState } from 'react';
import './week-to-month.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [calendarType, setCalendarType] = useState('week');

  const handleChange = useCallback((event) => {
    setCalendarType(event.target.value);
  }, []);

  const calendarHeaderSwitch = useCallback(
    () => (
      <>
        <CalendarNav className="custom-view-nav" />
        <div className="custom-view">
          <SegmentedGroup value={calendarType} onChange={handleChange}>
            <Segmented value="week" icon="material-date-range" />
            <Segmented value="month" icon="material-event-note" />
          </SegmentedGroup>
        </div>
        <CalendarPrev />
        <CalendarNext />
      </>
    ),
    [calendarType, handleChange],
  );

  return (
    <div>
      <Datepicker display="inline" calendarType={calendarType} calendarSize={1} renderCalendarHeader={calendarHeaderSwitch} />
    </div>
  );
}

export default App;
