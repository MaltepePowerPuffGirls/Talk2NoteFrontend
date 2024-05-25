import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'
import { NoteProvider } from './context/NoteProvider.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <NoteProvider>
        <App />
      </NoteProvider>
    </AuthProvider>
  </BrowserRouter>

)
