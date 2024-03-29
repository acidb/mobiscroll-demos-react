import { Button, Select, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useMemo, useRef, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [customSelected, setCustomSelected] = useState();
  const selectRef = useRef();

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
    ],
    [],
  );

  const customButtons = useMemo(
    () => [
      {
        text: 'Custom',
        handler: () => {
          selectRef.current.setTempVal('chi');
        },
      },
      'set',
      'cancel',
    ],
    [],
  );

  const inputProps = useMemo(
    () => ({
      inputStyle: 'outline',
      labelStyle: 'stacked',
      placeholder: 'Please select...',
    }),
    [],
  );

  const setBoston = useCallback(() => {
    setCustomSelected('bos');
  }, []);

  const setLondon = useCallback(() => {
    setCustomSelected('lon');
  }, []);

  return (
    <>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Controlling the default value</div>
        <Select data={myData} label="Default" inputProps={inputProps} />
        <Select data={myData} label="Custom default" inputProps={inputProps} defaultSelection="ber" />
      </div>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Setting a custom value</div>
        <div className="mbsc-button-group-block">
          <Button onClick={setBoston}>Boston</Button>
          <Button onClick={setLondon}>London</Button>
        </div>
        <Select data={myData} display="inline" value={customSelected} />
      </div>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Buttons API</div>
        <Select data={myData} ref={selectRef} label="Custom" inputProps={inputProps} buttons={customButtons} />
        <Select data={myData} label="Auto set" inputProps={inputProps} buttons={['cancel']} />
      </div>
    </>
  );
}

export default App;
