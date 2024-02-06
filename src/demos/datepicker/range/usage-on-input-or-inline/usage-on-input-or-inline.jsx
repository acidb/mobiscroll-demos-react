import { Datepicker, Input, Page, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useMemo, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [start, startRef] = useState(null);
  const [end, endRef] = useState(null);

  const inputProps = useMemo(
    () => ({
      placeholder: 'Please Select...',
    }),
    [],
  );

  const boxInputProps = useMemo(
    () => ({
      label: 'Range',
      labelStyle: 'stacked',
      inputStyle: 'outline',
      placeholder: 'Please Select...',
    }),
    [],
  );

  return (
    <Page>
      <Datepicker select="range" inputComponent="input" inputProps={inputProps} />
      <Datepicker select="range" inputProps={boxInputProps} />
      <div className="mbsc-grid mbsc-no-padding">
        <div className="mbsc-row">
          <div className="mbsc-col-6">
            <Input ref={startRef} label="Start" labelStyle="stacked" inputStyle="outline" placeholder="Please Select..."></Input>
          </div>
          <div className="mbsc-col-6">
            <Input ref={endRef} label="End" labelStyle="stacked" inputStyle="outline" placeholder="Please Select..."></Input>
          </div>
        </div>
      </div>
      <Datepicker select="range" startInput={start} endInput={end} />
      <Datepicker select="range" display="inline" />
    </Page>
  );
}

export default App;
