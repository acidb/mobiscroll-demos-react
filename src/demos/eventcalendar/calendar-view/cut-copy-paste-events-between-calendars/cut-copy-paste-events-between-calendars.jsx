import { Eventcalendar, Page, Segmented, SegmentedGroup, Select, setOptions, Snackbar, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useMemo, useRef, useState } from 'react';
import './cut-copy-paste-events-between-calendars.css';

setOptions({
  // localeJs,
  // themeJs
});

const today = new Date();

function App() {
  const menu = useMemo(
    () => [
      { text: 'Copy', value: 'c' },
      { text: 'Cut', value: 'x' },
      { text: 'Paste', value: 'v' },
      { text: 'Delete', value: 'delete' },
    ],
    [],
  );

  const disabledMenu = useMemo(
    () => [
      { text: 'Copy', value: 'c', disabled: true },
      { text: 'Cut', value: 'x', disabled: true },
      { text: 'Paste', value: 'v' },
      { text: 'Delete', value: 'delete', disabled: true },
    ],
    [],
  );

  const [selectValue, setSelectValue] = useState();
  const [menuAnchor, setMenuAnchor] = useState();
  const [activeCalendar, setActiveCalendar] = useState('first');
  const [cutCalendar, setCutCalendar] = useState('first');
  const [toDate, setToDate] = useState(today);
  const [firstToDate, setFirstToDate] = useState(today);
  const [secondToDate, setSecondToDate] = useState(today);
  const [originDate, setOriginDate] = useState(today);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuData, setMenuData] = useState(menu);
  const [firstSelectedEvents, setFirstSelectedEvents] = useState([]);
  const [secondSelectedEvents, setSecondSelectedEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [moveEvents, setMoveEvents] = useState([]);
  const [pastedEvents, setPastedEvents] = useState([]);
  const [deletedEvents, setDeletedEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarButton, setSnackbarButton] = useState();
  const [firstEvents, setFirstEvents] = useState([
    {
      start: 'dyndatetime(y,m,2,9)',
      end: 'dyndatetime(y,m,6,18)',
      title: 'Business of Software Conference',
      color: '#ff6d42',
    },
    {
      start: 'dyndatetime(y,m,10,7)',
      end: 'dyndatetime(y,m,10,8)',
      title: 'Green box to post office',
      color: '#6e7f29',
    },
    {
      start: 'dyndatetime(y,m,15,9,30)',
      end: 'dyndatetime(y,m,15,10,30)',
      title: 'Product team mtg.',
      color: '#f67944',
    },
    {
      start: 'dyndatetime(y,m,23,11,0)',
      end: 'dyndatetime(y,m,23,11,45)',
      title: 'Stakeholder mtg.',
      color: '#a144f6',
    },
    {
      start: 'dyndatetime(y,m,28,13,0)',
      end: 'dyndatetime(y,m,28,13,45)',
      title: "Lunch @ Butcher's",
      color: '#00aabb',
    },
  ]);
  const [secondEvents, setSecondEvents] = useState([
    {
      start: 'dyndatetime(y,m,4,8,45)',
      end: 'dyndatetime(y,m,4,10)',
      title: 'Quick mtg. with Martin',
      color: '#de3d83',
    },
    {
      start: 'dyndatetime(y,m,8,15,0)',
      end: 'dyndatetime(y,m,8,16,0)',
      title: 'General orientation',
      color: '#a71111',
    },
    {
      start: 'dyndatetime(y,m,10,13)',
      end: 'dyndatetime(y,m,14,21)',
      title: 'Friends binge marathon',
      color: '#7bde83',
    },
    {
      start: 'dyndatetime(y,m,23,8)',
      end: 'dyndatetime(y,m,27,9)',
      title: 'Product team mtg.',
      color: '#913aa7',
    },
  ]);

  const dummyRef = useRef();
  const isMenuOpen = useRef();
  const action = useRef();

  const myView = useMemo(() => ({ calendar: { labels: 'all' } }), []);

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  const handlePageLoading = useCallback(
    (args) => {
      setTimeout(() => {
        if (activeCalendar === 'first') {
          setFirstToDate(args.month);
        } else {
          setSecondToDate(args.month);
        }
        setToDate(args.month);
      });
    },
    [activeCalendar],
  );

  const handleCellRightClick = useCallback(
    (args) => {
      if (!isMenuOpen.current) {
        args.domEvent.preventDefault();
        setMenuData(disabledMenu);
        setMenuAnchor(args.domEvent.target);
        setTimeout(() => {
          setMenuOpen(true);
        });
      }
    },
    [isMenuOpen, disabledMenu],
  );

  const handleEventRightClick = useCallback(
    (args) => {
      const activeEvents = activeCalendar === 'first' ? firstEvents : secondEvents;
      if (activeEvents.length <= 1) {
        if (activeCalendar === 'first') {
          setFirstEvents([args.event]);
        } else {
          setSecondEvents([args.event]);
        }
      }
      if (activeCalendar === 'first' && firstSelectedEvents.length <= 1) {
        setFirstSelectedEvents([args.event]);
      }
      if (activeCalendar === 'second' && secondSelectedEvents.length <= 1) {
        setSecondSelectedEvents([args.event]);
      }
      args.domEvent.preventDefault();
      setMenuData(menu);
      setMenuAnchor(args.domEvent.target);
      setTimeout(() => {
        setMenuOpen(true);
      });
      isMenuOpen.current = true;
    },
    [activeCalendar, firstEvents, secondEvents, firstSelectedEvents, secondSelectedEvents, menu],
  );

  const handleEventDeleted = useCallback(
    (args) => {
      setDeletedEvents(args.events);
      action.current = 'delete';
      setTimeout(() => {
        setSnackbarButton({
          action: () => {
            const activeEvents = activeCalendar === 'first' ? firstEvents : secondEvents;
            let eventsToUpdate = [...activeEvents];
            for (const event of deletedEvents) {
              eventsToUpdate = eventsToUpdate.filter((ev) => ev.id !== event.id);
            }

            if (activeCalendar === 'first') {
              setFirstEvents(eventsToUpdate);
            } else {
              setSecondEvents(eventsToUpdate);
            }

            setDeletedEvents([]);
          },
          text: 'Undo',
        });
        setSnackbarMessage('Event' + (deletedEvents.length === 1 ? '' : 's') + ' deleted');
        setSnackbarOpen(true);
      });
      dummyRef.current.focus();
    },
    [activeCalendar, deletedEvents, firstEvents, secondEvents],
  );

  const getActiveEvents = useCallback(
    () => (activeCalendar === 'first' ? firstEvents : secondEvents),
    [activeCalendar, firstEvents, secondEvents],
  );

  const getActiveSelectedEvents = useCallback(
    () => (activeCalendar === 'first' ? firstSelectedEvents : secondSelectedEvents),
    [activeCalendar, firstSelectedEvents, secondSelectedEvents],
  );

  const monthDiff = useCallback((d1, d2) => d2.getMonth() - d1.getMonth() + 12 * (d2.getFullYear() - d1.getFullYear()), []);

  const pasteEvents = useCallback(() => {
    const activeEvents = getActiveEvents();
    const activeSelectedEvents = selectedEvents;
    let eventsToUpdate = [...activeEvents];
    if (activeSelectedEvents.length > 0) {
      for (const event of activeSelectedEvents) {
        const newEvent = Object.assign({}, event);
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        const diff = Math.abs(endDate - startDate);

        newEvent.start = startDate.setMonth(startDate.getMonth() - monthDiff(toDate, originDate));
        newEvent.end = new Date(startDate.getTime() + diff);

        delete newEvent.id;

        eventsToUpdate = [...eventsToUpdate, newEvent];

        setPastedEvents([...pastedEvents, newEvent]);
      }

      if (activeCalendar === 'first') {
        setFirstEvents(eventsToUpdate);
      } else {
        setSecondEvents(eventsToUpdate);
      }

      if (action.current === 'cut') {
        let cutEvs = activeCalendar === cutCalendar ? eventsToUpdate : cutCalendar === 'first' ? firstEvents : secondEvents;
        setMoveEvents([...selectedEvents]);
        for (const event of selectedEvents) {
          cutEvs = cutEvs.filter((ev) => ev.id !== event.id);
        }
        if (cutCalendar === 'first') {
          setFirstEvents(cutEvs);
        } else {
          setSecondEvents(cutEvs);
        }

        setTimeout(() => {
          setSnackbarButton({
            action: () => {
              let revertEvs = cutCalendar === 'first' ? firstEvents : secondEvents;
              for (const event of moveEvents) {
                revertEvs = [...revertEvs, event];
              }
              if (cutCalendar === 'first') {
                setFirstEvents(revertEvs);
              } else {
                setSecondEvents(revertEvs);
              }

              let cutEvs = getActiveEvents();
              for (const event of pastedEvents) {
                cutEvs = cutEvs.filter((ev) => ev.id !== event.id);
              }
              if (activeCalendar === 'first') {
                setFirstEvents(cutEvs);
              } else {
                setSecondEvents(cutEvs);
              }

              setToastMessage('Event' + (selectedEvents.length === 1 ? '' : 's') + ' reverted');
              setToastOpen(true);
            },
            text: 'Undo',
          });
          setSnackbarMessage('Event' + (selectedEvents.length === 1 ? '' : 's') + ' pasted');
          setSnackbarOpen(true);
        });
        dummyRef.current.focus();
      } else {
        setToastMessage('Event' + (activeSelectedEvents.length === 1 ? '' : 's') + ' pasted');
        setToastOpen(true);
      }
      if (action.current !== 'copy') {
        setSelectedEvents([]);
      }
    }
  }, [
    action,
    activeCalendar,
    cutCalendar,
    firstEvents,
    getActiveEvents,
    monthDiff,
    moveEvents,
    originDate,
    pastedEvents,
    secondEvents,
    selectedEvents,
    toDate,
  ]);

  const deleteEvents = useCallback(() => {
    const activeEvents = getActiveEvents();
    let eventsToUpdate = [...activeEvents];
    action.current = 'delete';
    const activeSelectedEvents = getActiveSelectedEvents();

    if (activeSelectedEvents.length > 0) {
      setDeletedEvents(activeSelectedEvents);

      for (const event of activeSelectedEvents) {
        eventsToUpdate = eventsToUpdate.filter((ev) => ev.id !== event.id);
      }

      if (activeCalendar === 'first') {
        setFirstEvents(eventsToUpdate);
      } else {
        setSecondEvents(eventsToUpdate);
      }
      setTimeout(() => {
        setSnackbarButton({
          action: () => {
            for (const event of activeSelectedEvents) {
              eventsToUpdate = [...eventsToUpdate, event];
            }
            if (activeCalendar === 'first') {
              setFirstEvents(eventsToUpdate);
            } else {
              setSecondEvents(eventsToUpdate);
            }
            setDeletedEvents([]);
          },
          text: 'Undo',
        });
        setSnackbarMessage('Event' + (activeSelectedEvents.length === 1 ? '' : 's') + ' deleted');
        setSnackbarOpen(true);
      });
      dummyRef.current.focus();
    }
  }, [activeCalendar, getActiveEvents, getActiveSelectedEvents]);

  const activateAction = useCallback(
    (type) => {
      if (selectedEvents.length > 0) {
        const act = type == 'copy' ? ' copied' : ' cut';
        setOriginDate(toDate);
        setToastMessage('Event' + (selectedEvents.length === 1 ? '' : 's') + act);
        setToastOpen(true);
      }
    },
    [selectedEvents, toDate],
  );

  const copyEvents = useCallback(() => {
    if (activeCalendar === 'first') {
      if (firstSelectedEvents.length > 0) {
        action.current = 'copy';
        setSelectedEvents(firstSelectedEvents);
        activateAction('copy');
      }
    } else {
      if (secondSelectedEvents.length > 0) {
        action.current = 'copy';
        setSelectedEvents(secondSelectedEvents);
        activateAction('copy');
      }
    }
  }, [activateAction, activeCalendar, firstSelectedEvents, secondSelectedEvents]);

  const cutEvents = useCallback(() => {
    if (activeCalendar === 'first') {
      if (firstSelectedEvents.length > 0) {
        action.current = 'cut';
        setSelectedEvents(firstSelectedEvents);
        setCutCalendar(activeCalendar);
        activateAction('cut');
        setDeletedEvents([]);
      }
    } else {
      if (secondSelectedEvents.length > 0) {
        action.current = 'cut';
        setSelectedEvents(secondSelectedEvents);
        setCutCalendar(activeCalendar);
        activateAction('cut');
        setDeletedEvents([]);
      }
    }
  }, [activateAction, activeCalendar, firstSelectedEvents, secondSelectedEvents]);

  const undoEvents = useCallback(() => {
    const activeEvents = getActiveEvents();
    let eventsToUpdate = [...activeEvents];
    if (action.current === 'delete') {
      for (const event of deletedEvents) {
        eventsToUpdate = [...eventsToUpdate, event];
      }
      if (activeCalendar === 'first') {
        setFirstEvents(eventsToUpdate);
      } else {
        setSecondEvents(eventsToUpdate);
      }
      setDeletedEvents([]);
    } else if (action.current === 'cut') {
      let revertEvs = cutCalendar === 'first' ? firstEvents : secondEvents;
      for (const event of moveEvents) {
        revertEvs = [...revertEvs, event];
      }
      if (cutCalendar === 'first') {
        setFirstEvents(revertEvs);
      } else {
        setSecondEvents(revertEvs);
      }

      let cutEvs = getActiveEvents();
      for (const event of pastedEvents) {
        cutEvs = cutEvs.filter((ev) => ev.id !== event.id);
      }
      if (activeCalendar === 'first') {
        setFirstEvents(cutEvs);
      } else {
        setSecondEvents(cutEvs);
      }

      setMoveEvents([]);
      setPastedEvents([]);
    }
  }, [action, activeCalendar, cutCalendar, deletedEvents, firstEvents, getActiveEvents, moveEvents, pastedEvents, secondEvents]);

  const detectAction = useCallback(
    (key) => {
      switch (key) {
        case 'delete': // Delete
          deleteEvents();
          break;
        case 'c': // Copy
          copyEvents();
          break;
        case 'x': // Cut
          cutEvents();
          break;
        case 'z': // Undo
          undoEvents();
          break;
        case 'v': // Paste
          pasteEvents();
          break;
        default:
      }
    },
    [copyEvents, cutEvents, deleteEvents, pasteEvents, undoEvents],
  );

  const handleFirstSelectedEventsChange = useCallback((args) => {
    setFirstSelectedEvents(args.events);
  }, []);

  const handleSecondSelectedEventsChange = useCallback((args) => {
    setSecondSelectedEvents(args.events);
  }, []);

  const handleSelectChange = useCallback(
    (args) => {
      setSelectValue(args.value);
      detectAction(args.value);
    },
    [detectAction],
  );

  const handleSelectClose = useCallback(() => {
    isMenuOpen.current = false;
    setMenuOpen(false);
    // Clear selection
    setSelectValue(null);
  }, []);

  const switchCalendar = useCallback(
    (ev) => {
      setActiveCalendar(ev.target.value);
      if (ev.target.value === 'first') {
        setToDate(firstToDate);
        setSecondSelectedEvents([]);
      } else {
        setToDate(secondToDate);
        setFirstSelectedEvents([]);
      }
    },
    [firstToDate, secondToDate],
  );

  const handleKeyDown = (ev) => {
    if (ev.ctrlKey || ev.metaKey) {
      detectAction(ev.key);
    }
    if (ev.key === 'Delete') {
      detectAction('delete');
    }
  };

  return (
    <Page>
      <div onKeyDown={handleKeyDown}>
        <div className="mbsc-flex-col md-copy-cut-paste">
          <div className="mbsc-flex-none">
            <SegmentedGroup name="controlled" onChange={switchCalendar}>
              <Segmented value="first" checked={activeCalendar === 'first'}>
                First calendar
              </Segmented>
              <Segmented value="second" checked={activeCalendar === 'second'}>
                Second calendar
              </Segmented>
            </SegmentedGroup>
          </div>
          <div className="mbsc-flex-col mbsc-flex-1-1">
            <div id="demo-copy-cut-paste-first-cont" className="mbsc-flex-1-1 md-copy-cut-paste-cont">
              <Eventcalendar
                className={activeCalendar === 'first' ? '' : 'md-hide-calendar'}
                view={myView}
                clickToCreate={true}
                dragToCreate={true}
                dragToMove={true}
                dragToResize={true}
                selectMultipleEvents={true}
                data={firstEvents}
                selectedEvents={firstSelectedEvents}
                onSelectedEventsChange={handleFirstSelectedEventsChange}
                onPageLoading={handlePageLoading}
                onCellRightClick={handleCellRightClick}
                onEventRightClick={handleEventRightClick}
                onEventDeleted={handleEventDeleted}
              />
            </div>
            <div id="demo-copy-cut-paste-second-cont" className="mbsc-flex-1-1 md-copy-cut-paste-cont">
              <Eventcalendar
                className={activeCalendar === 'second' ? '' : 'md-hide-calendar'}
                view={myView}
                clickToCreate={true}
                dragToCreate={true}
                dragToMove={true}
                dragToResize={true}
                selectMultipleEvents={true}
                data={secondEvents}
                selectedEvents={secondSelectedEvents}
                onSelectedEventsChange={handleSecondSelectedEventsChange}
                onPageLoading={handlePageLoading}
                onCellRightClick={handleCellRightClick}
                onEventRightClick={handleEventRightClick}
                onEventDeleted={handleEventDeleted}
              />
            </div>
            <Select
              touchUi={false}
              display="anchored"
              anchor={menuAnchor}
              isOpen={menuOpen}
              buttons={[]}
              data={menuData}
              value={selectValue}
              onChange={handleSelectChange}
              onClose={handleSelectClose}
              inputProps={{ type: 'hidden' }}
            />
          </div>
        </div>
        <div tabIndex={-1} ref={dummyRef}></div>
      </div>
      <Toast isOpen={isToastOpen} message={toastMessage} onClose={handleToastClose} />
      <Snackbar isOpen={isSnackbarOpen} duration={3000} message={snackbarMessage} button={snackbarButton} onClose={handleSnackbarClose} />
    </Page>
  );
}

export default App;
