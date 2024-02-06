import { Datepicker, Page, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <Page>
      <Datepicker controls={['date']} display="inline" />
      <Datepicker
        controls={['date']}
        display="anchored"
        label="Anchored"
        labelStyle="stacked"
        inputStyle="outline"
        placeholder="Please Select..."
      />
      <Datepicker controls={['date']} display="top" label="Top" labelStyle="stacked" inputStyle="outline" placeholder="Please Select..." />
      <Datepicker
        controls={['date']}
        display="bottom"
        label="Bottom"
        labelStyle="stacked"
        inputStyle="outline"
        placeholder="Please Select..."
      />
      <Datepicker
        controls={['date']}
        display="center"
        label="Center"
        labelStyle="stacked"
        inputStyle="outline"
        placeholder="Please Select..."
      />
    </Page>
  );
}

export default App;
