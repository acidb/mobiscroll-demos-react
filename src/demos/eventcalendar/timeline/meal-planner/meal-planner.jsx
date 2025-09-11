import {
  Button,
  Eventcalendar,
  formatDate,
  getJson,
  Input,
  Popup,
  Segmented,
  SegmentedGroup,
  setOptions,
  Snackbar,
  Textarea /* localeImport */,
} from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './meal-planner.css';

setOptions({
  // localeJs,
  // themeJs
});

const types = [
  {
    id: 1,
    name: 'Breakfast',
    color: '#e20f0f',
    kcal: '300 - 400 kcal',
    icon: '&#x1f373',
  },
  {
    id: 2,
    name: 'Elevenses',
    color: '#157d13',
    kcal: '100 - 200 kcal',
    icon: '&#x1f34c',
  },
  {
    id: 3,
    name: 'Lunch',
    color: '#32a6de',
    kcal: '500 - 700 kcal',
    icon: '&#x1f35c',
  },
  {
    id: 4,
    name: 'Dinner',
    color: '#e29d1d',
    kcal: '400 - 600 kcal',
    icon: '&#x1f959',
  },
  {
    id: 5,
    name: 'Snack',
    color: '#68169c',
    kcal: '100 - 200 kcal',
    icon: '&#x1f968',
  },
];

const viewSettings = {
  timeline: {
    type: 'week',
    eventList: true,
  },
};

const responsivePopup = {
  medium: {
    display: 'center',
    width: 400,
    fullScreen: false,
    touchUi: false,
    showOverlay: false,
  },
};

function App() {
  const [myMeals, setMyMeals] = useState([]);
  const [tempMeal, setTempMeal] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [notes, setNotes] = useState('');
  const [headerText, setHeader] = useState('');
  const [type, setType] = useState(1);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const saveEvent = useCallback(() => {
    const newEvent = {
      id: tempMeal.id,
      title: name,
      calories: calories,
      notes: notes,
      start: tempMeal.start,
      end: tempMeal.end,
      resource: tempMeal.resource,
    };
    if (isEdit) {
      // Update the event in the list
      const index = myMeals.findIndex((x) => x.id === tempMeal.id);
      const newEventList = [...myMeals];

      newEventList.splice(index, 1, newEvent);
      setMyMeals(newEventList);
    } else {
      // Add the new event to the list
      setMyMeals([...myMeals, newEvent]);
    }
    // Close the popup
    setPopupOpen(false);
  }, [isEdit, myMeals, calories, notes, name, tempMeal]);

  const deleteEvent = useCallback(
    (event) => {
      setMyMeals(myMeals.filter((item) => item.id !== event.id));
      setTempMeal(event);
      setSnackbarOpen(true);
    },
    [myMeals],
  );

  const loadPopupForm = useCallback((event) => {
    setName(event.title);
    setCalories(event.calories);
    setNotes(event.notes);
  }, []);

  // Handle popup form changes
  const nameChange = useCallback((ev) => {
    setName(ev.target.value);
  }, []);

  const caloriesChange = useCallback((ev) => {
    setCalories(ev.target.value);
  }, []);

  const notesChange = useCallback((ev) => {
    setNotes(ev.target.value);
  }, []);

  const onDeleteClick = useCallback(() => {
    deleteEvent(tempMeal);
    setPopupOpen(false);
  }, [deleteEvent, tempMeal]);

  // Scheduler options
  const handleEventClick = useCallback(
    (args) => {
      const event = args.event;
      setHeader('<div>New meal</div><div class="md-meal-type">' + formatDate('DDDD, DD MMMM YYYY', new Date(event.start)) + '</div>');
      setType(event.resource);
      setEdit(true);
      setTempMeal({ ...event });
      // Fill popup form with event data
      loadPopupForm(event);
      setPopupOpen(true);
    },
    [loadPopupForm],
  );

  const handleEventCreated = useCallback(
    (args) => {
      const event = args.event;
      const resource = args.resourceObj;
      setHeader(
        '<div>' + resource.name + '</div><div class="md-meal-type">' + formatDate('DDDD, DD MMMM YYYY', new Date(event.start)) + '</div>',
      );
      setType(event.resource);
      setEdit(false);
      setTempMeal(event);
      // Fill popup form with event data
      loadPopupForm(event);
      // Open the popup
      setPopupOpen(true);
    },
    [loadPopupForm],
  );

  const typeChange = useCallback(
    (ev) => {
      const value = +ev.target.value;
      setType(value);
      setTempMeal({ ...tempMeal, resource: value });
    },
    [tempMeal],
  );

  const handleEventDeleted = useCallback(
    (args) => {
      deleteEvent(args.event);
    },
    [deleteEvent],
  );

  // Popup options
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
      setMyMeals([...myMeals]);
    }
    setPopupOpen(false);
  }, [isEdit, myMeals]);

  const extendMyDefaultEvent = useCallback(
    () => ({
      title: 'New meal',
      allDay: true,
    }),
    [],
  );

  const renderMyResource = (resource) => (
    <div className="md-meal-planner-cont">
      <div className="md-meal-planner-title" style={{ color: resource.color }}>
        <span className="md-meal-planner-icon" dangerouslySetInnerHTML={{ __html: resource.icon }}></span>
        {resource.name}
      </div>
      <div className="md-meal-planner-kcal">{resource.kcal}</div>
    </div>
  );

  const myScheduleEvent = useCallback((args) => {
    const event = args.original;
    return (
      <div className="md-meal-planner-event">
        <div className="md-meal-planner-event-title">{event.title}</div>
        {event.calories && <div className="md-meal-planner-event-desc">Calories {event.calories} kcal</div>}
      </div>
    );
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/meal-planner/',
      (events) => {
        setMyMeals(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <div>
      <Eventcalendar
        view={viewSettings}
        data={myMeals}
        resources={types}
        dragToCreate={false}
        dragToResize={false}
        dragToMove={true}
        clickToCreate={true}
        extendDefaultEvent={extendMyDefaultEvent}
        onEventClick={handleEventClick}
        onEventCreated={handleEventCreated}
        onEventDeleted={handleEventDeleted}
        renderResource={renderMyResource}
        renderScheduleEventContent={myScheduleEvent}
        cssClass="md-meal-planner-calendar"
      />
      <Popup
        display="bottom"
        fullScreen={true}
        contentPadding={false}
        headerText={headerText}
        buttons={popupButtons}
        isOpen={isPopupOpen}
        onClose={onPopupClose}
        responsive={responsivePopup}
        cssClass="md-meal-planner-popup"
      >
        <SegmentedGroup onChange={typeChange} value={type}>
          {types.map((type) => (
            <Segmented value={type.id} key={type.id}>
              {type.name}
            </Segmented>
          ))}
        </SegmentedGroup>
        <div className="mbsc-form-group">
          <Input label="Name" value={name} onChange={nameChange} />
          <Input label="Calories" value={calories} onChange={caloriesChange} />
          <Textarea label="Notes" value={notes} onChange={notesChange} />
        </div>
        {isEdit && (
          <div className="mbsc-button-group">
            <Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>
              Delete meal
            </Button>
          </div>
        )}
      </Popup>
      <Snackbar
        message="Event deleted"
        isOpen={isSnackbarOpen}
        onClose={handleSnackbarClose}
        button={{
          action: () => {
            setMyMeals((prevEvents) => [...prevEvents, tempMeal]);
          },
          text: 'Undo',
        }}
      />
    </div>
  );
}

export default App;
