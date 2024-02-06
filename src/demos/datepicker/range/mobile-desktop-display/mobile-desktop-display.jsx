import { Datepicker, Page, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  return (
    <Page>
      <Datepicker select="range" display="inline" />
      <Datepicker
        select="range"
        display="anchored"
        label="Anchored"
        labelStyle="stacked"
        inputStyle="outline"
        placeholder="Please Select..."
      />
      <Datepicker select="range" display="top" label="Top" labelStyle="stacked" inputStyle="outline" placeholder="Please Select..." />
      <Datepicker select="range" display="bottom" label="Bottom" labelStyle="stacked" inputStyle="outline" placeholder="Please Select..." />
      <Datepicker select="range" display="center" label="Center" labelStyle="stacked" inputStyle="outline" placeholder="Please Select..." />
    </Page>
  );
}

export default App;
