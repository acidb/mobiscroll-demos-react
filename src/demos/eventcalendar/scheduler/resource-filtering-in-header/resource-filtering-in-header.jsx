import {
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  CalendarToday,
  Eventcalendar,
  getJson,
  Segmented,
  SegmentedGroup,
  setOptions,
  Toast /* localeImport */,
} from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './resource-filtering-in-header.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [selected, setSelected] = useState({ 1: true });
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [toastText, setToastText] = useState();
  const [isToastOpen, setToastOpen] = useState(false);

  const handleCloseToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  const filterEvents = useCallback((events, selected) => {
    let ev = [];
    for (let i = 0; i < events.length; ++i) {
      const item = events[i];
      if (selected[item.participant]) {
        if (item.participant == 1) {
          item.color = '#328e39';
        } else if (item.participant == 2) {
          item.color = '#00aabb';
        } else if (item.participant == 3) {
          item.color = '#ea72c0';
        }
        ev.push(item);
      }
    }

    setFilteredEvents(ev);
  }, []);

  const calView = useMemo(
    () => ({
      schedule: { type: 'week' },
    }),
    [],
  );

  const filter = useCallback(
    (ev) => {
      const value = ev.target.value;
      const checked = ev.target.checked;

      selected[value] = checked;

      setSelected(selected);

      filterEvents(events, selected);

      setToastText((checked ? 'Showing ' : 'Hiding ') + document.querySelector('.md-header-filter-name-' + value).textContent + ' events');
      setToastOpen(true);
    },
    [events, filterEvents, selected],
  );

  const customWithNavButtons = useCallback(
    () => (
      <>
        <CalendarNav className="md-header-filter-nav" />
        <div className="md-header-filter-controls">
          <SegmentedGroup select="multiple">
            <Segmented value={1} checked={selected[1]} onChange={filter}>
              <img className="md-header-filter-img" src="https://img.mobiscroll.com/demos/m1.png" />
              <span className="md-header-filter-name md-header-filter-name-1">Barry</span>
            </Segmented>
            <Segmented value={2} checked={selected[2]} onChange={filter}>
              <img className="md-header-filter-img" src="https://img.mobiscroll.com/demos/f1.png" />
              <span className="md-header-filter-name md-header-filter-name-2">Hortense</span>
            </Segmented>
            <Segmented value={3} checked={selected[3]} onChange={filter}>
              <img className="md-header-filter-img" src="https://img.mobiscroll.com/demos/m2.png" />
              <span className="md-header-filter-name md-header-filter-name-3">Carl</span>
            </Segmented>
          </SegmentedGroup>
        </div>
        <CalendarPrev className="md-header-filter-prev" />
        <CalendarToday className="md-header-filter-today" />
        <CalendarNext className="md-header-filter-next" />
      </>
    ),
    [filter, selected],
  );

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/custom-events/',
      (events) => {
        setEvents(events);
        filterEvents(events, selected);
      },
      'jsonp',
    );
  }, [filterEvents, selected]);

  return (
    <div>
      <Eventcalendar
        // drag
        renderHeader={customWithNavButtons}
        view={calView}
        data={filteredEvents}
        cssClass="md-custom-header-filtering"
      />
      <Toast message={toastText} isOpen={isToastOpen} onClose={handleCloseToast} />
    </div>
  );
}

export default App;
