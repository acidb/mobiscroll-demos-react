import { Datepicker, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <div>
      <Datepicker select="range" display="inline" calendarType="month" pages={2} showWeekNumbers={true} showOuterDays={true} />
      <Datepicker select="range" display="inline" calendarType="week" calendarSize={2} showWeekNumbers={true} calendarScroll="vertical" />
    </div>
  );
}

export default App;
