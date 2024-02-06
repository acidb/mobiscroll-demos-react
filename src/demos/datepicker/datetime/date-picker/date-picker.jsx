import { Datepicker, Page, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <Page>
      <Datepicker controls={['date']} label="Date picker" labelStyle="stacked" inputStyle="outline" placeholder="Please Select..." />
      <Datepicker
        controls={['date']}
        dateFormat="MM/YYYY"
        dateWheels="MMMM YYYY"
        label="Month & year picker"
        labelStyle="stacked"
        inputStyle="outline"
        placeholder="Please Select..."
      />
    </Page>
  );
}

export default App;
