import { print } from '@mobiscroll/print';
import { Button, Eventcalendar, getJson, Page, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const MY_MODULES = [print];

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [inst, setInst] = useState(null);

  const myView = useMemo(
    () => ({
      scheduler: { type: 'week' },
    }),
    [],
  );

  const printView = useCallback(() => {
    inst.print();
  }, [inst]);

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
    <Page>
      <Button onClick={printView}>Print scheduler</Button>
      <Eventcalendar
        // drag
        data={myEvents}
        view={myView}
        ref={setInst}
        modules={MY_MODULES}
      />
    </Page>
  );
}

export default App;
