import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Login from './views/Login'
import { ToastContainer } from 'react-toastify'
import Register from './views/Register'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
    if ( location.pathname === "/"){
      navigate('/login')
    }
  },[])
  return (
    <div className="overflow-x-hidden">
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
