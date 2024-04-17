import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './views/Login'
import { ToastContainer } from 'react-toastify'
import Register from './views/Register'

function App() {
  return (
    <div className="">
      <Routes>

        {/* Public Routes */}
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

        {/* Protected Routes */}
      </Routes>

      <ToastContainer />
    </div>
  )
}

export default App
