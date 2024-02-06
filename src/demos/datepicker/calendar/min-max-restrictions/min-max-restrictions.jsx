import { Datepicker, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <div>
      <Datepicker display="inline" min="1920-01-01" max="2050-01-01" />
      <Datepicker controls={['calendar', 'time']} display="inline" min="2000-01-01T12:00" max="2050-01-01T12:00" />
    </div>
  );
}

export default App;
