import { Dropdown, Eventcalendar, getJson, locale, Page, setOptions } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

setOptions({
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [lang, setLang] = useState('en');
  const languages = useMemo(
    () => [
      {
        value: 'en',
        text: 'English',
      },
      {
        value: 'ar',
        text: 'Arabic',
      },
      {
        value: 'bg',
        text: 'Bulgarian',
      },
      {
        value: 'ca',
        text: 'Català',
      },
      {
        value: 'cs',
        text: 'Cestina',
      },
      {
        value: 'zh',
        text: 'Chinese',
      },
      {
        value: 'hr',
        text: 'Croatian',
      },
      {
        value: 'da',
        text: 'Dansk',
      },
      {
        value: 'de',
        text: 'Deutsch',
      },
      {
        value: 'en-GB',
        text: 'English (UK)',
      },
      {
        value: 'es',
        text: 'Español',
      },
      {
        value: 'fr',
        text: 'Français',
      },
      {
        value: 'el',
        text: 'Greek',
      },
      {
        value: 'hi',
        text: 'Hindi',
      },
      {
        value: 'it',
        text: 'Italiano',
      },
      {
        value: 'ja',
        text: 'Japanese',
      },
      {
        value: 'ko',
        text: 'Korean',
      },
      {
        value: 'lt',
        text: 'Lietuvių',
      },
      {
        value: 'hu',
        text: 'Magyar',
      },
      {
        value: 'nl',
        text: 'Nederlands',
      },
      {
        value: 'no',
        text: 'Norsk',
      },
      {
        value: 'pl',
        text: 'Polski',
      },
      {
        value: 'pt-PT',
        text: 'Português Europeu',
      },
      {
        value: 'pt-BR',
        text: 'Pt. Brasileiro',
      },
      {
        value: 'ro',
        text: 'Româna',
      },
      {
        value: 'sr',
        text: 'Serbian',
      },
      {
        value: 'sk',
        text: 'Slovencina',
      },
      {
        value: 'fi',
        text: 'Suomi',
      },
      {
        value: 'sv',
        text: 'Svenska',
      },
      {
        value: 'th',
        text: 'Thai',
      },
      {
        value: 'tr',
        text: 'Türkçe',
      },
      {
        value: 'ua',
        text: 'Ukrainian',
      },
      {
        value: 'vi',
        text: 'Vietnamese',
      },
      {
        value: 'ru',
        text: 'Русский',
      },
      {
        value: 'ru-UA',
        text: 'Русский (UA)',
      },
      {
        value: 'he',
        text: 'עברית',
      },
      {
        value: 'fa',
        text: 'فارسی',
      },
    ],
    [],
  );

  const myView = useMemo(
    () => ({
      timeline: { type: 'day' },
    }),
    [],
  );

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

  const handleChange = useCallback((event) => {
    setLang(event.target.value);
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
    <Page>
      <div className="md-localization">
        <div className="mbsc-grid">
          <div className="mbsc-row mbsc-justify-content-center">
            <div className="mbsc-col-sm-8">
              <Dropdown inputStyle="box" value={lang} onChange={handleChange}>
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.text}
                  </option>
                ))}
              </Dropdown>
            </div>
          </div>
        </div>
        <Eventcalendar locale={locale[lang]} data={myEvents} view={myView} resources={myResources} />
      </div>
    </Page>
  );
}

export default App;
