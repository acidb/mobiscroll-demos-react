import { Eventcalendar, getJson, Page, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useEffect, useMemo, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);

  const allLabelsView = useMemo(() => ({ calendar: { type: 'month', labels: 'all' } }), []);
  const nrLabelsView = useMemo(() => ({ calendar: { type: 'month', labels: 3 } }), []);
  const fitLabelsView = useMemo(() => ({ calendar: { labels: true } }), []);
  const allLabelsWeekView = useMemo(() => ({ calendar: { type: 'week', labels: 'all' } }), []);
  const nrLabelsWeekView = useMemo(() => ({ calendar: { type: 'week', labels: 3 } }), []);
  const fitLabelsWeekView = useMemo(() => ({ calendar: { type: 'week', labels: true } }), []);

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
              <div className="mbsc-form-group-title">All labels</div>
              <Eventcalendar data={myEvents} view={allLabelsView} />
            </div>
          </div>
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Up to 3 labels</div>
              <Eventcalendar data={myEvents} view={nrLabelsView} />
            </div>
          </div>
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Labels fitting the row</div>
              <Eventcalendar data={myEvents} view={fitLabelsView} />
            </div>
          </div>
        </div>
        <div className="mbsc-row">
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">All labels</div>
              <Eventcalendar data={myEvents} view={allLabelsWeekView} />
            </div>
          </div>
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Up to 3 labels</div>
              <Eventcalendar data={myEvents} view={nrLabelsWeekView} />
            </div>
          </div>
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Labels fitting the row</div>
              <Eventcalendar data={myEvents} view={fitLabelsWeekView} />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default App;
