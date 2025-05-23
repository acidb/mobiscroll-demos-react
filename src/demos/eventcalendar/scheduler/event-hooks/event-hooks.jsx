import { Draggable, Eventcalendar, getJson, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useEffect, useMemo, useState } from 'react';
import './event-hooks.css';

setOptions({
  // theme
  // locale
});

function App() {
  const [myEvents, setEvents] = useState([]);
  const [draggable1, setDraggable1] = useState();
  const [draggable2, setDraggable2] = useState();

  const myResources = useMemo(
    () => [
      {
        id: 1,
        name: 'Ryan',
        color: '#f7c4b4',
      },
      {
        id: 2,
        name: 'Kate',
        color: '#c6f1c9',
      },
      {
        id: 3,
        name: 'John',
        color: '#e8d0ef',
      },
    ],
    [],
  );

  const invalid = useMemo(
    () => [
      {
        start: '12:00',
        end: '13:00',
        title: 'Lunch break',
        recurring: {
          repeat: 'weekly',
          weekDays: 'MO,TU,WE,TH,FR',
        },
      },
    ],
    [],
  );

  const myView = useMemo(
    () => ({
      schedule: {
        type: 'day',
      },
    }),
    [],
  );

  const dragData1 = useMemo(
    () => ({
      title: 'External drag 1',
      color: '#ffdab8',
    }),
    [],
  );

  const dragData2 = useMemo(
    () => ({
      title: 'External drag 2',
      color: '#ddfcf7',
    }),
    [],
  );

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/resource-events/',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <>
      <div ref={setDraggable1} className="event-hooks-draggable" style={{ background: '#ffdab8' }}>
        <div className="draggable-title">External drag 1</div>
        <div className="draggable-text">Drag me to calendar</div>
        <Draggable dragData={dragData1} element={draggable1} />
      </div>
      <div ref={setDraggable2} className="event-hooks-draggable" style={{ background: '#ddfcf7' }}>
        <div className="draggable-title">External drag 2</div>
        <div className="draggable-text">Drag me to calendar</div>
        <Draggable dragData={dragData2} element={draggable2} />
      </div>
      <Eventcalendar
        data={myEvents}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        resources={myResources}
        view={myView}
        invalid={invalid}
        onCellClick={() => {
          /* Logic for cell click */
        }}
        onCellDoubleClick={() => {
          /* Logic for cell double click */
        }}
        onCellRightClick={() => {
          /* Logic for cell right click */
        }}
        onDestroy={() => {
          // Your custom event handler goes here
        }}
        onEventClick={() => {
          // Logic for event click
        }}
        onEventCreate={() => {
          // Logic for event create
        }}
        onEventCreated={() => {
          // Logic for event created
        }}
        onEventCreateFailed={() => {
          // Logic for failed event create
        }}
        onEventDelete={() => {
          // Logic for event delete
        }}
        onEventDeleted={() => {
          // Logic for event deleted
        }}
        onEventDoubleClick={() => {
          // Logic for event double click
        }}
        onEventDragStart={() => {
          // Logic for event drag start
        }}
        onEventDragEnd={() => {
          // Logic for event drag end
        }}
        onEventDragEnter={() => {
          // Logic for event drag enter
        }}
        onEventDragLeave={() => {
          // Logic for event drag leave
        }}
        onEventHoverIn={() => {
          // Logic for event hover in
        }}
        onEventHoverOut={() => {
          // Logic for event hover out
        }}
        onEventUpdate={() => {
          // Logic for event update
        }}
        onEventUpdated={() => {
          // Logic for event updated
        }}
        onEventUpdateFailed={() => {
          // Logic for failed event update
        }}
        onEventRightClick={() => {
          // Logic for event right click
        }}
        onInit={() => {
          // Logic running on component init
        }}
        onPageChange={() => {
          // Your custom event handler goes here
        }}
        onPageLoaded={() => {
          // Use it to inject custom markup & attach custom listeners
        }}
        onPageLoading={() => {
          // Use it to load data on demand
        }}
        onResourceClick={() => {
          // Logic for resource click
        }}
        onResourceDoubleClick={() => {
          // Logic for resource double click
        }}
        onResourceRightClick={() => {
          // Logic for resource right click
        }}
        onSelectedDateChange={() => {
          // Use it to keep track of the selected date externally
        }}
      />
    </>
  );
}

export default App;
