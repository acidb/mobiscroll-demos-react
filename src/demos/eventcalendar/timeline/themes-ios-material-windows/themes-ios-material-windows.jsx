import { Dropdown, Eventcalendar, getJson, Page, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './themes-ios-material-windows.css';

setOptions({
  // localeJs,
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [myTheme, setTheme] = useState();
  const [myThemeVariant, setThemeVariant] = useState();

  const myView = useMemo(() => ({ timeline: { type: 'day' } }), []);

  const myResources = useMemo(
    () => [
      {
        id: 1,
        name: 'Ryan',
        color: '#fdf500',
      },
      {
        id: 2,
        name: 'Kate',
        color: '#ff4600',
      },
      {
        id: 3,
        name: 'John',
        color: '#ff0101',
      },
      {
        id: 4,
        name: 'Mark',
        color: '#239a21',
      },
      {
        id: 5,
        name: 'Sharon',
        color: '#8f1ed6',
      },
      {
        id: 6,
        name: 'Ashley',
        color: '#01adff',
      },
    ],
    [],
  );

  const handleThemeChange = useCallback((ev) => {
    setTheme(ev.target.value);
  }, []);

  const handleThemeVariantChange = useCallback((ev) => {
    setThemeVariant(ev.target.value);
  }, []);

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/timeline-events/',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <Page className="mds-full-height">
      <div className="mds-full-height mbsc-flex-col">
        <div className="mbsc-grid">
          <div className="mbsc-row">
            <div className="mbsc-col-sm-6">
              <Dropdown inputStyle="box" label="Theme" labelStyle="stacked" value={myTheme} onChange={handleThemeChange}>
                <option value="auto">Auto</option>
                <option value="ios">iOS</option>
                <option value="material">Material</option>
                <option value="windows">Windows</option>
              </Dropdown>
            </div>
            <div className="mbsc-col-sm-6">
              <Dropdown
                inputStyle="box"
                label="Theme variant"
                labelStyle="stacked"
                value={myThemeVariant}
                onChange={handleThemeVariantChange}
              >
                <option value="auto">Auto</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="mds-overflow-hidden mbsc-flex-1-1">
          <Eventcalendar data={myEvents} resources={myResources} theme={myTheme} themeVariant={myThemeVariant} view={myView} />
        </div>
      </div>
    </Page>
  );
}

export default App;
