import { Datepicker, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <div>
      <Datepicker
        controls={['datetime']}
        select="range"
        display="inline"
        showRangeLabels={true}
        rangeStartLabel="Outbound"
        rangeEndLabel="Return"
        minRange={3}
        maxRange={10}
      />
    </div>
  );
}

export default App;
