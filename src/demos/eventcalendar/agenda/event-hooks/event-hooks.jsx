import { Eventcalendar, getJson, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useEffect, useMemo, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);

  const myView = useMemo(() => ({ agenda: { type: 'month' } }), []);

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
      onDestroy={() => {
        // Your custom event handler goes here
      }}
      onEventClick={() => {
        // Logic for event click
      }}
      onEventDoubleClick={() => {
        // Logic for event double click
      }}
      onEventHoverIn={() => {
        // Logic for event hover in
      }}
      onEventHoverOut={() => {
        // Logic for event hover out
      }}
      onEventRightClick={() => {
        // Logic for event right click
      }}
      onInit={() => {
        // Logic running on component init
      }}
      onPageChange={() => {
        // Your custom event handler goes here
      }}
      onPageLoaded={() => {
        // Use it to inject custom markup & attach custom listeners
      }}
      onPageLoading={() => {
        // Use it to load data on demand
      }}
      onSelectedDateChange={() => {
        // Use it to keep track of the selected date externally
      }}
    />
  );
}

export default App;
