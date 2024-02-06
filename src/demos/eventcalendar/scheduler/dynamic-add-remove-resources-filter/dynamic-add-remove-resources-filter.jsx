import { Checkbox, Eventcalendar, getJson, Page, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './dynamic-add-remove-resources-filter.css';

setOptions({
  // localeJs,
  // themeJs
});

const App = () => {
  const [myEvents, setEvents] = useState([]);
  const [myResources, setResources] = useState(resources);
  const [participants, setParticipants] = useState({ 1: true, 2: true, 3: true });

  const resources = useMemo(
    () => [
      {
        id: 1,
        name: 'Ryan',
        color: '#f7c4b4',
      },
      {
        id: 2,
        name: 'Kate',
        color: '#c6f1c9',
      },
      {
        id: 3,
        name: 'John',
        color: '#e8d0ef',
      },
    ],
    [],
  );

  const myView = useMemo(
    () => ({
      schedule: {
        type: 'week',
        allDay: false,
        startDay: 1,
        endDay: 5,
        startTime: '08:00',
        endTime: '17:00',
      },
    }),
    [],
  );

  const filter = useCallback(
    (ev) => {
      participants[+ev.target.value] = ev.target.checked;
      setParticipants({ ...participants });
      setResources(resources.filter((r) => participants[r.id]));
    },
    [participants, resources],
  );

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/resource-events-shared/',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <Page>
      <div className="mbsc-grid mbsc-no-padding">
        <div className="mbsc-row">
          <div className="mbsc-col-sm-9 external-event-calendar">
            <Eventcalendar
              data={myEvents}
              resources={myResources}
              view={myView}
              clickToCreate={true}
              dragToCreate={true}
              dragToMove={true}
              dragToResize={true}
            />
          </div>
          <div className="mbsc-col-sm-3">
            <div className="mbsc-form-group-title">Show available tasks</div>
            <Checkbox checked={participants[1]} onChange={filter} value="1" label="Ryan" />
            <Checkbox checked={participants[2]} onChange={filter} value="2" label="Kate" />
            <Checkbox checked={participants[3]} onChange={filter} value="3" label="John" />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default App;
