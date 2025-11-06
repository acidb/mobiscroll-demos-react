import {
  Button,
  Datepicker,
  Dropdown,
  Eventcalendar,
  Input,
  Popup,
  Segmented,
  SegmentedGroup,
  setOptions,
  Snackbar,
  Switch,
  Textarea /* localeImport */,
} from '@mobiscroll/react';
import { useCallback, useMemo, useRef, useState } from 'react';
import './create-read-update-delete-CRUD.css';

setOptions({
  // localeJs,
  // themeJs
});

const defaultEvents = [
  {
    id: 1,
    start: 'dyndatetime(y,m,8,13)',
    end: 'dyndatetime(y,m,8,13,45)',
    title: "Lunch @ Butcher's",
    description: '',
    allDay: false,
    bufferBefore: 15,
    free: true,
    color: '#009788',
  },
  {
    id: 2,
    start: 'dyndatetime(y,m,d,15)',
    end: 'dyndatetime(y,m,d,16)',
    title: 'Conference',
    description: '',
    allDay: false,
    bufferBefore: 30,
    free: false,
    color: '#ff9900',
  },
  {
    id: 3,
    start: 'dyndatetime(y,m,d-1,18)',
    end: 'dyndatetime(y,m,d-1,22)',
    title: 'Site Visit',
    description: '',
    allDay: false,
    bufferBefore: 60,
    free: true,
    color: '#3f51b5',
  },
  {
    id: 4,
    start: 'dyndatetime(y,m,d+1,10,30)',
    end: 'dyndatetime(y,m,d+1,11,30)',
    title: 'Stakeholder mtg.',
    description: '',
    allDay: false,
    free: false,
    color: '#f44437',
  },
];

const colors = ['#ffeb3c', '#ff9900', '#f44437', '#ea1e63', '#9c26b0', '#3f51b5', '', '#009788', '#4baf4f', '#7e5d4e'];

function App() {
  const [myEvents, setMyEvents] = useState(defaultEvents);
  const [editedEvent, setEditedEvent] = useState({});

  const [eventId, setEventId] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventAllDay, setEventAllDay] = useState(false);
  const [eventStart, setEventStart] = useState(null);
  const [eventEnd, setEventEnd] = useState(null);
  const [dateStart, startRef] = useState(null);
  const [dateEnd, endRef] = useState(null);
  const [eventBuffer, setEventBuffer] = useState(0);
  const [eventColor, setEventColor] = useState('');
  const [eventStatus, setEventStatus] = useState(false);

  const [addEditPopupAnchor, setAddEditPopupAnchor] = useState(null);
  const [addEditPopupOpen, setAddEditPopupOpen] = useState(false);
  const [colorPickerAnchor, setColorPickerAnchor] = useState(null);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [isEdit, setEdit] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const calInst = useRef();
  const colorPickerRef = useRef();

  const applySelectedColor = useCallback((color) => {
    setEventColor(color);
    setColorPickerOpen(false);
  }, []);

  const myView = useMemo(() => ({ calendar: { labels: true } }), []);

  const colorPickerButtons = useMemo(
    () => [
      'cancel',
      {
        text: 'Set',
        keyCode: 'enter',
        handler: () => applySelectedColor(selectedColor),
        cssClass: 'mbsc-popup-button-primary',
      },
    ],
    [applySelectedColor, selectedColor],
  );

  const colorPickerResponsive = useMemo(
    () => ({
      medium: {
        display: 'anchored',
        anchor: colorPickerAnchor,
        buttons: [],
      },
    }),
    [colorPickerAnchor],
  );

  const datepickerControls = useMemo(() => (eventAllDay ? ['date'] : ['datetime']), [eventAllDay]);

  const datepickerResponsive = useMemo(
    () =>
      eventAllDay
        ? {
            medium: { controls: ['calendar'], touchUi: false },
          }
        : {
            medium: { controls: ['calendar', 'time'], touchUi: false },
          },
    [eventAllDay],
  );

  const addEditPopupHeaderText = useMemo(() => (isEdit ? 'Edit event' : 'New Event'), [isEdit]);

  const snackbarButton = useMemo(
    () => ({
      action: () => {
        setMyEvents((prevEvents) => [...prevEvents, editedEvent]);
      },
      text: 'Undo',
    }),
    [editedEvent],
  );

  const eventData = useMemo(
    () => ({
      id: eventId,
      title: eventTitle,
      description: eventDescription,
      allDay: eventAllDay,
      start: eventStart,
      end: eventEnd,
      bufferBefore: eventBuffer,
      color: eventColor,
      free: eventStatus,
    }),
    [eventId, eventTitle, eventDescription, eventAllDay, eventStart, eventEnd, eventBuffer, eventColor, eventStatus],
  );

  const addEditPopupButtons = useMemo(() => {
    if (isEdit) {
      return [
        'cancel',
        {
          text: 'Save',
          keyCode: 'enter',
          cssClass: 'mbsc-popup-button-primary',
          handler: () => {
            const updatedEvent = eventData;
            const index = myEvents.findIndex((x) => x.id === updatedEvent.id);
            const newEventList = [...myEvents];

            // Update event in the list
            newEventList.splice(index, 1, updatedEvent);
            setMyEvents(newEventList);

            calInst.current.navigateToEvent(updatedEvent);
            setAddEditPopupOpen(false);
          },
        },
      ];
    } else {
      return [
        'cancel',
        {
          text: 'Add',
          keyCode: 'enter',
          cssClass: 'mbsc-popup-button-primary',
          handler: () => {
            const newEvent = eventData;

            // Add new event to the list
            setMyEvents([...myEvents, newEvent]);

            setSuccess(true);
            calInst.current.navigateToEvent(newEvent);
            setAddEditPopupOpen(false);
          },
        },
      ];
    }
  }, [isEdit, eventData, myEvents]);

  const addEditPopupResponsive = useMemo(
    () => ({
      medium: {
        display: 'anchored',
        width: 400,
        fullScreen: false,
        touchUi: false,
      },
    }),
    [],
  );

  const handleTitleChange = useCallback((ev) => {
    setEventTitle(ev.target.value);
  }, []);

  const handleDescriptionChange = useCallback((ev) => {
    setEventDescription(ev.target.value);
  }, []);

  const handleAllDayChange = useCallback((ev) => {
    setEventAllDay(ev.target.checked);
  }, []);

  const handleDateChange = useCallback((args) => {
    setEventStart(args.value[0]);
    setEventEnd(args.value[1]);
  }, []);

  const handleBufferChange = useCallback((ev) => {
    setEventBuffer(+ev.target.value);
  }, []);

  const handleStatusChange = useCallback((ev) => {
    setEventStatus(ev.target.value === 'free');
  }, []);

  const fillPopup = useCallback((event) => {
    setEventId(event.id);
    setEventTitle(event.title || '');
    setEventDescription(event.description || '');
    setEventAllDay(event.allDay);
    setEventStart(event.start);
    setEventEnd(event.end);
    setEventBuffer(event.bufferBefore || 0);
    setEventColor(event.color || '');
    setEventStatus(event.free);
  }, []);

  const createEditPopup = useCallback(
    (event, target) => {
      setEdit(true);
      setEditedEvent(event);
      setAddEditPopupAnchor(target);
      fillPopup(event);
      setAddEditPopupOpen(true);
    },
    [fillPopup],
  );

  const createAddPopup = useCallback(
    (event, target) => {
      setSuccess(false);
      setEdit(false);
      setEditedEvent(event);
      setAddEditPopupAnchor(target);
      fillPopup(event);
      setAddEditPopupOpen(true);
    },
    [fillPopup],
  );

  const handleEventClick = useCallback(
    (args) => {
      createEditPopup(args.event, args.domEvent.currentTarget);
    },
    [createEditPopup],
  );

  const handleEventCreated = useCallback(
    (args) => {
      createAddPopup(args.event, args.target);
    },
    [createAddPopup],
  );

  const handleEventDeleted = useCallback(() => {
    setSnackbarOpen(true);
  }, []);

  const handleAddEditPopupClose = useCallback(() => {
    if (!isEdit && !isSuccess) {
      // Refresh the list, if add popup was canceled, to remove the temporary event
      setMyEvents([...myEvents]);
    }
    setAddEditPopupOpen(false);
  }, [isEdit, isSuccess, myEvents]);

  const handleDeleteButtonClick = useCallback(() => {
    const filteredEvents = myEvents.filter((e) => e.id !== editedEvent.id);
    setMyEvents(filteredEvents);
    setAddEditPopupOpen(false);
    setSnackbarOpen(true);
  }, [editedEvent, myEvents]);

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  const handleEventColorClick = useCallback((args) => {
    setColorPickerAnchor(args.currentTarget);
    setColorPickerOpen(true);
  }, []);

  const handleColorChange = useCallback(
    (args) => {
      const color = args.currentTarget.getAttribute('data-value');
      setEventColor(color);
      setSelectedColor(color);
      if (!colorPickerRef.current.s.buttons.length) {
        applySelectedColor(color);
      }
    },
    [applySelectedColor],
  );

  const handleColorPickerClose = useCallback(() => {
    setColorPickerOpen(false);
  }, []);

  return (
    <>
      <Eventcalendar
        clickToCreate={true}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        data={myEvents}
        ref={calInst}
        view={myView}
        onEventClick={handleEventClick}
        onEventCreated={handleEventCreated}
        onEventDeleted={handleEventDeleted}
      />

      <Popup
        display="bottom"
        contentPadding={false}
        fullScreen={true}
        scrollLock={false}
        headerText={addEditPopupHeaderText}
        anchor={addEditPopupAnchor}
        buttons={addEditPopupButtons}
        responsive={addEditPopupResponsive}
        isOpen={addEditPopupOpen}
        onClose={handleAddEditPopupClose}
      >
        <div className="mbsc-form-group">
          <Input label="Title" value={eventTitle} onChange={handleTitleChange} />
          <Textarea label="Description" value={eventDescription} onChange={handleDescriptionChange} />
        </div>

        <div className="mbsc-form-group">
          <div>
            <Switch label="All-day" checked={eventAllDay} onChange={handleAllDayChange} />

            <Datepicker
              select="range"
              display="anchored"
              controls={datepickerControls}
              touchUi={true}
              startInput={dateStart}
              endInput={dateEnd}
              showRangeLabels={false}
              responsive={datepickerResponsive}
              onChange={handleDateChange}
              value={[eventStart, eventEnd]}
            />

            <Input ref={startRef} label="Starts" />
            <Input ref={endRef} label="Ends" />

            {!eventAllDay && (
              <Dropdown label="Travel time" value={eventBuffer} onChange={handleBufferChange}>
                <option value="0">None</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </Dropdown>
            )}
          </div>

          <div onClick={handleEventColorClick} className="mbsc-flex mds-crud-event-color-cont">
            <div className="mbsc-flex-1-0">Color</div>
            <div className="mds-crud-selected-event-color" style={{ background: eventColor }} />
          </div>

          <SegmentedGroup onChange={handleStatusChange}>
            <Segmented value="busy" checked={!eventStatus}>
              Show as busy
            </Segmented>
            <Segmented value="free" checked={eventStatus}>
              Show as free
            </Segmented>
          </SegmentedGroup>

          {isEdit && (
            <div className="mbsc-button-group">
              <Button className="mbsc-button-block" color="danger" variant="outline" onClick={handleDeleteButtonClick}>
                Delete event
              </Button>
            </div>
          )}
        </div>
      </Popup>

      <Popup
        display="bottom"
        contentPadding={false}
        showArrow={false}
        showOverlay={false}
        ref={colorPickerRef}
        anchor={colorPickerAnchor}
        isOpen={colorPickerOpen}
        buttons={colorPickerButtons}
        responsive={colorPickerResponsive}
        onClose={handleColorPickerClose}
      >
        <div className="mbsc-flex mds-crud-color-row">
          {colors.slice(0, 5).map((color) => (
            <div
              key={color}
              onClick={handleColorChange}
              className={`mds-crud-color-value ${eventColor === color ? 'mds-crud-color-value-selected' : ''}`}
              data-value={color}
            >
              <div className="mds-crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check" style={{ background: color }} />
            </div>
          ))}
        </div>

        <div className="mbsc-flex mds-crud-color-row">
          {colors.slice(5).map((color) => (
            <div
              key={color}
              onClick={handleColorChange}
              className={`mds-crud-color-value ${eventColor === color ? 'mds-crud-color-value-selected' : ''}`}
              data-value={color}
            >
              <div className="mds-crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check" style={{ background: color }} />
            </div>
          ))}
        </div>
      </Popup>

      <Snackbar isOpen={snackbarOpen} message="Event deleted" button={snackbarButton} onClose={handleSnackbarClose} />
    </>
  );
}

export default App;
