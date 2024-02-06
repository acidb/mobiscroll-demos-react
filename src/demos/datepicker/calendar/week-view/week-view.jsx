import { Datepicker, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <div>
      <Datepicker display="inline" calendarType="week" calendarSize={1} />
      <Datepicker display="inline" calendarType="week" calendarSize={2} />
      <Datepicker display="inline" calendarType="week" calendarSize={3} />
    </div>
  );
}

export default App;
