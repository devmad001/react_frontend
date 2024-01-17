import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "@mui/material";
import landingDefaultTheme from "./themes/landingTheme";
import App from './App';

import { Provider } from 'react-redux';
import { configStore } from './store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={configStore()}>
      <ThemeProvider theme={landingDefaultTheme}>
        <App />
      </ThemeProvider>
    </Provider>

  </React.StrictMode>
);
