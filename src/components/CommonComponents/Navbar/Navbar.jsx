import React from 'react'
import { BiLogOutCircle } from "react-icons/bi";

const Navbar = () => {
  return (
    <div className='w-full px-5 sm:px-12 py-3 flex items-center justify-between' style={{
        background: 'linear-gradient(to top right, #4A00E0 7%, #8E2DE2 94%)'
    }}>
      <h1 className='text-white text-xl sm:text-3xl font-bold'>TALK2NOTE</h1>
      <button className='flex items-center gap-3 text-white text-base sm:text-xl font-semibold px-3 py-2 rounded-[50px]' style={{
        background: 'linear-gradient(to top right, #ED213A 7%, #93291E 94%)',
        boxShadow: '0px 4px 4px #00000040'   
      }}>
        <BiLogOutCircle className='w-[1.3em] h-[1.3em] sm:w-[1.8em] sm:h-[1.8em] bg-[rgba(0,0,0,0.3)] rounded-full py-[3px]  sm:py-[6px]'/>
        Log out
      </button>
    </div>
  )
}

export default Navbar
