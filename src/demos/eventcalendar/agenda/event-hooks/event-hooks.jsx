import { Eventcalendar, getJson, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);

  const myView = useMemo(() => ({ agenda: { type: 'month' } }), []);

  const handleDestroy = useCallback(() => {
    // Logic running on component destroy
    console.log('onDestroy');
  }, []);

  const handleEventClick = useCallback((args) => {
    // Logic for event click
    console.log('onEventClick', args);
  }, []);

  const handleEventDoubleClick = useCallback((args) => {
    // Logic for event double click
    console.log('onEventDoubleClick', args);
  }, []);

  const handleEventHoverIn = useCallback((args) => {
    // Logic for event hover in
    console.log('onEventHoverIn', args);
  }, []);

  const handleEventHoverOut = useCallback((args) => {
    // Logic for event hover out
    console.log('onEventHoverOut', args);
  }, []);

  const handleEventRightClick = useCallback((args) => {
    // Logic for event right click
    console.log('onEventRightClick', args);
  }, []);

  const handleInit = useCallback(() => {
    // Logic running on component init
    console.log('onInit');
  }, []);

  const handlePageChange = useCallback((args) => {
    // Logic running on calendar page change
    console.log('onPageChange', args);
  }, []);

  const handlePageLoaded = useCallback((args) => {
    // Use it to inject custom markup & attach custom listeners
    console.log('onPageLoaded', args);
  }, []);

  const handlePageLoading = useCallback((args) => {
    // Use it to load data on demand
    console.log('onPageLoading', args);
  }, []);

  const handleSelectedDateChange = useCallback((args) => {
    // Use it to keep track of the selected date
    console.log('onSelectedDateChange', args);
  }, []);

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
      data={myEvents}
      view={myView}
      onDestroy={handleDestroy}
      onEventClick={handleEventClick}
      onEventDoubleClick={handleEventDoubleClick}
      onEventHoverIn={handleEventHoverIn}
      onEventHoverOut={handleEventHoverOut}
      onEventRightClick={handleEventRightClick}
      onInit={handleInit}
      onPageChange={handlePageChange}
      onPageLoaded={handlePageLoaded}
      onPageLoading={handlePageLoading}
      onSelectedDateChange={handleSelectedDateChange}
    />
  );
}

export default App;
