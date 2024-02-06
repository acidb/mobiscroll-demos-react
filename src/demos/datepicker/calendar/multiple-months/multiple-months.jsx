import { Datepicker, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <div>
      <Datepicker display="inline" calendarType="month" pages={1} />
      <Datepicker display="inline" calendarType="month" pages={2} />
      <Datepicker display="inline" calendarType="month" pages={3} />
      <Datepicker display="inline" calendarType="month" pages="auto" />
    </div>
  );
}

export default App;
