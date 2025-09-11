import {
  Button,
  CalendarNext,
  CalendarPrev,
  CalendarToday,
  Datepicker,
  Eventcalendar,
  formatDate,
  getJson,
  setOptions /* localeImport */,
} from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './custom-range-view.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [myRefDate, setMyRefDate] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rangeVal, setRangeVal] = useState([]);
  const [buttonText, setButtonText] = useState([]);
  const [calView, setCalView] = useState({
    schedule: {
      type: 'day',
      size: 14,
    },
  });

  const startDate = useRef();
  const endDate = useRef();

  const buttonProps = useMemo(() => {
    const content = <span className="mbsc-calendar-title">{buttonText}</span>;
    return {
      children: content,
      className: 'mbsc-calendar-button',
      variant: 'flat',
    };
  }, [buttonText]);

  // Returns the number of days between two dates
  const getNrDays = useCallback(
    (start, end) => Math.round(Math.abs((end.setHours(0) - start.setHours(0)) / (24 * 60 * 60 * 1000))) + 1,
    [],
  );

  // Returns the formatted date
  const getFormattedRange = useCallback(
    (start, end) =>
      formatDate('MMM D, YYYY', new Date(start)) +
      (end && getNrDays(start, end) > 1 ? ' - ' + formatDate('MMM D, YYYY', new Date(end)) : ''),
    [getNrDays],
  );

  const handleChange = useCallback((args) => {
    const date = args.value;
    setRangeVal(date);
    if (date[0] && date[1]) {
      startDate.current = date[0];
      endDate.current = date[1];
    }
  }, []);

  const handleClose = useCallback(() => {
    if (startDate.current && endDate.current) {
      // Navigate the calendar
      setCurrentDate(startDate.current);
      // Set calendar view
      setMyRefDate(startDate.current);
      setCalView({
        schedule: {
          type: 'day',
          size: getNrDays(startDate.current, endDate.current),
        },
      });
    }
    setRangeVal([startDate.current, endDate.current]);
  }, [getNrDays]);

  const handlePageLoading = useCallback(
    (args) => {
      const sDate = args.firstDay;
      const end = args.lastDay;
      const eDate = new Date(end.getFullYear(), end.getMonth(), end.getDate() - 1, 0);
      startDate.current = sDate;
      endDate.current = eDate;
      setTimeout(() => {
        // Set button text
        setButtonText(getFormattedRange(sDate, eDate));
        // Set range value
        setRangeVal([sDate, eDate]);
        // Navigate the calendar
        setCurrentDate(sDate);
      });
    },
    [getFormattedRange],
  );

  const handleSelectedDateChange = useCallback(
    (event) => {
      setCurrentDate(event.date);
    },
    [setCurrentDate],
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

  const customWithNavButtons = () => (
    <>
      <div>
        <Datepicker
          select="range"
          display="anchored"
          showOverlay={false}
          touchUi={true}
          buttons={[]}
          inputComponent={Button}
          inputProps={buttonProps}
          onClose={handleClose}
          onChange={handleChange}
          value={rangeVal}
        />
      </div>
      <div className="md-custom-range-view-controls">
        <CalendarPrev />
        <CalendarToday />
        <CalendarNext />
      </div>
    </>
  );

  return (
    <Eventcalendar
      // drag
      selectedDate={currentDate}
      renderHeader={customWithNavButtons}
      view={calView}
      data={myEvents}
      onPageLoading={handlePageLoading}
      onSelectedDateChange={handleSelectedDateChange}
      refDate={myRefDate}
    />
  );
}

export default App;
