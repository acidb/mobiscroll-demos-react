import { Datepicker, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <div>
      <Datepicker controls={['calendar']} select="range" display="inline" minRange={3} maxRange={10} />
      <Datepicker controls={['date']} select="range" display="inline" minRange={3} maxRange={10} />
    </div>
  );
}

export default App;
