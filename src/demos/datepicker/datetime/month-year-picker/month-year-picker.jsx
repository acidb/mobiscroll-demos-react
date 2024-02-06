import { Datepicker, Input, Page, setOptions /* localeImport */ } from '@mobiscroll/react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const now = new Date();
  const until = new Date(now.getFullYear() + 10, now.getMonth());

  return (
    <Page>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Add a new credit card</div>
        <Input label="Name" placeholder="Required"></Input>
        <Input label="Card" placeholder="Credit card number"></Input>
        <Datepicker
          controls={['date']}
          dateFormat="MM/YYYY"
          dateWheels="MMMM YYYY"
          defaultValue="12/2025"
          min={now}
          max={until}
          label="Expiration"
          placeholder="Required"
        ></Datepicker>
        <Input label="Security" placeholder="3-digit CVV"></Input>
      </div>
    </Page>
  );
}

export default App;
