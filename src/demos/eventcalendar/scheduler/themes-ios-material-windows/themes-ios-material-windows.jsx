import { Eventcalendar, getJson, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useEffect, useMemo, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);

  const myView = useMemo(
    () => ({
      schedule: { type: 'week' },
    }),
    [],
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
      data={myEvents}
      view={myView}
      theme="material" // Can be 'ios', 'material', 'windows' or 'auto' - in case of 'auto', the theme will automatically be set based on the platform
      themeVariant="dark" // Can be 'light', 'dark' or 'auto' - in case of 'auto' it is set based in the active system theme
    />
  );
}

export default App;
