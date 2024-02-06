import { Datepicker, Page, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

const currentWeek = ['dyndatetime(y,m,d)', 'dyndatetime(y,m,d+6)'];
const currentTime = ['dyndatetime(y,m,d,h)', 'dyndatetime(y,m,d,h+2)'];

function App() {
  const [rangeValue, setRangeValue] = useState(currentWeek);
  const [separatorValue, setSeparatorValue] = useState(currentWeek);
  const [monthValue, setMonthValue] = useState(currentWeek);
  const [dayValue, setDayValue] = useState(currentWeek);
  const [atomValue, setAtomValue] = useState(currentWeek);
  const [cookieValue, setCookieValue] = useState(currentWeek);
  const [timeValue, setTimeValue] = useState(currentTime);
  const [h12Value, setH12Value] = useState(currentTime);
  const [h24Value, setH24Value] = useState(currentTime);
  const [hmsValue, setHmsValue] = useState(currentTime);
  const [dateTimeValue, setDateTimeValue] = useState(currentTime);
  const [dayNameValue, setDayNameValue] = useState(currentTime);

  const changeRange = useCallback((args) => {
    setRangeValue(args.value);
  }, []);
  const changeSeparator = useCallback((args) => {
    setSeparatorValue(args.value);
  }, []);
  const changeMonth = useCallback((args) => {
    setMonthValue(args.value);
  }, []);
  const changeDay = useCallback((args) => {
    setDayValue(args.value);
  }, []);
  const changeAtom = useCallback((args) => {
    setAtomValue(args.value);
  }, []);
  const changeCookie = useCallback((args) => {
    setCookieValue(args.value);
  }, []);
  const changeTime = useCallback((args) => {
    setTimeValue(args.value);
  }, []);
  const changeH12 = useCallback((args) => {
    setH12Value(args.value);
  }, []);
  const changeH24 = useCallback((args) => {
    setH24Value(args.value);
  }, []);
  const changeHms = useCallback((args) => {
    setHmsValue(args.value);
  }, []);
  const changeDateTime = useCallback((args) => {
    setDateTimeValue(args.value);
  }, []);
  const changeDayName = useCallback((args) => {
    setDayNameValue(args.value);
  }, []);

  return (
    <Page>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Date</div>
        <Datepicker select="range" value={rangeValue} onChange={changeRange} label="Default" />
        <Datepicker select="range" value={separatorValue} onChange={changeSeparator} dateFormat="DD.MM.YYYY" label="Separator" />
        <Datepicker select="range" value={monthValue} onChange={changeMonth} dateFormat="D MMMM YYYY" label="Month name" />
        <Datepicker select="range" value={dayValue} onChange={changeDay} dateFormat="DDD DD MMM, YYYY" label="Day of week" />
        <Datepicker select="range" value={atomValue} onChange={changeAtom} dateFormat="YYYY-MM-DD" label="ATOM" />
        <Datepicker select="range" value={cookieValue} onChange={changeCookie} dateFormat="DDD, DD MMM YYYY" label="COOKIE" />
      </div>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Time</div>
        <Datepicker controls={['time']} select="range" value={timeValue} onChange={changeTime} label="Default time" />
        <Datepicker controls={['time']} select="range" value={h12Value} onChange={changeH12} timeFormat="hh:mm A" label="12h" />
        <Datepicker controls={['time']} select="range" value={h24Value} onChange={changeH24} timeFormat="HH:mm" label="24h" />
        <Datepicker controls={['time']} select="range" value={hmsValue} onChange={changeHms} timeFormat="HH:mm:ss" label="Hour, min, sec" />
      </div>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Date & time</div>
        <Datepicker
          controls={['calendar', 'time']}
          select="range"
          value={dateTimeValue}
          onChange={changeDateTime}
          label="Default date & time"
        />
        <Datepicker
          controls={['calendar', 'time']}
          select="range"
          value={dayNameValue}
          onChange={changeDayName}
          dateFormat="DDD D MMM, YYYY"
          timeFormat="H:mm"
          dateWheels="|DDD D MMM, YYYY|"
          label="Day name"
        />
      </div>
    </Page>
  );
}

export default App;
