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
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState();

  const myView = useMemo(() => ({ agenda: { type: 'month' } }), []);

  const myResources = useMemo(
    () => [
      {
        id: 1,
        name: 'Barry',
        color: '#328e39',
        img: 'https://img.mobiscroll.com/demos/m1.png',
        checked: true,
      },
      {
        id: 2,
        name: 'Hortense',
        color: '#00aabb',
        img: 'https://img.mobiscroll.com/demos/f1.png',
        checked: false,
      },
      {
        id: 3,
        name: 'Carl',
        color: '#ea72c0',
        img: 'https://img.mobiscroll.com/demos/m2.png',
        checked: false,
      },
    ],
    [],
  );

  const handleCloseToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  const filterEvents = useCallback((events, selected) => {
    setFilteredEvents(events.filter((item) => selected[item.resource]));
  }, []);

  const filter = useCallback(
    (ev) => {
      const value = ev.target.value;
      const checked = ev.target.checked;

      selected[value] = checked;

      filterEvents(events, selected);

      setSelected(selected);
      setToastMessage(
        (checked ? 'Showing ' : 'Hiding ') + document.querySelector('.md-header-filter-name-' + value).textContent + ' events',
      );
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
            {myResources.map((res) => (
              <Segmented key={res.id} value={res.id} checked={selected[res.id]} onChange={filter}>
                <img className="md-header-filter-img" src={res.img} alt={res.name} />
                <span className={'md-header-filter-name md-header-filter-name-' + res.id}>{res.name}</span>
              </Segmented>
            ))}
          </SegmentedGroup>
        </div>
        <CalendarPrev className="md-header-filter-prev" />
        <CalendarToday />
        <CalendarNext className="md-header-filter-next" />
      </>
    ),
    [filter, myResources, selected],
  );

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/filter-resource-events/',
      (events) => {
        setEvents(events);
        filterEvents(events, { 1: true });
      },
      'jsonp',
    );
  }, [filterEvents]);

  return (
    <>
      <Eventcalendar
        renderHeader={customWithNavButtons}
        view={myView}
        resources={myResources}
        data={filteredEvents}
        cssClass="md-custom-header-filtering"
      />
      <Toast message={toastMessage} isOpen={isToastOpen} onClose={handleCloseToast} />
    </>
  );
}

export default App;
