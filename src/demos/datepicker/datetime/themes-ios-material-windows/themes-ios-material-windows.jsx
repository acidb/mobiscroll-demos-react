import { Datepicker, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs
});

function App() {
  return (
    <div>
      <Datepicker
        controls={['date']}
        display="inline"
        theme="material" // Can be 'ios', 'material', 'windows' or 'auto' - in case of 'auto', the theme will automatically be set based on the platform
        themeVariant="dark" // Can be 'light', 'dark' or 'auto' - in case of 'auto' it is set based in the active system theme
      />
    </div>
  );
}

export default App;
