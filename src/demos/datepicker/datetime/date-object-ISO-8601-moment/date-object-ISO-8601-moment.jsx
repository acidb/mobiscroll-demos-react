import { Button, Datepicker, Page, setOptions /* localeImport */ } from '@mobiscroll/react';
import moment from 'moment';
import { useCallback, useMemo, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [dateObj, setDateObj] = useState();
  const [iso, setISO] = useState();
  const [momentObj, setMomentObj] = useState();

  const objString = useMemo(() => (dateObj ? dateObj.toString() : null), [dateObj]);
  const momentString = useMemo(() => (momentObj ? momentObj.toString() : null), [momentObj]);

  const setCustomObj = useCallback(() => {
    setDateObj(new Date(2020, 10, 15, 10, 45));
  }, []);

  const setCustomMoment = useCallback(() => {
    setMomentObj(moment([2020, 2, 6, 15, 30]));
  }, []);

  const setCustomISO = useCallback(() => {
    setISO('2020-05-20T12:30:00');
  }, []);

  const handleObjChange = useCallback((ev) => {
    setDateObj(ev.value);
  }, []);

  const handleIsoChange = useCallback((ev) => {
    setISO(ev.value);
  }, []);

  const handleMomentChange = useCallback((ev) => {
    setMomentObj(ev.value);
  }, []);

  return (
    <Page>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Working with Js Date Objects</div>
        <div className="mbsc-button-group-block">
          <Button onClick={setCustomObj}>Set: Sun Nov 15 2020 10:45:00 GMT</Button>
        </div>
        <Datepicker
          controls={['date']}
          value={dateObj}
          onChange={handleObjChange}
          inputStyle="outline"
          label="Date object"
          labelStyle="stacked"
        />
      </div>
      <div className="mbsc-padding">Return value: {objString}</div>

      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Working with Date strings</div>
        <div className="mbsc-button-group-block">
          <Button onClick={setCustomISO}>Set: 2020-05-20T12:30:00</Button>
        </div>
        <Datepicker
          controls={['date']}
          returnFormat="iso8601"
          value={iso}
          onChange={handleIsoChange}
          inputStyle="outline"
          label="ISO string"
          labelStyle="stacked"
        />
      </div>
      <div className="mbsc-padding">Return value: {iso}</div>

      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Working with Moment JS Objects</div>
        <div className="mbsc-button-group-block">
          <Button onClick={setCustomMoment}>Set: 2020-03-06T15:30:00</Button>
        </div>
        <Datepicker
          controls={['date']}
          returnFormat="moment"
          value={momentObj}
          onChange={handleMomentChange}
          inputStyle="outline"
          label="Moment JS"
          labelStyle="stacked"
        />
      </div>
      <div className="mbsc-padding">Return value: {momentString}</div>
    </Page>
  );
}

export default App;
