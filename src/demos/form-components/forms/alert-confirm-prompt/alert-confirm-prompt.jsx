import { Alert, Button, Confirm, Page, Prompt, setOptions /* localeImport */ } from '@mobiscroll/react';
import { useCallback, useState } from 'react';

setOptions({
  // localeJs,
  // themeJs
});

function App() {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isPromptOpen, setPromptOpen] = useState(false);

  const showAlert = useCallback(() => {
    setAlertOpen(true);
  }, []);

  const showConfirm = useCallback(() => {
    setConfirmOpen(true);
  }, []);

  const showPrompt = useCallback(() => {
    setPromptOpen(true);
  }, []);

  const closeAlert = useCallback(() => {
    setAlertOpen(false);
  }, []);

  const closeConfirm = useCallback(() => {
    setConfirmOpen(false);
  }, []);

  const closePrompt = useCallback((value) => {
    setPromptOpen(false);
    console.log('The password is: ' + value);
  }, []);

  return (
    <Page>
      <Alert
        title='Cellular Data is Turned Off for "Safari"'
        message="You can turn on cellular data for this app in Settings."
        isOpen={isAlertOpen}
        onClose={closeAlert}
      />
      <Confirm
        title="Use location service?"
        message="Help apps determinde location. This means sending anonymous location data, even when no apps are running."
        okText="Agree"
        cancelText="Disagree"
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
      />
      <Prompt
        title="Sign in to iTunes Store"
        message='Enter the Apple ID password for "hello@mobiscroll.com".'
        placeholder="Password"
        inputType="password"
        isOpen={isPromptOpen}
        onClose={closePrompt}
      />
      <Button onClick={showAlert}>Alert</Button>
      <Button onClick={showConfirm}>Confirm</Button>
      <Button onClick={showPrompt}>Prompt</Button>
    </Page>
  );
}

export default App;
