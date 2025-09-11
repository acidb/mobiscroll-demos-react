import { outlookCalendarSync } from '@mobiscroll/calendar-integration';
import {
  Button,
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  Confirm,
  Eventcalendar,
  Page,
  Popup,
  setOptions,
  Switch,
  Toast /* localeImport */,
} from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './sync-events-outlook-calendar.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [myCalendars, setCalendars] = useState([]);
  const [calendarIds, setCalendarIds] = useState([]);
  const [calendarData, setCalendarData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editable, setEditable] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [myResources, setResources] = useState([]);
  const [readonlyCalendars, setReadonlyCalendars] = useState([]);
  const [myInvalids, setInvalids] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [myAnchor, setAnchor] = useState(null);
  const [mySelectedDate, setSelectedDate] = useState(new Date());
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [confirmEvent, setConfirmEvent] = useState();
  const [confirmOldEvent, setConfirmOldEvent] = useState();
  const [isUpdateConfirmOpen, setUpdateConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const buttonRef = useRef(null);

  const debounce = useRef();
  const startDate = useRef();
  const endDate = useRef();

  const myView = useMemo(
    () => ({
      timeline: {
        type: 'week',
        eventList: true,
      },
    }),
    [],
  );

  const onError = useCallback((resp) => {
    setToastMessage(resp.message);
    setToastOpen(true);
  }, []);

  const onPopupClose = useCallback(() => {
    setPopupOpen(false);
  }, []);

  const openPopup = useCallback(() => {
    setAnchor(buttonRef.current.nativeElement);
    setPopupOpen(true);
  }, []);

  const navigate = useCallback(() => {
    setSelectedDate(new Date());
  }, []);

  const signIn = useCallback(() => {
    outlookCalendarSync.signIn().catch(onError);
  }, [onError]);

  const signOut = useCallback(() => {
    outlookCalendarSync.signOut().catch(onError);
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
        outlookCalendarSync
          .getEvents([calendarId], startDate.current, endDate.current)
          .then((events) => {
            const newResource = calendarData[calendarId];
            setLoading(false);
            setResources((resources) => [...resources, { id: calendarId, name: newResource.name, color: newResource.color }]);
            events.forEach((event) => {
              event.resource = event.outlookCalendarId;
            });
            setEvents((oldEvents) => [...oldEvents, ...events]);
          })
          .catch(onError);
      } else {
        setResources((resources) => resources.filter((item) => item.id !== calendarId));
        setCalendarIds((calIds) => calIds.filter((item) => item !== calendarId));
        setEvents((oldEvents) => oldEvents.filter((item) => item.outlookCalendarId !== calendarId));
      }
    },
    [calendarData, onError],
  );

  const renderMyHeader = useCallback(
    () => (
      <>
        <CalendarNav className="md-sync-events-outlook-nav" />
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
        <div className="md-outlook-calendar-buttons">
          {isLoggedIn ? (
            <Button ref={buttonRef} onClick={openPopup} className="md-sync-events-outlook-button">
              My Calendars
            </Button>
          ) : (
            <Button onClick={signIn} className="md-sync-events-outlook-button">
              Sync my outlook calendars
            </Button>
          )}
          <Button onClick={navigate}>Today</Button>
          <CalendarPrev />
          <CalendarNext />
        </div>
      </>
    ),
    [isLoggedIn, navigate, openPopup, signIn],
  );

  const handlePageLoading = useCallback(
    (args) => {
      clearTimeout(debounce.current);
      startDate.current = args.viewStart;
      endDate.current = args.viewEnd;
      debounce.current = setTimeout(() => {
        if (outlookCalendarSync.isSignedIn()) {
          setLoading(true);
          outlookCalendarSync
            .getEvents(calendarIds, startDate.current, endDate.current)
            .then((resp) => {
              resp.forEach((event) => {
                event.resource = event.outlookCalendarId;
              });
              setEvents(resp);
              setLoading(false);
            })
            .catch(onError);
        }
      }, 200);
    },
    [calendarIds, onError],
  );

  const handleEventCreate = useCallback(
    (args) => {
      if (outlookCalendarSync.isSignedIn()) {
        const event = args.event;
        const calendarId = event.resource;

        if (readonlyCalendars.indexOf(calendarId) !== -1) {
          setToastMessage('This calendar is readonly');
          setToastOpen(true);
        } else {
          outlookCalendarSync
            .addEvent(calendarId, event)
            .then((newEvent) => {
              newEvent.resource = event.resource;
              setEvents((oldEvents) => [...oldEvents, newEvent]);
              setToastMessage('Event created in "' + calendarData[calendarId].name + '" calendar');
              setToastOpen(true);
            })
            .catch((error) => {
              setEvents((oldEvents) => [...oldEvents]);
              onError(error);
            });
        }
      }
    },
    [calendarData, onError, readonlyCalendars],
  );

  const handleEventUpdate = useCallback((args) => {
    if (outlookCalendarSync.isSignedIn()) {
      setConfirmEvent(args.event);
      setConfirmOldEvent(args.oldEvent);
      setUpdateConfirmOpen(true);
    }
  }, []);

  const handleEventDelete = useCallback((args) => {
    if (outlookCalendarSync.isSignedIn()) {
      setConfirmEvent(args.event);
      setDeleteConfirmOpen(true);
    }
    return false;
  }, []);

  const handleUpdateConfirmClose = useCallback(
    (result) => {
      if (result) {
        const calendarId = confirmEvent.outlookCalendarId;
        outlookCalendarSync
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
        const calendarId = confirmEvent.outlookCalendarId;
        outlookCalendarSync
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
      outlookCalendarSync
        .getCalendars()
        .then((calendars) => {
          const newCalendarIds = [];
          const newResources = [];
          const calData = {};
          const readonlyCals = [];

          calendars.sort((c) => (c.isDefaultCalendar ? -1 : 1));

          for (const c of calendars) {
            newCalendarIds.push(c.id);
            newResources.push({ id: c.id, name: c.name, color: c.hexColor });
            calData[c.id] = { name: c.name, color: c.hexColor, checked: true };
            if (!c.canEdit) {
              readonlyCals.push(c.id);
            }
          }

          setCalendarIds(newCalendarIds);
          setResources(newResources);
          setCalendarData(calData);
          setReadonlyCalendars(readonlyCals);
          setCalendars(calendars);
          setLoading(true);
          setInvalids([
            {
              recurring: {
                repeat: 'daily',
                interval: 1,
              },
              resource: readonlyCals,
            },
          ]);

          return outlookCalendarSync.getEvents(newCalendarIds, startDate.current, endDate.current);
        })
        .then((events) => {
          events.forEach((event) => {
            event.resource = event.outlookCalendarId;
          });
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
      setResources([]);
      setPopupOpen(false);
    };

    // Init outlook client
    outlookCalendarSync.init({
      clientId: '<YOUR_OUTLOOK_CLIENT_ID>',
      redirectUri: '<YOUR_OUTLOOK_REDIRECT_URI>',
      onSignedIn: onSignedIn,
      onSignedOut: onSignedOut,
    });
  }, [onError]);

  return (
    <Page className={'md-sync-events-outlook-cont ' + (isLoading ? 'md-loading-events' : '')}>
      <Eventcalendar
        view={myView}
        data={myEvents}
        exclusiveEndDates={true}
        clickToCreate={editable}
        dragToCreate={editable}
        dragToMove={editable}
        dragToResize={editable}
        resources={myResources}
        invalid={myInvalids}
        selectedDate={mySelectedDate}
        renderHeader={renderMyHeader}
        onPageLoading={handlePageLoading}
        onEventCreate={handleEventCreate}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
      ></Eventcalendar>
      <Popup
        isOpen={isPopupOpen}
        anchor={myAnchor}
        onClose={onPopupClose}
        width={400}
        touchUi={false}
        showOverlay={false}
        scrollLock={false}
        contentPadding={false}
        display="anchored"
      >
        <div className="mbsc-form-group-inset mbsc-align-center">
          <p className="mbsc-italic mbsc-txt-muted">
            Editing events sync back to your calendar when enabled. You&#39;ll be asked for confirmation on every action.
          </p>
        </div>
        <div className="mbsc-form-group-inset">
          <Switch label="Enable editing" checked={editable} onChange={toggleEditing} />
        </div>
        <div className="mbsc-form-group-inset md-sync-events-outlook-inset">
          <div className="mbsc-form-group-title">My Calendars</div>
          {myCalendars.map((cal) => (
            <Switch label={cal.name} key={cal.id} value={cal.id} checked={calendarData[cal.id].checked} onChange={toggleCalendar} />
          ))}
        </div>
        <div className="mbsc-form-group-inset">
          <Button className="md-sync-events-outlook-button mbsc-button-block" onClick={signOut}>
            Log out of my account
          </Button>
        </div>
      </Popup>
      <Toast message={toastMessage} isOpen={isToastOpen} onClose={handleCloseToast} />
      <Confirm
        isOpen={isUpdateConfirmOpen}
        title="Are you sure you want to update this event?"
        message="This action will affect your Outlook Calendar event."
        okText="Update"
        onClose={handleUpdateConfirmClose}
      />
      <Confirm
        isOpen={isDeleteConfirmOpen}
        title="Are you sure you want to delete this event?"
        message="This action will remove the event from your Outlook Calendar as well."
        okText="Delete"
        onClose={handleDeleteConfirmClose}
      />
    </Page>
  );
}
export default App;
