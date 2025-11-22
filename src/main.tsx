// src/main.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { LivesProvider } from './contexts/LivesContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <LivesProvider>
       <App />
    </LivesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)