import { Datepicker, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <div>
      <Datepicker display="inline" selectMultiple={true} />
      <Datepicker display="inline" selectMultiple={true} selectMax={5} headerText="Pick up to 5 days" />
      <Datepicker display="inline" selectMultiple={true} selectCounter={true} />
    </div>
  );
}

export default App;
