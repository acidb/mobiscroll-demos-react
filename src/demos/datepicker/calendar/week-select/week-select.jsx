import { Datepicker, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <div>
      <Datepicker display="inline" select="preset-range" firstSelectDay={1} selectSize={14} />
    </div>
  );
}

export default App;
