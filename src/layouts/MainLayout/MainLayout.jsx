import React from 'react'
import Navbar from '../../components/CommonComponents/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='min-h-screen w-screen bg-home bg-cover'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default MainLayout
