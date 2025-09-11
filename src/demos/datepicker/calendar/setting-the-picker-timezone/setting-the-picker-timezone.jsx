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

  const handleChange = useCallback((ev) => {
    setSelected(ev.value);
  }, []);

  return (
    <Datepicker
      controls={['calendar', 'time']}
      value={selected}
      onChange={handleChange}
      dataTimezone="utc"
      displayTimezone="local"
      inputStyle="outline"
      label="Pick date & time"
      labelStyle="stacked"
      timezonePlugin={dayjsTimezone}
    />
  );
}
export default App;
