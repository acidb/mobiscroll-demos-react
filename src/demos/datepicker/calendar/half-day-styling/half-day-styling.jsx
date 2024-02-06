import { Datepicker, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useMemo } from 'react';
import './half-day-styling.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const myColors = useMemo(
    () => [
      { date: 'dyndatetime(y,m,12)', cellCssClass: 'check-in' },
      { date: 'dyndatetime(y,m,16)', cellCssClass: 'check-out' },
      { start: 'dyndatetime(y,m,13)', end: 'dyndatetime(y,m,15)', background: '#46c4f3' },
    ],
    [],
  );

  return (
    <div>
      <Datepicker display="inline" colors={myColors} />
    </div>
  );
}

export default App;
