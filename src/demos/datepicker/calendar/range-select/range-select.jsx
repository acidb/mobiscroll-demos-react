import { Datepicker, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <div>
      <Datepicker display="inline" select="range" showRangeLabels={true} />
    </div>
  );
}

export default App;
