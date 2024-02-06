import { Datepicker, Page, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <Page>
      <Datepicker
        controls={['calendar']}
        select="range"
        label="Calendar"
        labelStyle="stacked"
        inputStyle="outline"
        placeholder="Please Select..."
      />
      <Datepicker
        controls={['date']}
        select="range"
        label="Date"
        labelStyle="stacked"
        inputStyle="outline"
        placeholder="Please Select..."
      />
      <Datepicker
        controls={['datetime']}
        select="range"
        label="Date & Time"
        labelStyle="stacked"
        inputStyle="outline"
        placeholder="Please Select..."
      />
      <Datepicker
        controls={['calendar', 'time']}
        select="range"
        label="Calendar & Time"
        labelStyle="stacked"
        inputStyle="outline"
        placeholder="Please Select..."
      />
      <Datepicker
        controls={['time']}
        select="range"
        label="Time"
        labelStyle="stacked"
        inputStyle="outline"
        placeholder="Please Select..."
      />
    </Page>
  );
}

export default App;
