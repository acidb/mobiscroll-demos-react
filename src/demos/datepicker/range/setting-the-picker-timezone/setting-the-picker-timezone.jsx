import { Datepicker, momentTimezone, setOptions /* localeImport */ } from '@mobiscroll/react';
import moment from 'moment-timezone';
import { useCallback, useState } from 'react';

momentTimezone.moment = moment;

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
      timezonePlugin={momentTimezone}
      inputStyle="outline"
      label="Pick Date & Time"
      labelStyle="stacked"
    />
  );
}
export default App;
