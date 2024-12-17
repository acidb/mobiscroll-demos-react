import { Eventcalendar, formatDate, getJson, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useMemo, useState } from 'react';
import './load-resources-on-scroll.css';

setOptions({
  // localeJs,
  // themeJs
});

const myRes = [
  { id: 1, name: 'Resource 1' },
  { id: 2, name: 'Resource 2' },
  { id: 3, name: 'Resource 3' },
  { id: 4, name: 'Resource 4' },
  { id: 5, name: 'Resource 5' },
  { id: 6, name: 'Resource 6' },
  { id: 7, name: 'Resource 7' },
  { id: 8, name: 'Resource 8' },
  { id: 9, name: 'Resource 9' },
  { id: 10, name: 'Resource 10' },
  { id: 11, name: 'Resource 11' },
  { id: 12, name: 'Resource 12' },
  { id: 13, name: 'Resource 13' },
  { id: 14, name: 'Resource 14' },
  { id: 15, name: 'Resource 15' },
  { id: 16, name: 'Resource 16' },
  { id: 17, name: 'Resource 17' },
  { id: 18, name: 'Resource 18' },
  { id: 19, name: 'Resource 19' },
  { id: 20, name: 'Resource 20' },
  { id: 21, name: 'Resource 21' },
  { id: 22, name: 'Resource 22' },
  { id: 23, name: 'Resource 23' },
  { id: 24, name: 'Resource 24' },
  { id: 25, name: 'Resource 25' },
];

function App() {
  const [myEvents, setEvents] = useState([]);
  const [myResources, setResources] = useState(myRes);
  const [isToastOpen, setToastOpen] = useState(false);
  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const myView = useMemo(
    () => ({
      timeline: {
        type: 'month',
        resolutionHorizontal: 'hour',
      },
    }),
    [],
  );

  const handleVirtualLoading = useCallback(
    (args) => {
      const start = formatDate('YYYY-MM-DD', args.viewStart);
      const end = formatDate('YYYY-MM-DD', args.viewEnd);
      const isEndLoaded = myResources[myResources.length - 1].id > args.resourceEnd;

      if (!isEndLoaded) {
        setToastOpen(true);
      }

      getJson(
        'https://trial.mobiscroll.com/load-data-scroll/?start=' +
          start +
          '&end=' +
          end +
          '&rstart=' +
          args.resourceStart +
          '&rend=' +
          args.resourceEnd +
          '&load=' +
          (!isEndLoaded ? args.resourceEnd : 0),
        (data) => {
          if (data.resources) {
            setResources([...myResources, ...data.resources]);
          }
          setEvents(data.events);
        },
        'jsonp',
      );
    },
    [myResources],
  );

  return (
    <>
      <Eventcalendar view={myView} data={myEvents} resources={myResources} onVirtualLoading={handleVirtualLoading} />
      <Toast message="Loading Resources..." duration={1000} isOpen={isToastOpen} onClose={handleToastClose} />
    </>
  );
}

export default App;
