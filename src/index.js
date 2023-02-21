import { Provider } from 'react-redux';
import React from 'react';
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';
import { App } from 'components/App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
