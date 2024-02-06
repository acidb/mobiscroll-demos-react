import { Select, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useMemo } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const myResponsive = useMemo(
    () => ({
      xsmall: {
        display: 'bottom',
      },
      small: {
        display: 'anchored',
      },
      custom: {
        // Custom breakpoint
        breakpoint: 800,
        display: 'anchored',
        touchUi: false,
      },
    }),
    [],
  );

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
      responsive={myResponsive}
      label="Select"
      labelStyle="stacked"
      inputStyle="outline"
      placeholder="Please select..."
    />
  );
}

export default App;
