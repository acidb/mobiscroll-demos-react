import { Eventcalendar, getJson, Page, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useEffect, useMemo, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);

  const oneWeekView = useMemo(() => ({ calendar: { type: 'week' } }), []);
  const twoWeekView = useMemo(() => ({ calendar: { type: 'week', size: 2 } }), []);
  const threeWeekView = useMemo(() => ({ calendar: { type: 'week', size: 3 } }), []);

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
      <div className="mbsc-grid">
        <div className="mbsc-row">
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">One week view</div>
              <Eventcalendar view={oneWeekView} data={myEvents} />
            </div>
          </div>
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Two week view</div>
              <Eventcalendar view={twoWeekView} data={myEvents} />
            </div>
          </div>
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Three week view</div>
              <Eventcalendar
                // drag
                view={threeWeekView}
                data={myEvents}
              />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default App;
