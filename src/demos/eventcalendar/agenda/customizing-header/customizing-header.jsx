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
  const [view, setView] = useState('agenda');
  const [myEvents, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calView, setCalView] = useState({ agenda: { type: 'month' } });

  const changeView = useCallback((event) => {
    let view;
    switch (event.target.value) {
      case 'calendar':
        view = {
          calendar: { labels: true },
        };
        break;
      case 'agenda':
        view = {
          agenda: { type: 'month' },
        };
        break;
    }

    setView(event.target.value);
    setCalView(view);
  }, []);

  const handleSelectedDateChange = useCallback((event) => {
    setCurrentDate(event.date);
  }, []);

  const navigateToPrevPage = useCallback(() => {
    const prevPage = new Date(currentDate);

    prevPage.setDate(1);
    prevPage.setMonth(prevPage.getMonth() - 1);
    setCurrentDate(prevPage);
  }, [currentDate]);

  const navigateToNextPage = useCallback(() => {
    const nextPage = new Date(currentDate);

    nextPage.setDate(1);
    nextPage.setMonth(nextPage.getMonth() + 1);
    setCurrentDate(nextPage);
  }, [currentDate]);

  const customWithNavButtons = useCallback(
    () => (
      <>
        <CalendarNav className="md-custom-header-nav" />
        <div className="md-custom-header-controls">
          <Button onClick={navigateToPrevPage} icon="material-arrow-back" variant="flat" className="md-custom-header-button"></Button>
          <CalendarToday className="md-custom-header-today" />
          <Button onClick={navigateToNextPage} icon="material-arrow-forward" variant="flat" className="md-custom-header-button"></Button>
        </div>
        <div className="md-custom-header-view">
          <SegmentedGroup value={view} onChange={changeView}>
            <Segmented value="agenda" icon="material-view-day" />
            <Segmented value="calendar" icon="calendar" />
          </SegmentedGroup>
        </div>
      </>
    ),
    [changeView, navigateToNextPage, navigateToPrevPage, view],
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
      onSelectedDateChange={handleSelectedDateChange}
      selectedDate={currentDate}
      renderHeader={customWithNavButtons}
      view={calView}
      data={myEvents}
    />
  );
}

export default App;
