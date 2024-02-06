import { getJson, Select, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useState } from 'react';
import './country-picker.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myData, setMyData] = useState([]);

  const renderCustomItem = useCallback(
    (item) => (
      <div className="md-country-picker-item">
        <img className="md-country-picker-flag" src={'https://img.mobiscroll.com/demos/flags/' + item.data.value + '.png'} alt="Flag" />
        {item.display}
      </div>
    ),
    [],
  );

  useEffect(() => {
    getJson('https://trial.mobiscroll.com/content/countries.json', (resp) => {
      setMyData(resp.map((country) => ({ text: country.text, value: country.value })));
    });
  }, []);

  return (
    <Select
      data={myData}
      display="anchored"
      inputStyle="outline"
      itemHeight={40}
      label="Countries"
      labelStyle="stacked"
      placeholder="Please select..."
      renderItem={renderCustomItem}
    />
  );
}

export default App;
