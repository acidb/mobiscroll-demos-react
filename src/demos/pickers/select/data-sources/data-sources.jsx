import { getJson, Select, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useEffect, useMemo, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [remoteData, setRemoteData] = useState([]);

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

  useEffect(() => {
    getJson('https://trial.mobiscroll.com/content/languages.json', (resp) => {
      setRemoteData(resp);
    });
  }, []);

  return (
    <div className="mbsc-grid mbsc-form-grid">
      <div className="mbsc-row">
        <div className="mbsc-col-sm-12 mbsc-col-md-6">
          <Select data={myData} inputStyle="outline" label="Data object" labelStyle="stacked" />
        </div>
        <div className="mbsc-col-sm-12 mbsc-col-md-6">
          <Select data={remoteData} inputStyle="outline" label="Remote data" labelStyle="stacked" />
        </div>
      </div>
    </div>
  );
}

export default App;
