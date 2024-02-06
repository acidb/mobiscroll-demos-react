import {
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  CalendarToday,
  Eventcalendar,
  formatDate,
  getJson,
  Input,
  Popup,
  setOptions /* localeImport */,
} from '@mobiscroll/react';
import { useCallback, useMemo, useRef, useState } from 'react';
import './searching-events-in-popup.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [calEvents, setCalEvents] = useState([]);
  const [listEvents, setListEvents] = useState([]);
  const [mySelectedEvent, setSelectedEvent] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchInput, setSearchInput] = useState(null);

  const timerRef = useRef(null);

  const calView = useMemo(() => ({ calendar: { labels: true } }), []);
  const listView = useMemo(() => ({ agenda: { type: 'year', size: 5 } }), []);

  const searchInputRef = useCallback((input) => {
    setSearchInput(input && input.nativeElement);
  }, []);

  const handleInputChange = useCallback((ev) => {
    const text = ev.target.value;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (text.length > 0) {
        getJson(
          'https://trial.mobiscroll.com/searchevents/?text=' + text,
          (data) => {
            setListEvents(data);
            setOpen(true);
          },
          'jsonp',
        );
      } else {
        setOpen(false);
      }
    }, 200);
  }, []);

  const handleInputFocus = useCallback((ev) => {
    if (ev.target.value.length > 0) {
      setOpen(true);
    }
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

  const handlePopupClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleEventClick = useCallback((args) => {
    setCurrentDate(args.event.start);
    setSelectedEvent([args.event]);
    setOpen(false);
  }, []);

  const myHeader = useCallback(
    () => (
      <>
        <CalendarNav />
        <div className="md-seach-header-bar mbsc-flex-1-0">
          <Input
            startIcon="material-search"
            ref={searchInputRef}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            inputStyle="box"
            placeholder="Search events"
          />
        </div>
        <CalendarPrev />
        <CalendarToday />
        <CalendarNext />
      </>
    ),
    [handleInputChange, handleInputFocus, searchInputRef],
  );

  return (
    <>
      <Eventcalendar
        className="md-search-events"
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        selectMultipleEvents={true}
        view={calView}
        data={calEvents}
        selectedEvents={mySelectedEvent}
        selectedDate={currentDate}
        renderHeader={myHeader}
        onPageLoading={handlePageLoading}
      />
      <Popup
        className="md-search-popup"
        display="anchored"
        showArrow={false}
        showOverlay={false}
        scrollLock={false}
        contentPadding={false}
        focusOnOpen={false}
        focusOnClose={false}
        anchor={searchInput}
        focusElm={searchInput}
        isOpen={isOpen}
        onClose={handlePopupClose}
      >
        <Eventcalendar
          className="mbsc-popover-list"
          view={listView}
          data={listEvents}
          showControls={false}
          onEventClick={handleEventClick}
        />
      </Popup>
    </>
  );
}

export default App;
