import { googleCalendarSync } from '@mobiscroll/calendar-integration';
import {
  Button,
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  CalendarToday,
  Confirm,
  Eventcalendar,
  Page,
  setOptions,
  Switch,
  Toast /* localeImport */,
} from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './sync-events-google-calendar.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [myCalendars, setCalendars] = useState([]);
  const [calendarIds, setCalendarIds] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editable, setEditable] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [primaryCalendarId, setPrimaryCalendarId] = useState();
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [confirmEvent, setConfirmEvent] = useState();
  const [confirmOldEvent, setConfirmOldEvent] = useState();
  const [isUpdateConfirmOpen, setUpdateConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const myView = useMemo(() => ({ schedule: { type: 'week' } }), []);

  const debounce = useRef();
  const startDate = useRef();
  const endDate = useRef();

  const onError = useCallback((resp) => {
    setToastMessage(resp.error ? resp.error : resp.result.error.message);
    setToastOpen(true);
  }, []);

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const extendMyDefaultEvent = useCallback(
    () => ({
      color: calendarData[primaryCalendarId].color,
    }),
    [calendarData, primaryCalendarId],
  );

  const signIn = useCallback(() => {
    googleCalendarSync.signIn().catch(onError);
  }, [onError]);

  const signOut = useCallback(() => {
    googleCalendarSync.signOut().catch(onError);
  }, [onError]);

  const toggleEditing = useCallback((ev) => {
    setEditable(ev.target.checked);
  }, []);

  const toggleCalendar = useCallback(
    (ev) => {
      const checked = ev.target.checked;
      const calendarId = ev.target.value;
      calendarData[calendarId].checked = checked;
      if (checked) {
        setLoading(true);
        setCalendarIds((calIds) => [...calIds, calendarId]);
        googleCalendarSync
          .getEvents([calendarId], startDate.current, endDate.current)
          .then((events) => {
            setLoading(false);
            setEvents((oldEvents) => [...oldEvents, ...events]);
          })
          .catch(onError);
      } else {
        setCalendarIds((calIds) => calIds.filter((item) => item !== calendarId));
        setEvents((oldEvents) => oldEvents.filter((item) => item.googleCalendarId !== calendarId));
      }
    },
    [calendarData, onError],
  );

  const renderMyHeader = useCallback(
    () => (
      <>
        <CalendarNav />
        <div className="md-spinner">
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
        </div>
        <div className="md-google-calendar-header">
          <CalendarPrev />
          <CalendarToday />
          <CalendarNext />
        </div>
      </>
    ),
    [],
  );

  const handlePageLoading = useCallback(
    (args) => {
      clearTimeout(debounce.current);
      startDate.current = args.viewStart;
      endDate.current = args.viewEnd;
      debounce.current = setTimeout(() => {
        if (googleCalendarSync.isSignedIn()) {
          setLoading(true);
          googleCalendarSync
            .getEvents(calendarIds, startDate.current, endDate.current)
            .then((events) => {
              setLoading(false);
              setEvents(events);
            })
            .catch(onError);
        }
      }, 200);
    },
    [calendarIds, onError],
  );

  const handleEventCreate = useCallback(
    (args) => {
      if (googleCalendarSync.isSignedIn()) {
        const event = args.event;
        googleCalendarSync
          .addEvent(primaryCalendarId, event)
          .then((newEvent) => {
            newEvent.color = event.color;
            setEvents((oldEvents) => [...oldEvents, newEvent]);
            setToastMessage('Event created in "' + calendarData[primaryCalendarId].name + '" calendar');
            setToastOpen(true);
          })
          .catch((error) => {
            setEvents((oldEvents) => [...oldEvents]);
            onError(error);
          });
      }
    },
    [calendarData, onError, primaryCalendarId],
  );

  const handleEventUpdate = useCallback((args) => {
    if (googleCalendarSync.isSignedIn()) {
      setConfirmEvent(args.event);
      setConfirmOldEvent(args.oldEvent);
      setUpdateConfirmOpen(true);
    }
  }, []);

  const handleEventDelete = useCallback((args) => {
    if (googleCalendarSync.isSignedIn()) {
      setConfirmEvent(args.event);
      setDeleteConfirmOpen(true);
    }
    return false;
  }, []);

  const handleUpdateConfirmClose = useCallback(
    (result) => {
      if (result) {
        const calendarId = confirmEvent.googleCalendarId;
        googleCalendarSync
          .updateEvent(calendarId, confirmEvent)
          .then(() => {
            setToastMessage('Event updated on "' + calendarData[calendarId].name + '" calendar');
            setToastOpen(true);
          })
          .catch((error) => {
            setEvents((oldEvents) => [...oldEvents.filter((item) => item.id !== confirmEvent.id), confirmOldEvent]);
            onError(error);
          });
      } else {
        setEvents((oldEvents) => [...oldEvents.filter((item) => item.id !== confirmEvent.id), confirmOldEvent]);
      }
      setUpdateConfirmOpen(false);
    },
    [calendarData, confirmEvent, confirmOldEvent, onError],
  );

  const handleDeleteConfirmClose = useCallback(
    (result) => {
      if (result) {
        const calendarId = confirmEvent.googleCalendarId;
        googleCalendarSync
          .deleteEvent(calendarId, confirmEvent)
          .then(() => {
            setEvents((oldEvents) => oldEvents.filter((item) => item.id !== confirmEvent.id));
            setToastMessage('Event deleted from "' + calendarData[calendarId].name + '" calendar');
            setToastOpen(true);
          })
          .catch(onError);
      }
      setDeleteConfirmOpen(false);
    },
    [calendarData, confirmEvent, onError],
  );

  const handleCloseToast = useCallback(() => setToastOpen(false), []);

  useEffect(() => {
    const onSignedIn = () => {
      setIsLoggedIn(true);
      googleCalendarSync
        .getCalendars()
        .then((calendars) => {
          calendars.sort((c) => (c.primary ? -1 : 1));

          const calData = {};
          const primaryCalId = calendars[0].id;

          for (const c of calendars) {
            calData[c.id] = { name: c.summary, color: c.backgroundColor, checked: c.id === primaryCalId };
          }

          setCalendarIds([primaryCalId]);
          setPrimaryCalendarId(primaryCalId);
          setCalendarData(calData);
          setCalendars(calendars);
          setLoading(true);

          return googleCalendarSync.getEvents([primaryCalId], startDate.current, endDate.current);
        })
        .then((events) => {
          setEvents(events);
          setLoading(false);
        })
        .catch(onError);
    };

    const onSignedOut = () => {
      setIsLoggedIn(false);
      setCalendars([]);
      setCalendarIds([]);
      setCalendarData({});
      setEvents([]);
    };

    // init google client
    googleCalendarSync.init({
      apiKey: '<YOUR_GOOGLE_API_KEY>',
      clientId: '<YOUR_GOOGLE_CLIENT_ID>',
      onSignedIn: onSignedIn,
      onSignedOut: onSignedOut,
    });
  }, [onError]);

  return (
    <Page className="md-sync-events-google-cont">
      <div className="md-sync-events-google-menu">
        {isLoggedIn ? (
          <div>
            <div className="mbsc-form-group-inset mbsc-align-center">
              <p className="mbsc-italic mbsc-txt-muted">
                Editing events sync back to your calendar when enabled. You&#39;ll be asked for confirmation on every action.
              </p>
            </div>
            <div className="mbsc-form-group-inset">
              <Switch label="Enable editing" checked={editable} onChange={toggleEditing} />
            </div>
            <div className="mbsc-form-group-inset md-sync-events-google-inset">
              <div className="mbsc-form-group-title">My Calendars</div>
              {myCalendars.map((cal) => (
                <Switch label={cal.summary} key={cal.id} value={cal.id} checked={calendarData[cal.id].checked} onChange={toggleCalendar} />
              ))}
            </div>
            <div className="mbsc-form-group-inset">
              <Button className="md-sync-events-google-button mbsc-button-block" onClick={signOut}>
                Log out of my account
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mbsc-form-group-inset mbsc-align-center">
              <p className="mbsc-italic mbsc-txt-muted">Log into your Google account to view and edit your Google Calendar events</p>
              <Button className="md-sync-events-google-button mbsc-button-block" onClick={signIn}>
                Sync my google calendars
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className={'md-sync-events-google-calendar ' + (isLoading ? 'md-loading-events' : '')}>
        <div className="md-sync-events-overlay"></div>
        <Eventcalendar
          view={myView}
          data={myEvents}
          exclusiveEndDates={true}
          clickToCreate={editable}
          dragToCreate={editable}
          dragToMove={editable}
          dragToResize={editable}
          extendDefaultEvent={extendMyDefaultEvent}
          renderHeader={renderMyHeader}
          onPageLoading={handlePageLoading}
          onEventCreate={handleEventCreate}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
        ></Eventcalendar>
      </div>
      <Toast message={toastMessage} isOpen={isToastOpen} onClose={handleCloseToast} />
      <Toast isOpen={isToastOpen} message={toastMessage} onClose={handleToastClose} />
      <Confirm
        isOpen={isUpdateConfirmOpen}
        title="Are you sure you want to update this event?"
        message="This action will affect your Google Calendar event."
        okText="Update"
        onClose={handleUpdateConfirmClose}
      />
      <Confirm
        isOpen={isDeleteConfirmOpen}
        title="Are you sure you want to delete this event?"
        message="This action will remove the event from your Google Calendar as well."
        okText="Delete"
        onClose={handleDeleteConfirmClose}
      />
    </Page>
  );
}

export default App;
