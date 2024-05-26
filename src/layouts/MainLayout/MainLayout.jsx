import React from 'react'
import Navbar from '../../components/CommonComponents/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='min-h-screen max-w-screen bg-home bg-cover pb-20'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default MainLayout
