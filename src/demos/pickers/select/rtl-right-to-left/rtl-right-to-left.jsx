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
      },
      {
        text: 'London',
        value: 'lon',
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

  return (
    <Select
      data={myData}
      label="Select"
      rtl={true}
      display="bottom"
      inputStyle="outline"
      labelStyle="stacked"
      placeholder="Please select..."
    />
  );
}

export default App;
