import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import '@mobiscroll/print/dist/css/mobiscroll.min.css';
import './App.css';

import { demos, demoTitleMap } from './Demos';
import Home from './pages/Home';
import Root from './pages/Root';

const routes = [{ path: '/', element: <Home /> }];

for (const main of demos) {
  for (const sub of main.items) {
    for (const group of sub.items) {
      for (const demo of group.items) {
        const path = `/${main.unique}/${sub.unique}/${demo.unique}`;
        demoTitleMap[path] = demo.name;
        routes.push({ path, element: <demo.component /> });
      }
    }
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: routes,
  },
]);

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

export default App;
