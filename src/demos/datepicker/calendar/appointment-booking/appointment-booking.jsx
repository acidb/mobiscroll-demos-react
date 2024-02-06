import { Datepicker, getJson, Page, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useState } from 'react';
import './appointment-booking.css';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [multiple, setMultiple] = useState(['dyndatetime(y,m,11)', 'dyndatetime(y,m,16)', 'dyndatetime(y,m,17)']);
  const min = 'dyndatetime(y,m,d)';
  const max = 'dyndatetime(y,m+6,d)';
  const [singleLabels, setSingleLabels] = useState([]);
  const [singleInvalid, setSingleInvalid] = useState([]);
  const [datetimeLabels, setDatetimeLabels] = useState([]);
  const [datetimeInvalid, setDatetimeInvalid] = useState([]);
  const [multipleLabels, setMultipleLabels] = useState([]);
  const [multipleInvalid, setMultipleInvalid] = useState([]);

  const handlePageLoadingSingle = useCallback((args) => {
    const d = args.firstDay;
    const invalid = [];
    const labels = [];

    getJson(
      'https://trial.mobiscroll.com/getprices/?year=' + d.getFullYear() + '&month=' + d.getMonth(),
      (bookings) => {
        for (let i = 0; i < bookings.length; ++i) {
          const booking = bookings[i];
          const d = new Date(booking.d);

          if (booking.price > 0) {
            labels.push({
              start: d,
              title: '$' + booking.price,
              textColor: '#e1528f',
            });
          } else {
            invalid.push(d);
          }
        }
        setSingleLabels(labels);
        setSingleInvalid(invalid);
      },
      'jsonp',
    );
  }, []);

  const handlePageLoadingDatetime = useCallback((args) => {
    const d = args.firstDay;
    const invalid = [];
    const labels = [];

    getJson(
      'https://trial.mobiscroll.com/getbookingtime/?year=' + d.getFullYear() + '&month=' + d.getMonth(),
      (bookings) => {
        for (let i = 0; i < bookings.length; ++i) {
          const booking = bookings[i];
          const d = new Date(booking.d);

          if (booking.nr > 0) {
            labels.push({
              start: d,
              title: booking.nr + ' SPOTS',
              textColor: '#e1528f',
            });
            invalid.push(...booking.invalid);
          } else {
            invalid.push(d);
          }
        }
        setDatetimeLabels(labels);
        setDatetimeInvalid(invalid);
      },
      'jsonp',
    );
  }, []);

  const handlePageLoadingMultiple = useCallback((args) => {
    const d = args.firstDay;
    const invalid = [];
    const labels = [];

    getJson(
      'https://trial.mobiscroll.com/getbookings/?year=' + d.getFullYear() + '&month=' + d.getMonth(),
      (bookings) => {
        for (let i = 0; i < bookings.length; ++i) {
          const booking = bookings[i];
          const d = new Date(booking.d);

          if (booking.nr > 0) {
            labels.push({
              start: d,
              title: booking.nr + ' SPOTS',
              textColor: '#e1528f',
            });
          } else {
            invalid.push(d);
          }
        }
        setMultipleLabels(labels);
        setMultipleInvalid(invalid);
      },
      'jsonp',
    );
  }, []);

  const handleChangeMultiple = useCallback((args) => {
    setMultiple(args.value);
  }, []);

  return (
    <Page className="md-calendar-booking">
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Single date & appointment booking</div>
        <Datepicker
          display="inline"
          controls={['calendar']}
          min={min}
          max={max}
          labels={singleLabels}
          invalid={singleInvalid}
          pages="auto"
          onPageLoading={handlePageLoadingSingle}
        />
      </div>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Select date & time</div>
        <Datepicker
          display="inline"
          controls={['calendar', 'timegrid']}
          min={min}
          max={max}
          minTime="08:00"
          maxTime="19:59"
          stepMinute={60}
          width={null}
          labels={datetimeLabels}
          invalid={datetimeInvalid}
          onPageLoading={handlePageLoadingDatetime}
          cssClass="booking-datetime"
        />
      </div>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Booking multiple appointments</div>
        <Datepicker
          display="inline"
          controls={['calendar']}
          value={multiple}
          min={min}
          max={max}
          labels={multipleLabels}
          invalid={multipleInvalid}
          pages="auto"
          selectMultiple={true}
          onChange={handleChangeMultiple}
          onPageLoading={handlePageLoadingMultiple}
        />
      </div>
    </Page>
  );
}

export default App;
