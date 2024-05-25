import React from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import useLogout from "../../../hooks/useLogout";

const Navbar = () => {
  const logout = useLogout();
  return (
    <div className='w-full px-5 sm:px-12 py-3 flex items-center justify-between' style={{
        background: 'linear-gradient(to top right, #4A00E0 7%, #8E2DE2 94%)'
    }}>
      <h1 className='text-white text-xl sm:text-3xl font-bold'>TALK2NOTE</h1>
      <button 
      onClick={logout}
      className='flex items-center gap-1 text-white text-base sm:text-lg bg-transparent border-white border-2  font-semibold px-3 py-2 rounded-[50px]'>
        <BiLogOutCircle className='w-[1.3em] h-[1.3em] sm:w-[1.8em] sm:h-[1.8em] rounded-full py-[3px]  sm:py-[6px]'/>
        Log out
      </button>
    </div>
  )
}

export default Navbar
