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
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [myEvents, setEvents] = useState([]);
  const [selectedResources, setSelectedResources] = useState({ 1: true });
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
      },
      {
        id: 2,
        name: 'Hortense',
        color: '#00aabb',
        img: 'https://img.mobiscroll.com/demos/f1.png',
      },
      {
        id: 3,
        name: 'Carl',
        color: '#ea72c0',
        img: 'https://img.mobiscroll.com/demos/m2.png',
      },
    ],
    [],
  );

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleChange = useCallback(
    (ev) => {
      const value = +ev.target.value;
      const checked = ev.target.checked;
      const resource = myResources.find((r) => r.id === value);

      selectedResources[value] = checked;

      setSelectedResources(selectedResources);
      setFilteredEvents(myEvents.filter((e) => selectedResources[e.resource]));
      setToastMessage((checked ? 'Showing ' : 'Hiding ') + (resource ? resource.name : '') + ' events');
      setToastOpen(true);
    },
    [myEvents, myResources, selectedResources],
  );

  const customHeader = useCallback(
    () => (
      <>
        <CalendarNav className="mds-header-filter-nav" />
        <div className="mds-header-filter mbsc-flex-1-0">
          <SegmentedGroup select="multiple">
            {myResources.map((res) => (
              <Segmented
                key={res.id}
                value={res.id}
                checked={selectedResources[res.id]}
                className={'mds-header-filter-' + res.id}
                onChange={handleChange}
              >
                <img className="mds-header-filter-img" src={res.img} alt={res.name} />
                <span className="mds-header-filter-name">{res.name}</span>
              </Segmented>
            ))}
          </SegmentedGroup>
        </div>
        <CalendarPrev className="md-header-filter-prev" />
        <CalendarToday />
        <CalendarNext className="md-header-filter-next" />
      </>
    ),
    [handleChange, myResources, selectedResources],
  );

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/filter-resource-events/',
      (events) => {
        setEvents(events);
        setFilteredEvents(events.filter((e) => e.resource === 1));
      },
      'jsonp',
    );
  }, []);

  return (
    <>
      <Eventcalendar data={filteredEvents} renderHeader={customHeader} resources={myResources} view={myView} />
      <Toast message={toastMessage} isOpen={isToastOpen} onClose={handleToastClose} />
    </>
  );
}

export default App;
