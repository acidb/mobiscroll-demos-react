import { print } from '@mobiscroll/print';
import { Button, Eventcalendar, getJson, Page, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './printing-the-view.css';

const MY_MODULES = [print];

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [inst, setInst] = useState(null);
  const [myEvents, setEvents] = useState([]);

  const myView = useMemo(() => ({ agenda: { type: 'month' } }), []);

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
    <Page className="mds-full-height">
      <div className="mds-full-height mbsc-flex-col">
        <div className="mbsc-flex-none">
          <Button onClick={printView} startIcon="print">
            Print agenda
          </Button>
        </div>
        <div className="mds-overflow-hidden mbsc-flex-1-1">
          <Eventcalendar data={myEvents} modules={MY_MODULES} ref={setInst} view={myView} />
        </div>
      </div>
    </Page>
  );
}

export default App;
