import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

import { ContextProvider } from "./contexts/ContextsProvider.jsx";
import { SocketContextProvider } from './contexts/SocketContext.jsx';

ReactDOM.render(
  <ContextProvider>
    <SocketContextProvider>

      <App />
    </SocketContextProvider>
  </ContextProvider>,
  document.getElementById('root')
);
