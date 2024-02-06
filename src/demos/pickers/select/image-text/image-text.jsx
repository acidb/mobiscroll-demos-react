import { Select, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useMemo, useState } from 'react';

import './image-text.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myValue, setValue] = useState(['42976', '47883']);

  const myData = useMemo(
    () => [
      {
        text: 'Barry Lyon',
        value: '42976',
        avatar: 'm1',
      },
      {
        text: 'Hortense Tinker',
        value: '45290',
        avatar: 'f1',
      },
      {
        text: 'Carl Hambledon',
        value: '76208',
        avatar: 'm2',
      },
      {
        text: 'Arlene Sharman',
        value: '47883',
        avatar: 'f2',
      },
      {
        text: 'Keila Delores',
        value: '33379',
        avatar: 'f3',
      },
      {
        text: 'Paula Bush',
        value: '16076',
        avatar: 'f4',
      },
      {
        text: 'Gene Cortez',
        value: '62551',
        avatar: 'm3',
      },
      {
        text: 'Pete Nichols',
        value: '20929',
        avatar: 'm4',
      },
    ],
    [],
  );

  const renderCustomItem = useCallback(
    (item) => (
      <div className="md-image-text-item">
        <img className="md-image-text-avatar" src={'https://img.mobiscroll.com/demos/' + item.data.avatar + '.png'} alt="Cover" />
        <div className="md-image-text-name">{item.display}</div>
      </div>
    ),
    [],
  );

  const handleOnChange = useCallback((ev) => {
    setValue(ev.value);
  }, []);

  return (
    <Select
      data={myData}
      display="anchored"
      inputStyle="outline"
      itemHeight={50}
      label="Users"
      labelStyle="stacked"
      placeholder="Please select..."
      selectMultiple={true}
      value={myValue}
      onChange={handleOnChange}
      renderItem={renderCustomItem}
    />
  );
}

export default App;
