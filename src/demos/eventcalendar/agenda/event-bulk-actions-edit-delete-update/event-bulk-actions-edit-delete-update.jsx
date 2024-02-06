import { Button, Confirm, Eventcalendar, formatDate, getJson, Page, Select, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './event-bulk-actions-edit-delete-update.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [myEvents, setMyEvents] = useState([]);
  const [mySelectedEvents, setSelectedEvents] = useState([]);
  const [firstDay, setFirstDay] = useState();
  const [lastDay, setLastDay] = useState();
  const [menuAnchor, setMenuAnchor] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedValue, setSelected] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const calRef = useRef();

  const myView = useMemo(() => ({ agenda: { type: 'month' } }), []);

  const selectData = useMemo(
    () => [
      { text: 'Update', value: 'update' },
      { text: 'Delete', value: 'delete' },
    ],
    [],
  );

  const deleteSelectedEvents = useCallback(() => {
    setConfirmMessage(mySelectedEvents.map((e) => e.title).join(', '));
    setConfirmOpen(true);
  }, [mySelectedEvents]);

  const updateSelectedEvents = useCallback(() => {
    const events = mySelectedEvents.length === 0 ? [mySelectedEvents] : mySelectedEvents;
    let eventsToUpdate = [...myEvents];

    for (const event of events) {
      if (event.recurring) {
        const origEvent = event.original;
        let exc = origEvent.recurringException || [];
        const newEvent = event;

        newEvent.recurring = undefined;
        newEvent.color = 'orange';
        newEvent.id += '_' + formatDate('YYYY-MM-DD', event.start);
        eventsToUpdate = [...eventsToUpdate, newEvent];

        exc = [...exc, event.start];
        origEvent.recurringException = exc;

        // update the event in the list
        const index = eventsToUpdate.findIndex((x) => x.id === origEvent.id);
        eventsToUpdate.splice(index, 1, origEvent);
      } else {
        const newEv = event;
        newEv.color = 'orange';
        const index = eventsToUpdate.findIndex((x) => x.id === newEv.id);
        eventsToUpdate.splice(index, 1, newEv);
      }
    }
    setToastMessage("All selected event's color changed to orange");
    setToastOpen(true);
    setMyEvents(eventsToUpdate);
    setSelectedEvents([]);
  }, [myEvents, mySelectedEvents]);

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleConfirmClose = useCallback(
    (result) => {
      if (result) {
        let eventsToUpdate = [...myEvents];

        for (const event of mySelectedEvents) {
          if (event.recurring) {
            const origEvent = event.original;
            let exc = origEvent.recurringException || [];
            exc = [...exc, event.start];
            origEvent.recurringException = exc;

            // update the event in the list
            const index = eventsToUpdate.findIndex((x) => x.id === origEvent.id);
            eventsToUpdate.splice(index, 1, origEvent);
          } else {
            eventsToUpdate = eventsToUpdate.filter((ev) => ev.id !== event.id);
          }
        }

        setMyEvents(eventsToUpdate);
        setSelectedEvents([]);
        setToastMessage('Deleted');
        setToastOpen(true);
      }
      setConfirmOpen(false);
    },
    [myEvents, mySelectedEvents],
  );

  const handleEventUpdate = useCallback(
    (args) => {
      if (args.isDelete) {
        if (!confirmOpen) {
          deleteSelectedEvents();
        }
        return false;
      }
    },
    [confirmOpen, deleteSelectedEvents],
  );

  const handleEventDelete = useCallback(() => {
    if (!confirmOpen) {
      deleteSelectedEvents();
      return false;
    }
  }, [confirmOpen, deleteSelectedEvents]);

  const handlePageLoading = useCallback(() => {
    setTimeout(() => {
      setFirstDay(firstDay);
      setLastDay(lastDay);
    });
  }, [firstDay, lastDay]);

  const handleSelectedEventsChange = useCallback((args) => {
    setSelectedEvents(args.events);
  }, []);

  const handleEventRightClick = useCallback((args) => {
    args.domEvent.preventDefault();
    setMenuAnchor(args.domEvent.target);
    setTimeout(() => {
      setMenuOpen(true);
    });
  }, []);

  const selectAllEvents = useCallback(() => {
    const selectedEvents = calRef.current.getEvents(firstDay, lastDay);
    setSelectedEvents(selectedEvents);
    setToastMessage('All events selected from view');
    setToastOpen(true);
  }, [firstDay, lastDay]);

  const resetSelection = useCallback(() => {
    setSelectedEvents([]);
    setToastMessage('Selection cleared');
    setToastOpen(true);
  }, []);

  const handleSelectChange = useCallback(
    (args) => {
      setSelected(args.value);
      if (args.value === 'update') {
        updateSelectedEvents();
      } else if (args.value === 'delete') {
        deleteSelectedEvents();
      }
    },
    [deleteSelectedEvents, updateSelectedEvents],
  );

  const handleSelectClose = useCallback(() => {
    setSelected('');
    setMenuOpen(false);
  }, []);

  const handleDeleteKey = useCallback(
    (ev) => {
      if (!confirmOpen && (ev.keyCode === 8 || ev.keyCode === 46)) {
        deleteSelectedEvents();
      }
    },
    [confirmOpen, deleteSelectedEvents],
  );

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/events/?vers=5',
      (events) => {
        setMyEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <Page className="md-bulk-operations" onKeyDown={handleDeleteKey}>
      <div className="mbsc-grid mbsc-no-padding">
        <div className="mbsc-row">
          <div className="mbsc-col-sm-9 mbsc-push-sm-3">
            <Eventcalendar
              className="md-bulk-operations-border"
              ref={calRef}
              data={myEvents}
              view={myView}
              clickToCreate={true}
              selectMultipleEvents={true}
              selectedEvents={mySelectedEvents}
              onEventDelete={handleEventDelete}
              onEventUpdate={handleEventUpdate}
              onEventRightClick={handleEventRightClick}
              onPageLoading={handlePageLoading}
              onSelectedEventsChange={handleSelectedEventsChange}
            />
            <Select
              inputProps={{ type: 'hidden' }}
              display="anchored"
              touchUi={false}
              anchor={menuAnchor}
              data={selectData}
              value={selectedValue}
              isOpen={menuOpen}
              onChange={handleSelectChange}
              onClose={handleSelectClose}
            />
          </div>
          <div className="mbsc-col-sm-3 mbsc-pull-sm-9">
            <div className="mbsc-form-group">
              <div className="mbsc-button-group-block">
                <Button onClick={selectAllEvents}>Select all this month</Button>
                <Button onClick={resetSelection}>Reset selection</Button>
                <Button onClick={updateSelectedEvents}>Update selected</Button>
              </div>
            </div>
            <div className="mbsc-form-group-title">Currently selected</div>
            <div className="mbsc-padding md-selected-event-list">
              <ul>
                {mySelectedEvents.map((e, i) => (
                  <li key={i}>{e.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Confirm
        isOpen={confirmOpen}
        title="Are you sure you want to delete the following events?"
        message={confirmMessage}
        okText="Delete"
        onClose={handleConfirmClose}
      />
      <Toast isOpen={toastOpen} message={toastMessage} onClose={handleToastClose} />
    </Page>
  );
}

export default App;
