import React from 'react'
import ReactDOM from 'react-dom/client'
import { GestionApp } from './GestionApp'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <GestionApp />
    </HashRouter>
  </React.StrictMode>,
)
