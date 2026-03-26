import { Draggable, Eventcalendar, Input, Popup, Select, setOptions, Textarea, Toast /* localeImport */ } from '@mobiscroll/react';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import './external-event-presets.css';

setOptions({
  // localeJs,
  // themeJs
});

const tasks = [
  {
    title: 'Tire change',
    color: '#7a5886',
    start: '08:00',
    end: '08:30',
    length: '0.5 h',
  },
  {
    title: 'Brake maintenance',
    color: '#9da721',
    start: '08:00',
    end: '09:30',
    length: '1.5 h',
  },
  {
    title: 'Fluid maintenance',
    color: '#cd6957',
    start: '08:00',
    end: '10:00',
    length: '2 h',
  },
  {
    title: 'Oil change',
    color: '#637e57',
    start: '08:00',
    end: '10:00',
    length: '2 h',
  },
  {
    title: 'Electrical inspection',
    color: '#50789d',
    start: '08:00',
    end: '10:30',
    length: '2.5 h',
  },
  {
    title: 'Engine inspection',
    color: '#6c5d45',
    start: '08:00',
    end: '12:30',
    length: '4.5 h',
  },
];

const myData = [
  { value: '1', text: 'Roly Chester' },
  { value: '2', text: 'Tucker Wayne' },
  { value: '3', text: 'Baker Brielle' },
  { value: '4', text: 'Jami Walter' },
  { value: '5', text: 'Patrick Toby' },
  { value: '6', text: 'Tranter Logan' },
  { value: '7', text: 'Payton Sinclair' },
];

function Task(props) {
  const [draggable, setDraggable] = useState();

  const setDragElm = useCallback((elm) => {
    setDraggable(elm);
  }, []);

  return (
    <div ref={setDragElm} style={{ background: props.data.color }} className="external-event-task">
      <div>{props.data.title}</div>
      <div>{props.data.length}</div>
      <Draggable dragData={props.data} element={draggable} />
    </div>
  );
}

Task.propTypes = {
  data: PropTypes.object.isRequired,
};

function App() {
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [technician, setTechnician] = useState('');
  const [anchor, setAnchor] = useState(null);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastText, setToastText] = useState();

  const myView = useMemo(
    () => ({
      scheduler: {
        type: 'week',
        allDay: false,
        startTime: '06:00',
        endTime: '20:00',
      },
    }),
    [],
  );

  const myInvalid = useMemo(
    () => [
      {
        recurring: {
          repeat: 'weekly',
          weekDays: 'SA,SU',
        },
      },
      {
        start: '12:00',
        end: '12:30',
        title: 'Lunch break',
        recurring: {
          repeat: 'weekly',
          weekDays: 'MO,TU,WE,TH,FR',
        },
      },
    ],
    [],
  );

  const fillDialog = useCallback((args) => {
    setTitle(args.event.title);
    setDetails(args.event.details);
    setTechnician(args.event.technician);
    setAnchor(args.target);
    setOpen(true);
  }, []);

  const handleEventCreated = useCallback(
    (args) => {
      fillDialog(args);
    },
    [fillDialog],
  );

  const handleEventCreateFail = useCallback(() => {
    setToastText("Can't create event on this date");
    setToastOpen(true);
  }, []);

  const handleEventUpdateFail = useCallback(() => {
    setToastText("Can't add event on this date");
    setToastOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    setToastText('New task added');
    setToastOpen(true);
  }, []);

  const changeSelected = useCallback((event) => {
    setTechnician(event.value);
  }, []);

  const handleCloseToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  return (
    <div className="mbsc-grid mbsc-no-padding">
      <div className="mbsc-row">
        <div className="mbsc-col-sm-9 external-event-calendar">
          <Eventcalendar
            view={myView}
            invalid={myInvalid}
            dragToMove={true}
            externalDrop={true}
            onEventCreated={handleEventCreated}
            onEventCreateFailed={handleEventCreateFail}
            onEventUpdateFailed={handleEventUpdateFail}
          />
        </div>
        <div className="mbsc-col-sm-3">
          <div className="mbsc-form-group-title">Available tasks</div>
          {tasks.map((task, i) => (
            <Task key={i} data={task} />
          ))}
        </div>
        <Popup
          display="anchored"
          width={400}
          contentPadding={false}
          touchUi={false}
          headerText="Assign task"
          buttons={['ok']}
          anchor={anchor}
          isOpen={isOpen}
          onClose={onClose}
        >
          <div className="mbsc-form-group">
            <Input label="Task" defaultValue={title} readOnly></Input>
            <Textarea label="Details" defaultValue={details} placeholder="Add description..."></Textarea>
            <Select
              data={myData}
              value={technician}
              onChange={changeSelected}
              display="anchored"
              touchUi={false}
              label="Technician"
              placeholder="Please select..."
            />
          </div>
        </Popup>
      </div>
      <Toast message={toastText} isOpen={isToastOpen} onClose={handleCloseToast} />
    </div>
  );
}

export default App;
