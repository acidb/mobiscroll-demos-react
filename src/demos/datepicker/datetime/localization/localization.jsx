import { Datepicker, localeEs, setOptions } from '@mobiscroll/react';

setOptions({
  // themeJs
});

function App() {
  return (
    <div>
      <Datepicker controls={['date']} display="inline" locale={localeEs} />
    </div>
  );
}

export default App;
