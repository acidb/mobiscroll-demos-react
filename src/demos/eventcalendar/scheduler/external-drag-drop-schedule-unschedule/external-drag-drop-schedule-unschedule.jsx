import { Draggable, Dropcontainer, Eventcalendar, getJson, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './external-drag-drop-schedule-unschedule.css';

setOptions({
  // localeJs,
  // themeJs
});

function Task(props) {
  const [draggable, setDraggable] = useState();

  const setDragElm = useCallback((elm) => {
    setDraggable(elm);
  }, []);

  const event = props.data;
  const eventLength = Math.abs(new Date(event.end).getTime() - new Date(event.start).getTime()) / (60 * 60 * 1000);

  return (
    <div>
      {!event.hide && (
        <div ref={setDragElm} className="external-drop-task" style={{ background: event.color }}>
          <div>{event.title}</div>
          <div>{eventLength + ' hour' + (eventLength > 1 ? 's' : '')}</div>
          <Draggable dragData={event} element={draggable} />
        </div>
      )}
    </div>
  );
}

Task.propTypes = {
  data: PropTypes.object.isRequired,
};

function App() {
  const [myEvents, setEvents] = useState([]);

  const [myTasks, setTasks] = useState([
    {
      id: 1,
      title: 'Product team meeting',
      color: '#cf4343',
      start: 'dyndatetime(y,m,d,8)',
      end: 'dyndatetime(y,m,d,9,30)',
    },
    {
      id: 2,
      title: 'General orientation',
      color: '#e49516',
      start: 'dyndatetime(y,m,d,8)',
      end: 'dyndatetime(y,m,d,10)',
    },
    {
      id: 3,
      title: 'Client Training',
      color: '#8c429f',
      start: 'dyndatetime(y,m,d,10)',
      end: 'dyndatetime(y,m,d,14)',
    },
    {
      id: 4,
      title: 'CEO Conference',
      color: '#63b548',
      start: 'dyndatetime(y,m,d,12)',
      end: 'dyndatetime(y,m,d,18)',
    },
  ]);
  const [dropCont, setDropCont] = useState();
  const [toastText, setToastText] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);

  const myView = useMemo(
    () => ({
      schedule: { type: 'week' },
    }),
    [],
  );

  const setDropElm = useCallback((elm) => {
    setDropCont(elm);
  }, []);

  const handleEventCreate = useCallback(
    (args) => {
      setTasks(myTasks.filter((item) => item.id !== args.event.id));
      setToastText(args.event.title + ' added');
      setIsToastOpen(true);
    },
    [myTasks],
  );

  const handleEventDelete = useCallback((args) => {
    setToastText(args.event.title + ' unscheduled');
    setIsToastOpen(true);
  }, []);

  const handleItemDrop = useCallback(
    (args) => {
      if (args.data) {
        setTasks([...myTasks, args.data]);
      }
    },
    [myTasks],
  );

  const handleCloseToast = useCallback(() => {
    setIsToastOpen(false);
  }, []);

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/drag-drop-events/',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <div className="mbsc-grid mbsc-no-padding">
      <div className="mbsc-row">
        <div className="mbsc-col-sm-9 external-drop-calendar">
          <Eventcalendar
            data={myEvents}
            view={myView}
            dragToMove={true}
            dragToCreate={true}
            externalDrop={true}
            externalDrag={true}
            onEventCreate={handleEventCreate}
            onEventDelete={handleEventDelete}
          />
          <Toast message={toastText} isOpen={isToastOpen} onClose={handleCloseToast} />
        </div>
        <div className="mbsc-col-sm-3 external-drop-cont" ref={setDropElm}>
          <Dropcontainer onItemDrop={handleItemDrop} element={dropCont}>
            <div className="mbsc-form-group-title">Available tasks</div>
            {myTasks.map((task) => (
              <Task key={task.id} data={task} />
            ))}
          </Dropcontainer>
        </div>
      </div>
    </div>
  );
}

export default App;
