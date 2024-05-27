import {
  Datepicker,
  Eventcalendar,
  Input,
  Popup,
  setOptions,
  /* localeImport */
} from '@mobiscroll/react';
import { useCallback, useMemo, useRef, useState } from 'react';
import './show-task-progress-on-event.css';

setOptions({
  // localeJs,
  // themeJs
});

const defaultEvents = [
  {
    start: 'dyndatetime(y,m,d+2)',
    end: 'dyndatetime(y,m,d+5)',
    title: 'Design Homepage',
    resource: 'alice',
    progress: 100,
  },
  {
    start: 'dyndatetime(y,m,d+2)',
    end: 'dyndatetime(y,m,d+6)',
    title: 'Create Wireframes',
    resource: 'bob',
    progress: 100,
  },
  {
    start: 'dyndatetime(y,m,d+4)',
    end: 'dyndatetime(y,m,d+9)',
    title: 'Develop Frontend',
    resource: 'charlie',
    progress: 45,
  },
  {
    start: 'dyndatetime(y,m,d+4)',
    end: 'dyndatetime(y,m,d+9)',
    title: 'Develop Backend',
    resource: 'dave',
    progress: 35,
  },
  {
    start: 'dyndatetime(y,m,d+9)',
    end: 'dyndatetime(y,m,d+13)',
    title: 'Test Website',
    resource: 'erin',
    progress: 0,
  },
  {
    start: 'dyndatetime(y,m,d+6)',
    end: 'dyndatetime(y,m,d+13)',
    title: 'Fix Bugs',
    resource: 'frank',
    progress: 0,
  },
  {
    start: 'dyndatetime(y,m,d+13)',
    end: 'dyndatetime(y,m,d+16)',
    title: 'Deploy Website',
    resource: 'george',
    progress: 0,
  },
];

const myResources = [
  {
    id: 'gro1',
    name: 'Designer Team',
    color: '#76e083',
    eventCreation: false,
    children: [
      {
        id: 'alice',
        name: 'Alice',
        title: 'Designer',
        color: '#1dab2f',
      },
      {
        id: 'bob',
        name: 'Bob',
        title: 'Designer',
        color: '#76e083',
      },
    ],
  },
  {
    id: 'gro2',
    name: 'Development Team',
    color: '#ff1717',
    eventCreation: false,
    children: [
      {
        id: 'charlie',
        name: 'Charlie',
        title: 'Frontend Developer',
        color: '#4981d6',
      },
      {
        id: 'dave',
        name: 'Dave',
        title: 'Backend Developer',
        color: '#f7961e',
      },
      {
        id: 'frank',
        name: 'Frank',
        title: 'Full-Stack Developer',
        color: '#34c8e0',
      },
      {
        id: 'george',
        name: 'George',
        title: 'DevOps Engineer',
        color: '#e25dd2',
      },
    ],
  },

  {
    id: 'gro3',
    name: 'QA Team',
    color: '#d6d145',
    eventCreation: false,
    children: [
      {
        id: 'erin',
        name: 'Erin',
        title: 'QA Tester',
        color: '#d6d145',
      },
    ],
  },
];

function App() {
  const [myEvents, setMyEvents] = useState(defaultEvents);
  const [tempEvent, setTempEvent] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [startInput, startInputRef] = useState(null);
  const [endInput, endInputRef] = useState(null);
  const [popupAnchor, setPopupAnchor] = useState(null);
  const [popupEventTitle, setTitle] = useState('');
  const [popupEventDate, setDate] = useState([]);
  const [popupEventResource, setResource] = useState('');
  const [popupEventProgress, setProgress] = useState(0);

  const isDraggingProgress = useRef(false);

  const myView = useMemo(() => ({ timeline: { type: 'month', eventList: true } }), []);

  const loadPopupForm = useCallback((event) => {
    setTitle(event.title);
    setDate([event.start, event.end]);
    setResource(event.resource);
    setProgress(event.progress || 0);
  }, []);

  const updateEvent = useCallback(
    (updatedEvent) => {
      // Update the event in the list
      const index = myEvents.findIndex((event) => event.id === updatedEvent.id);
      const newEventList = [...myEvents];
      newEventList.splice(index, 1, updatedEvent);
      setMyEvents(newEventList);
    },
    [myEvents],
  );

  const saveEvent = useCallback(() => {
    const newEvent = {
      id: tempEvent.id,
      title: popupEventTitle,
      start: popupEventDate[0],
      end: popupEventDate[1],
      resource: popupEventResource,
      progress: popupEventProgress,
    };
    if (isEdit) {
      updateEvent(newEvent);
    } else {
      // Add the new event to the list
      setMyEvents([...myEvents, newEvent]);
    }
    setPopupOpen(false);
  }, [isEdit, myEvents, popupEventDate, popupEventTitle, popupEventProgress, popupEventResource, tempEvent, updateEvent]);

  const popupHeaderText = useMemo(() => (isEdit ? 'Edit event' : 'New Event'), [isEdit]);

  const popupButtons = useMemo(
    () =>
      isEdit
        ? [
            'cancel',
            {
              handler: saveEvent,
              keyCode: 'enter',
              text: 'Save',
              cssClass: 'mbsc-popup-button-primary',
            },
          ]
        : [
            'cancel',
            {
              handler: saveEvent,
              keyCode: 'enter',
              text: 'Add',
              cssClass: 'mbsc-popup-button-primary',
            },
          ],
    [isEdit, saveEvent],
  );

  const popupResponsive = useMemo(
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

  const datepickerResponsive = useMemo(
    () => ({
      medium: {
        touchUi: false,
      },
    }),
    [],
  );

  const handleEventCreated = useCallback(
    (args) => {
      setEdit(false);
      setTempEvent(args.event);
      loadPopupForm(args.event);
      setPopupAnchor(args.target);
      setPopupOpen(true);
    },
    [loadPopupForm],
  );

  const handleEventClick = useCallback(
    (args) => {
      if (isDraggingProgress.current) {
        return;
      }
      setEdit(true);
      setTempEvent({ ...args.event });
      loadPopupForm(args.event);
      setPopupAnchor(args.domEvent.target);
      setPopupOpen(true);
    },
    [loadPopupForm, isDraggingProgress],
  );

  const handleTitleChange = useCallback((ev) => {
    setTitle(ev.target.value);
  }, []);

  const handleDateChange = useCallback((args) => {
    setDate(args.value);
  }, []);

  const handleProgressChange = useCallback((ev) => {
    setProgress(ev.target.value);
  }, []);

  const handlePopupClose = useCallback(() => {
    if (!isEdit) {
      // Refresh the list, if add popup was canceled, to remove the temporary event
      setMyEvents([...myEvents]);
    }
    setPopupOpen(false);
  }, [isEdit, myEvents]);

  const handleEventUpdated = useCallback(
    (args) => {
      updateEvent(args.event);
    },
    [updateEvent],
  );

  const handleProgressArrowMouseDown = useCallback(
    (e) => {
      const progressArrow = e.target.closest('.mds-progress-arrow');

      if (!progressArrow) {
        return;
      }

      e.stopPropagation();

      isDraggingProgress.current = true;

      const progressBar = progressArrow.closest('.mds-progress-bar');
      const progressLabel = progressArrow.closest('.mds-progress-event').querySelector('.mds-progress-label');
      const eventContainerWidth = progressBar.parentElement.offsetWidth;
      const initialMouseX = e.pageX;
      const initialProgress = parseFloat(progressBar.style.width.replace('%', ''));

      let newProgress;

      const handleMouseMove = (e) => {
        const mouseXOffset = e.pageX - initialMouseX;

        newProgress = Math.round(initialProgress + (mouseXOffset / eventContainerWidth) * 100);
        newProgress = Math.max(0, Math.min(100, newProgress));

        progressBar.style.width = `${newProgress}%`;
        progressLabel.textContent = `${newProgress}%`;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        const eventId = progressArrow.dataset.eventId;
        const eventToUpdate = myEvents.find((event) => event.id === eventId);
        eventToUpdate.progress = newProgress;
        updateEvent(eventToUpdate);

        setTimeout(() => {
          isDraggingProgress.current = false;
        }, 100);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [myEvents, updateEvent],
  );

  const renderCustomEvent = useCallback(
    (event) => (
      <div className="mds-progress-event" style={{ background: event.color }}>
        <div className="mds-progress-bar" style={{ width: `${event.original.progress || 0}%` }}>
          <div className="mds-progress-arrow" data-event-id={event.original.id}></div>
        </div>
        <div className="mds-progress-event-content">
          <div className="mds-progress-event-title">{event.original.title}</div>
        </div>
        <div className="mds-progress-label" key={event.original.progress || 0}>
          {event.original.progress || 0}%
        </div>
      </div>
    ),
    [],
  );

  const renderCustomResource = useCallback(
    (resource) => (
      <div>
        <div className="mds-progress-employee-name">{resource.name}</div>
        {resource.title && <div className="mds-progress-employee-title">{resource.title}</div>}
      </div>
    ),
    [],
  );

  return (
    <div onMouseDownCapture={handleProgressArrowMouseDown}>
      <Eventcalendar
        class="mds-progress-calendar"
        view={myView}
        data={myEvents}
        resources={myResources}
        clickToCreate={true}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        onEventClick={handleEventClick}
        onEventCreated={handleEventCreated}
        onEventUpdated={handleEventUpdated}
        renderResource={renderCustomResource}
        renderScheduleEvent={renderCustomEvent}
      />
      <Popup
        display="bottom"
        fullScreen={true}
        contentPadding={false}
        headerText={popupHeaderText}
        anchor={popupAnchor}
        buttons={popupButtons}
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        responsive={popupResponsive}
      >
        <div className="mbsc-form-group">
          <Input label="Title" value={popupEventTitle} onChange={handleTitleChange} />
        </div>
        <div className="mbsc-form-group">
          <Input ref={startInputRef} label="Starts" />
          <Input ref={endInputRef} label="Ends" />
          <Datepicker
            select="range"
            touchUi={true}
            startInput={startInput}
            endInput={endInput}
            showRangeLabels={false}
            responsive={datepickerResponsive}
            onChange={handleDateChange}
            value={popupEventDate}
          />
        </div>
        <div className="mbsc-form-group">
          <label className="mbsc-flex mbsc-align-items-center mbsc-padding">
            <span>Progress</span>
            <input
              className="mds-popup-progress-slider mbsc-flex-1-0"
              type="range"
              min="0"
              max="100"
              value={popupEventProgress}
              onChange={handleProgressChange}
            />
            <span className="mds-popup-progress-label">{popupEventProgress}%</span>
          </label>
        </div>
      </Popup>
    </div>
  );
}

export default App;
