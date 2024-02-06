import { Datepicker, Page, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <Page>
      <Datepicker inputComponent="input" inputProps={{ placeholder: 'Please Select...' }} />
      <Datepicker inputStyle="outline" label="Date" labelStyle="stacked" placeholder="Please Select..." />
      <Datepicker display="inline" />
    </Page>
  );
}

export default App;
