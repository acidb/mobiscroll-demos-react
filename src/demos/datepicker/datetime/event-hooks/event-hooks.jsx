import { Datepicker, Page, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <Page>
      <Datepicker
        controls={['date']}
        label="Date"
        labelStyle="stacked"
        inputStyle="box"
        placeholder="Please Select..."
        onCancel={() => {
          // Logic for cancel button click
        }}
        onChange={() => {
          // Logic for value change
        }}
        onClose={() => {
          // Your custom event handler goes here
        }}
        onDestroy={() => {
          // Your custom event handler goes here
        }}
        onInit={() => {
          // Logic running on component init
        }}
        onOpen={() => {
          // Your custom event handler goes here
        }}
        onPageChange={() => {
          // Your custom event handler goes here
        }}
        onPageLoaded={() => {
          // Use it to inject custom markup & attach custom listeners
        }}
        onPageLoading={() => {
          // Use it to load data on demand
        }}
        onPosition={() => {
          // Logic for component positioning
        }}
        onTempChange={() => {
          // Logic for temporary value change
        }}
      />
    </Page>
  );
}

export default App;
