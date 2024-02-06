import { Datepicker, hijriCalendar, jalaliCalendar, localeAr, localeFa, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // themeJs
});

function App() {
  return (
    <div>
      <Datepicker controls={['date']} display="inline" />
      <Datepicker controls={['date']} display="inline" calendarSystem={jalaliCalendar} locale={localeFa} />
      <Datepicker controls={['date']} display="inline" calendarSystem={hijriCalendar} locale={localeAr} />
    </div>
  );
}

export default App;
