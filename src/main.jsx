import React from 'react'
import ReactDOM from 'react-dom/client'
import { GestionApp } from './GestionApp'
import { BrowserRouter } from 'react-router-dom';
import './styles.css'


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GestionApp />
    </BrowserRouter>
  </React.StrictMode>,
)
