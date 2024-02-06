import { Datepicker, hijriCalendar, jalaliCalendar, localeAr, localeFa, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // themeJs
});

function App() {
  return (
    <div>
      <Datepicker display="inline" />
      <Datepicker display="inline" calendarSystem={jalaliCalendar} locale={localeFa} />
      <Datepicker display="inline" calendarSystem={hijriCalendar} locale={localeAr} />
    </div>
  );
}

export default App;
