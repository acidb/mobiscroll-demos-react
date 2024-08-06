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

  const calView = useMemo(() => ({ schedule: { type: 'week' } }), []);
  const listView = useMemo(() => ({ agenda: { type: 'year', size: 5 } }), []);

  const handleInputChange = useCallback((ev) => {
    const searchText = ev.target.value;

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (searchText.length > 0) {
        getJson(
          'https://trial.mobiscroll.com/searchevents/?text=' + searchText,
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
        'https://trial.mobiscroll.com/searchevents/?start=' + start + '&end=' + end,
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
          {displayResults && <Eventcalendar data={listEvents} showControls={false} view={listView} onEventClick={handleEventClick} />}
        </div>
        <div className="mds-search-calendar mbsc-flex-1-1">
          <Eventcalendar
            clickToCreate={false}
            data={calEvents}
            dragToCreate={false}
            dragToMove={false}
            dragToResize={false}
            ref={calInst}
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
