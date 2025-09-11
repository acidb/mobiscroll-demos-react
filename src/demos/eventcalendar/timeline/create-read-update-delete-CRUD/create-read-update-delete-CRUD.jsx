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
    start: 'dyndatetime(y,m,d,13)',
    end: 'dyndatetime(y,m,d,15)',
    title: "Lunch @ Butcher's",
    description: '',
    allDay: false,
    bufferBefore: 15,
    free: true,
    resource: 3,
  },
  {
    id: 2,
    start: 'dyndatetime(y,m,d,14)',
    end: 'dyndatetime(y,m,d,16)',
    title: 'Conference',
    description: '',
    allDay: false,
    bufferBefore: 30,
    free: false,
    resource: 5,
  },
  {
    id: 3,
    start: 'dyndatetime(y,m,d,18)',
    end: 'dyndatetime(y,m,d,22)',
    title: 'Site Visit',
    description: '',
    allDay: false,
    bufferBefore: 60,
    free: true,
    resource: 4,
  },
  {
    id: 4,
    start: 'dyndatetime(y,m,d,10,30)',
    end: 'dyndatetime(y,m,d,13)',
    title: 'Stakeholder mtg.',
    description: '',
    allDay: false,
    free: false,
    resource: 1,
  },
];
const myResources = [
  {
    id: 1,
    name: 'Resource A',
    color: '#ffeb3c',
  },
  {
    id: 2,
    name: 'Resource B',
    color: '#f44437',
  },
  {
    id: 3,
    name: 'Resource C',
    color: '#3f51b5',
  },
  {
    id: 4,
    name: 'Resource D',
    color: '#4baf4f',
  },
  {
    id: 5,
    name: 'Resource E',
    color: '#ff9900',
  },
];
const viewSettings = {
  timeline: { type: 'day' },
};
const responsivePopup = {
  medium: {
    display: 'anchored',
    width: 400,
    fullScreen: false,
    touchUi: false,
  },
};
const colorPopup = {
  medium: {
    display: 'anchored',
    touchUi: false,
    buttons: [],
  },
};
const colors = ['#ffeb3c', '#ff9900', '#f44437', '#ea1e63', '#9c26b0', '#3f51b5', '#5ac8fa', '#009788', '#4baf4f', '#7e5d4e'];

function App() {
  const [myEvents, setMyEvents] = useState(defaultEvents);
  const [tempEvent, setTempEvent] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [start, startRef] = useState(null);
  const [end, endRef] = useState(null);
  const [popupEventTitle, setTitle] = useState('');
  const [popupEventDescription, setDescription] = useState('');
  const [popupEventAllDay, setAllDay] = useState(true);
  const [popupTravelTime, setTravelTime] = useState(0);
  const [popupEventDate, setDate] = useState([]);
  const [popupEventStatus, setStatus] = useState('busy');
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [colorAnchor, setColorAnchor] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [tempColor, setTempColor] = useState('');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const calInst = useRef();
  const colorPicker = useRef();

  const colorButtons = useMemo(
    () => [
      'cancel',
      {
        text: 'Set',
        keyCode: 'enter',
        handler: () => {
          setSelectedColor(tempColor);
          setColorPickerOpen(false);
        },
        cssClass: 'mbsc-popup-button-primary',
      },
    ],
    [tempColor],
  );

  const saveEvent = useCallback(() => {
    const newEvent = {
      id: tempEvent.id,
      title: popupEventTitle,
      description: popupEventDescription,
      start: popupEventDate[0],
      end: popupEventDate[1],
      allDay: popupEventAllDay,
      bufferBefore: popupTravelTime,
      status: popupEventStatus,
      color: selectedColor,
      resource: tempEvent.resource,
    };
    if (isEdit) {
      // Update the event in the list
      const index = myEvents.findIndex((x) => x.id === tempEvent.id);
      const newEventList = [...myEvents];

      newEventList.splice(index, 1, newEvent);
      setMyEvents(newEventList);
      // Here you can update the event in your storage as well
      // ...
    } else {
      // Add the new event to the list
      setMyEvents([...myEvents, newEvent]);
      // Here you can add the event to your storage as well
      // ...
    }
    calInst.current.navigateToEvent(newEvent);
    // Close the popup
    setPopupOpen(false);
  }, [
    isEdit,
    myEvents,
    popupEventAllDay,
    popupEventDate,
    popupEventDescription,
    popupEventStatus,
    popupEventTitle,
    popupTravelTime,
    tempEvent,
    selectedColor,
  ]);

  const deleteEvent = useCallback(
    (event) => {
      setMyEvents(myEvents.filter((item) => item.id !== event.id));
      setSnackbarOpen(true);
    },
    [myEvents, setSnackbarOpen],
  );

  const loadPopupForm = useCallback((event) => {
    setTitle(event.title);
    setDescription(event.description);
    setDate([event.start, event.end]);
    setAllDay(event.allDay || false);
    setTravelTime(event.bufferBefore || 0);
    setStatus(event.status || 'busy');
  }, []);

  const titleChange = useCallback((ev) => {
    setTitle(ev.target.value);
  }, []);

  const descriptionChange = useCallback((ev) => {
    setDescription(ev.target.value);
  }, []);

  const allDayChange = useCallback((ev) => {
    setAllDay(ev.target.checked);
  }, []);

  const travelTimeChange = useCallback((ev) => {
    setTravelTime(ev.target.value);
  }, []);

  const dateChange = useCallback((args) => {
    setDate(args.value);
  }, []);

  const statusChange = useCallback((ev) => {
    setStatus(ev.target.value);
  }, []);

  const onDeleteClick = useCallback(() => {
    deleteEvent(tempEvent);
    setPopupOpen(false);
  }, [deleteEvent, tempEvent]);

  const handleEventClick = useCallback(
    (args) => {
      setEdit(true);
      setTempEvent({ ...args.event });
      setSelectedColor(args.event.color || args.resourceObj.color);
      // Fill popup form with event data
      loadPopupForm(args.event);
      setAnchor(args.domEvent.target);
      setPopupOpen(true);
    },
    [loadPopupForm],
  );

  const handleEventCreated = useCallback(
    (args) => {
      setEdit(false);
      setTempEvent(args.event);
      setSelectedColor(args.resourceObj.color);
      // Fill popup form with event data
      loadPopupForm(args.event);
      setAnchor(args.target);
      // Open the popup
      setPopupOpen(true);
    },
    [loadPopupForm],
  );

  const handleEventDeleted = useCallback(
    (args) => {
      deleteEvent(args.event);
    },
    [deleteEvent],
  );

  const handleEventUpdated = useCallback(() => {
    // Here you can update the event in your storage as well, after drag & drop or resize
    // ...
  }, []);

  const controls = useMemo(() => (popupEventAllDay ? ['date'] : ['datetime']), [popupEventAllDay]);
  const responsiveOptions = useMemo(
    () =>
      popupEventAllDay
        ? {
            medium: {
              controls: ['calendar'],
              touchUi: false,
            },
          }
        : {
            medium: {
              controls: ['calendar', 'time'],
              touchUi: false,
            },
          },
    [popupEventAllDay],
  );

  const headerText = useMemo(() => (isEdit ? 'Edit event' : 'New Event'), [isEdit]);
  const popupButtons = useMemo(() => {
    if (isEdit) {
      return [
        'cancel',
        {
          handler: () => {
            saveEvent();
          },
          keyCode: 'enter',
          text: 'Save',
          cssClass: 'mbsc-popup-button-primary',
        },
      ];
    } else {
      return [
        'cancel',
        {
          handler: () => {
            saveEvent();
          },
          keyCode: 'enter',
          text: 'Add',
          cssClass: 'mbsc-popup-button-primary',
        },
      ];
    }
  }, [isEdit, saveEvent]);

  const onPopupClose = useCallback(() => {
    if (!isEdit) {
      // Refresh the list, if add popup was canceled, to remove the temporary event
      setMyEvents([...myEvents]);
    }
    setPopupOpen(false);
  }, [isEdit, myEvents]);

  const selectColor = useCallback((color) => {
    setTempColor(color);
  }, []);

  const openColorPicker = useCallback(
    (ev) => {
      selectColor(selectedColor);
      setColorAnchor(ev.currentTarget);
      setColorPickerOpen(true);
    },
    [selectColor, selectedColor],
  );

  const changeColor = useCallback(
    (ev) => {
      const color = ev.currentTarget.getAttribute('data-value');
      selectColor(color);
      if (!colorPicker.current.s.buttons.length) {
        setSelectedColor(color);
        setColorPickerOpen(false);
      }
    },
    [selectColor, setSelectedColor],
  );

  const onPickerClose = useCallback(() => {
    setColorPickerOpen(false);
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  return (
    <div>
      <Eventcalendar
        clickToCreate={true}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        data={myEvents}
        ref={calInst}
        resources={myResources}
        view={viewSettings}
        onEventClick={handleEventClick}
        onEventCreated={handleEventCreated}
        onEventDeleted={handleEventDeleted}
        onEventUpdated={handleEventUpdated}
      />
      <Popup
        display="bottom"
        fullScreen={true}
        contentPadding={false}
        headerText={headerText}
        anchor={anchor}
        buttons={popupButtons}
        isOpen={isPopupOpen}
        onClose={onPopupClose}
        responsive={responsivePopup}
      >
        <div className="mbsc-form-group">
          <Input label="Title" value={popupEventTitle} onChange={titleChange} />
          <Textarea label="Description" value={popupEventDescription} onChange={descriptionChange} />
        </div>
        <div className="mbsc-form-group">
          <Switch label="All-day" checked={popupEventAllDay} onChange={allDayChange} />
          <Input ref={startRef} label="Starts" />
          <Input ref={endRef} label="Ends" />
          {!popupEventAllDay && (
            <div id="travel-time-group">
              <Dropdown label="Travel time" value={popupTravelTime} onChange={travelTimeChange}>
                <option value="0">None</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </Dropdown>
            </div>
          )}
          <Datepicker
            select="range"
            controls={controls}
            touchUi={true}
            startInput={start}
            endInput={end}
            showRangeLabels={false}
            responsive={responsiveOptions}
            onChange={dateChange}
            value={popupEventDate}
          />
          <div onClick={openColorPicker} className="event-color-c">
            <div className="event-color-label">Color</div>
            <div className="event-color" style={{ background: selectedColor }}></div>
          </div>
          <SegmentedGroup onChange={statusChange}>
            <Segmented value="busy" checked={popupEventStatus === 'busy'}>
              Show as busy
            </Segmented>
            <Segmented value="free" checked={popupEventStatus === 'free'}>
              Show as free
            </Segmented>
          </SegmentedGroup>
          {isEdit && (
            <div className="mbsc-button-group">
              <Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>
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
        anchor={colorAnchor}
        isOpen={colorPickerOpen}
        buttons={colorButtons}
        responsive={colorPopup}
        ref={colorPicker}
        onClose={onPickerClose}
      >
        <div className="crud-color-row">
          {colors.map((color, index) => {
            if (index < 5) {
              return (
                <div
                  key={index}
                  onClick={changeColor}
                  className={'crud-color-c ' + (tempColor === color ? 'selected' : '')}
                  data-value={color}
                >
                  <div className="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check" style={{ background: color }}></div>
                </div>
              );
            } else return null;
          })}
        </div>
        <div className="crud-color-row">
          {colors.map((color, index) => {
            if (index >= 5) {
              return (
                <div
                  key={index}
                  onClick={changeColor}
                  className={'crud-color-c ' + (tempColor === color ? 'selected' : '')}
                  data-value={color}
                >
                  <div className="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check" style={{ background: color }}></div>
                </div>
              );
            } else return null;
          })}
        </div>
      </Popup>
      <Snackbar
        message="Event deleted"
        isOpen={isSnackbarOpen}
        onClose={handleSnackbarClose}
        button={{
          action: () => {
            setMyEvents((prevEvents) => [...prevEvents, event]);
          },
          text: 'Undo',
        }}
      />
    </div>
  );
}

export default App;
