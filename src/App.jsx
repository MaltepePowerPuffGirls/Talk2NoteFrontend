import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './views/Login'
import { ToastContainer } from 'react-toastify'
import Register from './views/Register'
import AuthLayout from './layouts/AuthLayout/AuthLayout'

function App() {
  return (
    <div className="">
      <Routes>

        {/* Public Routes */}
        <Route element={<AuthLayout/>}>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Route>

        {/* Protected Routes */}
      </Routes>

      <ToastContainer />
    </div>
  )
}

export default App
