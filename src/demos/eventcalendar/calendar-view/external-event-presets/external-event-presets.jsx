import { Draggable, Eventcalendar, Input, Popup, Select, setOptions, Textarea, Toast /* localeImport */ } from '@mobiscroll/react';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import './external-event-presets.css';

setOptions({
  // localeJs,
  // themeJs
});

function Task({ data }) {
  const [draggable, setDraggable] = useState();

  return (
    <div ref={setDraggable} style={{ background: data.color }} className="external-event-task">
      <div>{data.title}</div>
      <div>{data.length}</div>
      <Draggable dragData={data} element={draggable} />
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
  const [technician, setTechnician] = useState();
  const [anchor, setAnchor] = useState(null);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState();

  const myView = useMemo(() => ({ calendar: { labels: true } }), []);

  const myTasks = useMemo(
    () => [
      {
        title: 'Small wrap',
        color: '#637e57',
        start: 'dyndatetime(y,m,d)',
        end: 'dyndatetime(y,m,d+1)',
        length: '2 days',
      },
      {
        title: 'Full-size wrap',
        color: '#50789d',
        start: 'dyndatetime(y,m,d)',
        end: 'dyndatetime(y,m,d+2)',
        length: '3 days',
      },
      {
        title: 'Mid-size wrap',
        color: '#6c5d45',
        start: 'dyndatetime(y,m,d)',
        end: 'dyndatetime(y,m,d+2)',
        length: '3 days',
      },
      {
        title: 'Roadster wrap',
        color: '#9da721',
        start: 'dyndatetime(y,m,d)',
        end: 'dyndatetime(y,m,d+2)',
        length: '3 days',
      },
      {
        title: 'SUV wrap',
        color: '#cd6957',
        start: 'dyndatetime(y,m,d)',
        end: 'dyndatetime(y,m,d+3)',
        length: '4 days',
      },
      {
        title: 'Hypercar wrap',
        color: '#7a5886',
        start: 'dyndatetime(y,m,d)',
        end: 'dyndatetime(y,m,d+4)',
        length: '5 days',
      },
    ],
    [],
  );

  const myData = useMemo(
    () => [
      { value: '1', text: 'Roly Chester' },
      { value: '2', text: 'Tucker Wayne' },
      { value: '3', text: 'Baker Brielle' },
      { value: '4', text: 'Jami Walter' },
      { value: '5', text: 'Patrick Toby' },
      { value: '6', text: 'Tranter Logan' },
      { value: '7', text: 'Payton Sinclair' },
    ],
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
    ],
    [],
  );

  const handleEventCreated = useCallback((args) => {
    setTitle(args.event.title);
    setDetails(args.event.details);
    setTechnician(args.event.technician);
    setAnchor(args.target);
    setOpen(true);
  }, []);

  const handleEventUpdateFailed = useCallback(() => {
    setToastMessage("Can't create event on this date");
    setToastOpen(true);
  }, []);

  const handlePopupClose = useCallback(() => {
    setOpen(false);
    setToastMessage('New task added');
    setToastOpen(true);
  }, []);

  const handleSelectChange = useCallback((event) => {
    setTechnician(event.value);
  }, []);

  const handleToastClose = useCallback(() => {
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
            onEventCreateFailed={handleEventUpdateFailed}
            onEventUpdateFailed={handleEventUpdateFailed}
          />
        </div>
        <div className="mbsc-col-sm-3">
          <div className="mbsc-form-group-title">Available tasks</div>
          {myTasks.map((task, i) => (
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
          onClose={handlePopupClose}
        >
          <div className="mbsc-form-group">
            <Input label="Task" defaultValue={title} readOnly></Input>
            <Textarea label="Details" defaultValue={details} placeholder="Add description..."></Textarea>
            <Select
              data={myData}
              value={technician}
              onChange={handleSelectChange}
              display="anchored"
              touchUi={false}
              label="Technician"
              inputProps={{ placeholder: 'Please select...' }}
            />
          </div>
        </Popup>
      </div>
      <Toast message={toastMessage} isOpen={isToastOpen} onClose={handleToastClose} />
    </div>
  );
}

export default App;
