import { Datepicker, Input, Page, Radio, RadioGroup, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useMemo, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

const now = new Date();
const min = now;
const max = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());

function nrOfValues(instance) {
  const tempVal = (instance && instance.getTempVal()) || [];
  return tempVal.filter((v) => v).length;
}

function App() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [startInv, setStartInv] = useState(null);
  const [endInv, setEndInv] = useState(null);
  const [startBooking, setStartBooking] = useState(null);
  const [endBooking, setEndBooking] = useState(null);
  const [bookingType, setBookingType] = useState('round');
  const [inst, setInst] = useState(null);
  const [val, setVal] = useState();
  const [disabled, setDisabled] = useState(nrOfValues(inst) === 0);

  const invalid = useMemo(
    () => [
      {
        recurring: {
          repeat: 'weekly',
          weekDays: 'TU,TH',
        },
      },
      new Date(now.getFullYear(), now.getMonth(), 25),
    ],
    [],
  );

  const selectType = useMemo(() => (bookingType === 'oneway' ? 'date' : 'range'), [bookingType]);

  const bookingTypeChange = useCallback((ev) => {
    setBookingType(ev.target.value);
  }, []);

  const valChange = useCallback((ev) => {
    setVal(ev.value);
  }, []);

  const changeTripType = useCallback(() => {
    setDisabled(nrOfValues(inst) < 1);
  }, [inst]);

  const buttons = useMemo(
    () => [
      'cancel',
      {
        disabled,
        handler: () => {
          const [start] = inst.getTempVal();
          setVal([start, null]);
          inst.close();
        },
        text: 'One way only',
      },
      'set',
    ],
    [disabled, inst],
  );

  return (
    <Page>
      <div className="mbsc-grid mbsc-no-padding">
        <div className="mbsc-row">
          <div className="mbsc-col-sm-12">
            <Datepicker
              select="range"
              min={min}
              max={max}
              pages={2}
              label="Pick your flight"
              inputStyle="outline"
              labelStyle="stacked"
              placeholder="Please select..."
            />
          </div>
        </div>

        <div className="mbsc-row">
          <div className="mbsc-col-6">
            <Datepicker controls={['calendar']} select="range" startInput={start} endInput={end} min={min} max={max} pages={2} />
            <Input ref={setStart} label="Outbound" inputStyle="outline" labelStyle="stacked" placeholder="Please Select..." />
          </div>
          <div className="mbsc-col-6">
            <Input ref={setEnd} label="Return" inputStyle="outline" labelStyle="stacked" placeholder="Please Select..." />
          </div>
        </div>

        <div className="mbsc-row">
          <div className="mbsc-col-6">
            <Datepicker
              select="range"
              startInput={startInv}
              endInput={endInv}
              min={min}
              max={max}
              pages={2}
              invalid={invalid}
              inRangeInvalid={true}
            />
            <Input ref={setStartInv} label="Outbound" inputStyle="outline" labelStyle="stacked" placeholder="Please Select..." />
          </div>
          <div className="mbsc-col-6">
            <Input ref={setEndInv} label="Return" inputStyle="outline" labelStyle="stacked" placeholder="Please Select..." />
          </div>
        </div>

        <div className="mbsc-row">
          <RadioGroup name="flight-booking-type" theme="material" themeVariant="light">
            <Radio
              value="round"
              checked={bookingType === 'round'}
              onChange={bookingTypeChange}
              label="Round trip"
              theme="material"
              themeVariant="light"
            />
            <Radio
              value="oneway"
              checked={bookingType === 'oneway'}
              onChange={bookingTypeChange}
              label="One way"
              theme="material"
              themeVariant="light"
            />
          </RadioGroup>
        </div>
        <div className="mbsc-row">
          <div className="mbsc-col-6">
            <Datepicker
              select={selectType}
              startInput={startBooking}
              endInput={endBooking}
              min={min}
              max={max}
              pages={2}
              label="Outbound"
              inputStyle="outline"
              labelStyle="stacked"
              placeholder="Please Select..."
            />
            {selectType === 'range' && (
              <Input ref={setStartBooking} label="Outbound" inputStyle="outline" labelStyle="stacked" placeholder="Please Select..." />
            )}
          </div>
          <div className="mbsc-col-6">
            <Input
              ref={setEndBooking}
              label="Return"
              inputStyle="outline"
              labelStyle="stacked"
              placeholder="Please Select..."
              disabled={bookingType === 'oneway'}
            />
          </div>
        </div>

        <div className="mbsc-row">
          <div className="mbsc-col-12">
            <Datepicker
              select="range"
              min={min}
              max={max}
              pages={2}
              ref={setInst}
              buttons={buttons}
              value={val}
              onChange={valChange}
              onTempChange={changeTripType}
              label="Pick your flight"
              inputStyle="outline"
              labelStyle="stacked"
              placeholder="Please select..."
            />
          </div>
        </div>
      </div>
    </Page>
  );
}

export default App;
