import { Datepicker, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <div>
      <Datepicker display="inline" calendarScroll="horizontal" showWeekNumbers={true} showOuterDays={true} />
    </div>
  );
}

export default App;
