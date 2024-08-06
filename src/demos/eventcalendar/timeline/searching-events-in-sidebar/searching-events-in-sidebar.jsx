import { Eventcalendar, formatDate, getJson, Input, Page, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useMemo, useRef, useState } from 'react';
import './searching-events-in-sidebar.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [calEvents, setCalEvents] = useState([]);
  const [listEvents, setListEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [displayResults, setDisplayResults] = useState(false);

  const calInst = useRef();
  const timer = useRef(null);

  const calView = useMemo(() => ({ timeline: { type: 'month', eventList: true } }), []);
  const listView = useMemo(() => ({ agenda: { type: 'year', size: 5 } }), []);

  const myResources = useMemo(
    () => [
      { id: 1, name: 'Resource 1', color: '#fdf500' },
      { id: 2, name: 'Resource 2', color: '#ff4600' },
      { id: 3, name: 'Resource 3', color: '#ff0101' },
      { id: 4, name: 'Resource 4', color: '#239a21' },
      { id: 5, name: 'Resource 5', color: '#8f1ed6' },
      { id: 6, name: 'Resource 6', color: '#01adff' },
    ],
    [],
  );

  const handleInputChange = useCallback((ev) => {
    const searchText = ev.target.value;

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (searchText.length > 0) {
        getJson(
          'https://trial.mobiscroll.com/searchevents-timeline/?text=' + searchText,
          (data) => {
            setListEvents(data);
            setDisplayResults(true);
          },
          'jsonp',
        );
      } else {
        setDisplayResults(false);
      }
    }, 200);
  }, []);

  const handlePageLoading = useCallback((args) => {
    const start = formatDate('YYYY-MM-DD', args.viewStart);
    const end = formatDate('YYYY-MM-DD', args.viewEnd);

    setTimeout(() => {
      getJson(
        'https://trial.mobiscroll.com/searchevents-timeline/?start=' + start + '&end=' + end,
        (data) => {
          setCalEvents(data);
        },
        'jsonp',
      );
    });
  }, []);

  const handleEventClick = useCallback((args) => {
    setSelectedEvent([args.event]);
    calInst.current.navigateToEvent(args.event);
  }, []);

  return (
    <Page className="mds-full-height">
      <div className="mds-full-height mbsc-flex">
        <div className="mds-search-sidebar mbsc-flex-col mbsc-flex-none">
          <Input
            autoComplete="off"
            startIcon="material-search"
            onChange={handleInputChange}
            inputStyle="outline"
            placeholder="Search events"
          />
          {displayResults && (
            <Eventcalendar data={listEvents} resources={myResources} showControls={false} view={listView} onEventClick={handleEventClick} />
          )}
        </div>
        <div className="mds-search-calendar mbsc-flex-1-1">
          <Eventcalendar
            clickToCreate={false}
            data={calEvents}
            dragToCreate={false}
            dragToMove={false}
            dragToResize={false}
            ref={calInst}
            resources={myResources}
            selectedEvents={selectedEvent}
            selectMultipleEvents={true}
            view={calView}
            onPageLoading={handlePageLoading}
          />
        </div>
      </div>
    </Page>
  );
}

export default App;
