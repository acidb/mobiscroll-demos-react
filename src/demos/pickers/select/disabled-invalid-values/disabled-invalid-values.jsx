import { Select, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useMemo } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const myData = useMemo(
    () => [
      {
        text: 'Atlanta',
        value: 'atl',
      },
      {
        text: 'Berlin',
        value: 'ber',
      },
      {
        text: 'Boston',
        value: 'bos',
      },
      {
        text: 'Chicago',
        value: 'chi',
        disabled: true,
      },
      {
        text: 'London',
        value: 'lon',
        disabled: true,
      },
      {
        text: 'Los Angeles',
        value: 'la',
      },
      {
        text: 'New York',
        value: 'ny',
      },
      {
        text: 'Paris',
        value: 'par',
      },
      {
        text: 'San Francisco',
        value: 'sf',
      },
    ],
    [],
  );

  return <Select data={myData} display="inline" />;
}

export default App;
