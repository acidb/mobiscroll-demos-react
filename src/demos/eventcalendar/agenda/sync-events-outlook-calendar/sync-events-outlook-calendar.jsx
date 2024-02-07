import { outlookCalendarSync } from '@mobiscroll/calendar-integration';
import {
  Button,
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  Eventcalendar,
  Popup,
  setOptions,
  Switch,
  Toast /* localeImport */,
} from '@mobiscroll/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import './sync-events-outlook-calendar.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [calendarData, setCalendarData] = useState([]);
  const [calendarIds, setCalendarIds] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isToastOpen, setToastOpen] = useState(false);
  const [myAnchor, setAnchor] = useState();
  const [myCalendars, setCalendars] = useState([]);
  const [myEvents, setEvents] = useState([]);
  const [mySelectedDate, setSelectedDate] = useState(new Date());
  const [toastMessage, setToastMessage] = useState('');

  const { current: myView } = useRef({ agenda: { type: 'month' } });
  const buttonRef = useRef();
  const startDate = useRef();
  const endDate = useRef();
  const timer = useRef();

  const handleError = useCallback((resp) => {
    setToastMessage(resp.message);
    setToastOpen(true);
  }, []);

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handlePopupClose = useCallback(() => {
    setPopupOpen(false);
  }, []);

  const handleSelectedDateChange = useCallback((args) => {
    setSelectedDate(args.date);
  }, []);

  const handlePageLoading = useCallback(
    (args) => {
      startDate.current = args.viewStart;
      endDate.current = args.viewEnd;
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        if (outlookCalendarSync.isSignedIn()) {
          setLoading(true);
          outlookCalendarSync
            .getEvents(calendarIds, startDate.current, endDate.current)
            .then((resp) => {
              setEvents(resp);
              setLoading(false);
            })
            .catch(handleError);
        }
      }, 200);
    },
    [calendarIds, handleError],
  );

  const toggleCalendar = useCallback(
    (ev) => {
      const checked = ev.target.checked;
      const calendarId = ev.target.value;
      calendarData[calendarId].checked = checked;
      if (checked) {
        setLoading(true);
        setCalendarIds((oldCalendarIds) => [...oldCalendarIds, calendarId]);
        outlookCalendarSync
          .getEvents([calendarId], startDate.current, endDate.current)
          .then((events) => {
            setLoading(false);
            setEvents((oldEvents) => [...oldEvents, ...events]);
          })
          .catch(handleError);
      } else {
        setCalendarIds((oldCalendarIds) => oldCalendarIds.filter((id) => id !== calendarId));
        setEvents((oldEvents) => oldEvents.filter((event) => event.outlookCalendarId !== calendarId));
      }
    },
    [calendarData, handleError],
  );

  const openPopup = useCallback(() => {
    setAnchor(buttonRef.current.nativeElement);
    setPopupOpen(true);
  }, []);

  const navigate = useCallback(() => {
    setSelectedDate(new Date());
  }, []);

  const signIn = useCallback(() => {
    outlookCalendarSync.signIn().catch(handleError);
  }, [handleError]);

  const signOut = useCallback(() => {
    outlookCalendarSync.signOut().catch(handleError);
  }, [handleError]);

  const customHeader = useCallback(
    () => (
      <>
        <CalendarNav />
        <div className={'mds-loader' + (isLoading ? ' mds-loader-visible' : '')}></div>
        <div className="mbsc-flex mbsc-flex-1-0 mbsc-justify-content-end">
          {isLoggedIn ? (
            <Button ref={buttonRef} onClick={openPopup}>
              My Calendars
            </Button>
          ) : (
            <Button onClick={signIn}>Sync my Outlook calendars</Button>
          )}
          <Button onClick={navigate}>Today</Button>
        </div>
        <CalendarPrev />
        <CalendarNext />
      </>
    ),
    [isLoading, isLoggedIn, navigate, openPopup, signIn],
  );

  useEffect(() => {
    const onSignedIn = () => {
      setIsLoggedIn(true);
      outlookCalendarSync
        .getCalendars()
        .then((calendars) => {
          const newCalendarIds = [];
          const newCalendarData = {};

          calendars.sort((c) => (c.isDefaultCalendar ? -1 : 1));

          for (const c of calendars) {
            newCalendarIds.push(c.id);
            newCalendarData[c.id] = { checked: true };
          }

          setCalendarIds(newCalendarIds);
          setCalendarData(newCalendarData);
          setCalendars(calendars);
          setLoading(true);

          return outlookCalendarSync.getEvents(newCalendarIds, startDate.current, endDate.current);
        })
        .then((events) => {
          setEvents(events);
          setLoading(false);
        })
        .catch(handleError);
    };

    const onSignedOut = () => {
      setCalendars([]);
      setCalendarIds([]);
      setCalendarData({});
      setIsLoggedIn(false);
      setEvents([]);
      setPopupOpen(false);
    };

    // init outlook client
    outlookCalendarSync.init({
      clientId: '<YOUR_OUTLOOK_CLIENT_ID>',
      redirectUri: '<YOUR_OUTLOOK_REDIRECT_URI>',
      onSignedIn: onSignedIn,
      onSignedOut: onSignedOut,
    });
  }, [handleError]);

  return (
    <>
      <Eventcalendar
        data={myEvents}
        exclusiveEndDates={true}
        renderHeader={customHeader}
        selectedDate={mySelectedDate}
        view={myView}
        onPageLoading={handlePageLoading}
        onSelectedDateChange={handleSelectedDateChange}
      />
      <Popup
        anchor={myAnchor}
        contentPadding={false}
        display="anchored"
        isOpen={isPopupOpen}
        scrollLock={false}
        showOverlay={false}
        touchUi={false}
        width={400}
        onClose={handlePopupClose}
      >
        <div className="mbsc-form-group-inset">
          <div className="mbsc-form-group-title">My Calendars</div>
          {myCalendars.map((cal) => (
            <Switch label={cal.name} key={cal.id} value={cal.id} checked={calendarData[cal.id].checked} onChange={toggleCalendar} />
          ))}
        </div>
        <div className="mbsc-form-group-inset">
          <Button className="mbsc-button-block" onClick={signOut}>
            Sign out of my account
          </Button>
        </div>
      </Popup>
      <Toast isOpen={isToastOpen} message={toastMessage} onClose={handleToastClose} />
    </>
  );
}
export default App;
