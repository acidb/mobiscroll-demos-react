import { Button, Datepicker, Page, setOptions, Toast /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useState } from 'react';
import './presets.css';

setOptions({
  // localeJs,
  // themeJs
});

const now = new Date();
const curr = new Date();
const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const startWeek = new Date(curr.setDate(curr.getDate() - curr.getDay()));
const endWeek = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
const startMonth = new Date(curr.getFullYear(), curr.getMonth() - 1, 1);
const endMonth = new Date(curr.getFullYear(), curr.getMonth(), 0);

function App() {
  const [value, setValue] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [toastMsg, setMsg] = useState('');

  const openToast = useCallback((message) => {
    setMsg(message);
    setOpen(true);
  }, []);

  const handleCloseToast = useCallback(() => {
    setOpen(false);
  }, []);

  const setToday = useCallback(() => {
    setValue([now, now]);
    openToast('Today Selected');
  }, [openToast]);

  const setYesterday = useCallback(() => {
    setValue([yesterday, yesterday]);
    openToast('Yesterday Selected');
  }, [openToast]);

  const setWeek = useCallback(() => {
    setValue([startWeek, endWeek]);
    openToast('This Week Selected');
  }, [openToast]);

  const setMonth = useCallback(() => {
    setValue([startMonth, endMonth]);
    openToast('Last Mont Selected');
  }, [openToast]);

  const clear = useCallback(() => {
    setValue(null);
    openToast('Clear Value');
  }, [openToast]);

  return (
    <Page className="md-range-filter">
      <h4 className="md-header">Filter Results by</h4>
      <div className="mbsc-padding">
        <Button onClick={setToday} className="mbsc-button-block">
          Today
        </Button>
        <Button onClick={setYesterday} className="mbsc-button-block">
          Yesterday
        </Button>
        <Button onClick={setWeek} className="mbsc-button-block">
          This Week
        </Button>
        <Button onClick={setMonth} className="mbsc-button-block">
          Last Month
        </Button>
        <Button onClick={clear} className="mbsc-button-block">
          Clear
        </Button>
      </div>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Or by a custom range</div>
        <Datepicker select="range" display="inline" showRangeLabels={false} value={value} />
      </div>
      <Toast message={toastMsg} isOpen={isOpen} onClose={handleCloseToast} />
    </Page>
  );
}

export default App;
