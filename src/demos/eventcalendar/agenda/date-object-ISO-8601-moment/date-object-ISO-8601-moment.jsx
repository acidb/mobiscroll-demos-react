import { Button, Eventcalendar, Page, setOptions /* localeImport */ } from '@mobiscroll/react';
import moment from 'moment';
import { useCallback, useMemo, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [selectedDateObj, setSelectedDateObj] = useState(new Date(2020, 4, 19));
  const [selectedDateISO, setSelectedDateISO] = useState('2020-05-20');
  const [selectedDateMoment, setSelectedDateMoment] = useState(moment([2020, 4, 21]));

  const [dateObjEvents, setDateObjEvents] = useState([
    {
      start: new Date(2020, 4, 19, 7),
      end: new Date(2020, 4, 19, 8),
      title: 'General orientation',
      color: '#35bb5a',
    },
  ]);

  const [dateISOEvents, setDateISOEvents] = useState([
    {
      start: '2020-05-20T07:00:00',
      end: '2020-05-20T08:00:00',
      title: 'Clever Conference',
      color: '#a71111',
    },
  ]);

  const [dateMomentEvents, setDateMomentEvents] = useState([
    {
      start: moment([2020, 4, 21, 7]),
      end: moment([2020, 4, 21, 8]),
      title: 'Product team mtg.',
      color: '#913aa7',
    },
  ]);

  const myView = useMemo(() => ({ agenda: { type: 'month' } }), []);

  const addDateObjEvent = useCallback(() => {
    const newEvent = {
      start: new Date(2020, 4, 19, 10, 45),
      end: new Date(2020, 4, 19, 11, 45),
      text: 'New Event',
    };
    setDateObjEvents((dateObjData) => [...dateObjData, newEvent]);
    setSelectedDateObj(new Date(2020, 4, 19));
  }, []);

  const addDateISOEvent = useCallback(() => {
    const newEvent = {
      start: '2020-05-20T12:30:00',
      end: '2020-05-20T13:00:00',
      text: 'New Event',
    };
    setDateISOEvents((isoData) => [...isoData, newEvent]);
    setSelectedDateISO('2020-05-20');
  }, []);

  const addDateMomentEvent = useCallback(() => {
    const newEvent = {
      start: moment([2020, 4, 21, 11]),
      end: moment([2020, 4, 21, 14]),
      text: 'New Event',
    };
    setDateMomentEvents((momentData) => [...momentData, newEvent]);
    setSelectedDateMoment(moment([2020, 4, 21]));
  }, []);

  return (
    <Page>
      <div className="mbsc-grid">
        <div className="mbsc-row">
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Date object</div>
              <div className="mbsc-button-group-block">
                <Button onClick={addDateObjEvent}>
                  start: new Date(2020, 4, 19, 10, 45)
                  <br />
                  end: new Date(2020, 4, 19, 11, 45)
                </Button>
              </div>
              <Eventcalendar data={dateObjEvents} view={myView} selectedDate={selectedDateObj} />
            </div>
          </div>
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">ISO 8601 date string</div>
              <div className="mbsc-button-group-block">
                <Button onClick={addDateISOEvent}>
                  start: &apos;2020-05-20T12:30:00&apos;
                  <br />
                  end: &apos;2020-05-20T13:00:00&apos;
                </Button>
              </div>
              <Eventcalendar data={dateISOEvents} view={myView} selectedDate={selectedDateISO} />
            </div>
          </div>
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Moment.js object</div>
              <div className="mbsc-button-group-block">
                <Button onClick={addDateMomentEvent}>
                  start: moment([2020, 4, 21, 11])
                  <br />
                  end: moment([2020, 4, 21, 14])
                </Button>
              </div>
              <Eventcalendar data={dateMomentEvents} view={myView} selectedDate={selectedDateMoment} />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default App;
