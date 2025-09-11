import { Datepicker, dayjsTimezone, setOptions /* localeImport */ } from '@mobiscroll/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useCallback, useState } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjsTimezone.dayjs = dayjs;

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [selected, setSelected] = useState(null);

  const selectedChange = useCallback((ev) => {
    setSelected(ev.value);
  }, []);

  return (
    <Datepicker
      select="range"
      value={selected}
      onChange={selectedChange}
      dataTimezone="utc"
      displayTimezone="local"
      timezonePlugin={dayjsTimezone}
      inputStyle="outline"
      label="Pick Date & Time"
      labelStyle="stacked"
    />
  );
}
export default App;
