import {
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  Eventcalendar,
  getJson,
  Segmented,
  SegmentedGroup,
  setOptions /* localeImport */,
} from '@mobiscroll/react';
import { useCallback, useEffect, useState } from 'react';
import './switching-day-week-month-view.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [view, setView] = useState('month');
  const [myEvents, setEvents] = useState([]);
  const [calView, setCalView] = useState({
    calendar: { type: 'month' },
    agenda: { type: 'month' },
  });

  const changeView = useCallback((event) => {
    let view;
    switch (event.target.value) {
      case 'month':
        view = {
          calendar: { type: 'month' },
          agenda: { type: 'month' },
        };
        break;
      case 'week':
        view = {
          calendar: { type: 'week' },
          agenda: { type: 'week' },
        };
        break;
      case 'day':
        view = {
          agenda: { type: 'day' },
        };
        break;
    }

    setView(event.target.value);
    setCalView(view);
  }, []);

  const customWithNavButtons = useCallback(
    () => (
      <>
        <CalendarNav className="cal-header-nav" />
        <div className="mbsc-flex mbsc-flex-1-0 mbsc-justify-content-center">
          <SegmentedGroup value={view} onChange={changeView}>
            <Segmented value="month" icon="material-event-note" />
            <Segmented value="week" icon="material-date-range" />
            <Segmented value="day" icon="material-view-day" />
          </SegmentedGroup>
        </div>
        <CalendarPrev className="cal-header-prev" />
        <CalendarNext className="cal-header-next" />
      </>
    ),
    [changeView, view],
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
    <div className="md-switching-view-cont">
      <Eventcalendar
        // drag
        renderHeader={customWithNavButtons}
        view={calView}
        data={myEvents}
      />
    </div>
  );
}

export default App;
