import { Datepicker, hijriCalendar, jalaliCalendar, localeAr, localeFa, setOptions } from '@mobiscroll/react';

setOptions({
  // themeJs
});

function App() {
  return (
    <div>
      <Datepicker select="range" display="inline" />
      <Datepicker select="range" display="inline" calendarSystem={jalaliCalendar} locale={localeFa} />
      <Datepicker select="range" display="inline" calendarSystem={hijriCalendar} locale={localeAr} />
    </div>
  );
}

export default App;
