import {
  Button,
  CalendarNav,
  CalendarToday,
  Eventcalendar,
  getJson,
  Segmented,
  SegmentedGroup,
  setOptions /* localeImport */,
} from '@mobiscroll/react';
import { useCallback, useEffect, useState } from 'react';
import './customizing-header.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [view, setView] = useState('calendar');
  const [myEvents, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calView, setCalView] = useState({ calendar: { labels: true } });

  const changeView = useCallback((event) => {
    let calendarView;
    switch (event.target.value) {
      case 'calendar':
        calendarView = {
          calendar: {
            labels: true,
          },
        };
        break;
      case 'schedule':
        calendarView = {
          schedule: {
            type: 'week',
          },
        };
        break;
    }
    setView(event.target.value);
    setCalView(calendarView);
  }, []);

  const handleSelectedDateChange = useCallback((event) => {
    setCurrentDate(event.date);
  }, []);

  const getFirstDayOfWeek = useCallback((d, prev) => {
    const day = d.getDay();
    const diff = d.getDate() - day + (prev ? -7 : 7);
    return new Date(d.setDate(diff));
  }, []);

  const navigatePage = useCallback(
    (prev) => {
      if (view == 'calendar') {
        const prevNextPage = new Date(currentDate.getFullYear(), currentDate.getMonth() + (prev ? -1 : 1), 1);
        setCurrentDate(prevNextPage);
      } else {
        const prevNextSunday = getFirstDayOfWeek(currentDate, prev);
        setCurrentDate(prevNextSunday);
      }
    },
    [view, currentDate, getFirstDayOfWeek],
  );

  const customWithNavButtons = useCallback(
    () => (
      <>
        <CalendarNav className="md-custom-header-nav" />
        <div className="md-custom-header-controls">
          <Button onClick={() => navigatePage(true)} icon="material-arrow-back" variant="flat" className="md-custom-header-button"></Button>
          <CalendarToday className="md-custom-header-today" />
          <Button
            onClick={() => navigatePage(false)}
            icon="material-arrow-forward"
            variant="flat"
            className="md-custom-header-button"
          ></Button>
        </div>
        <div className="md-custom-header-view">
          <SegmentedGroup value={view} onChange={changeView}>
            <Segmented value="calendar" icon="calendar" />
            <Segmented value="schedule" icon="material-list" />
          </SegmentedGroup>
        </div>
      </>
    ),
    [changeView, navigatePage, view],
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

  return (
    <Eventcalendar
      cssClass="md-custom-header"
      // drag
      onSelectedDateChange={handleSelectedDateChange}
      selectedDate={currentDate}
      renderHeader={customWithNavButtons}
      view={calView}
      data={myEvents}
    />
  );
}

export default App;
