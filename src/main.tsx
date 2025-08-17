import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';
import { ScoreProvider } from './context/ScoreContext';


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScoreProvider>
        <App />
      </ScoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);