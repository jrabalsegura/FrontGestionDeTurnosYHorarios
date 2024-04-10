import React from 'react'
import ReactDOM from 'react-dom/client'
import { GestionApp } from './GestionApp'
import { BrowserRouter } from 'react-router-dom';
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GestionApp />
    </BrowserRouter>
  </React.StrictMode>,
)
