import React from 'react'
import { FaStar } from 'react-icons/fa'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const NoteTitle = ({title, noteStatus, changeStatus}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
    <div className="flex items-center justify-center gap-6">
      <IoMdArrowBack
        onClick={() => navigate("/notes")}
        className="w-[2em] h-[2em] cursor-pointer"
      />
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
    {noteStatus}
    <div className='flex items-center justify-center gap-6'>
 
    <button
      className="rounded-[15px] border-2 border-[#A899D9] py-2 px-6 font-semibold text-lg flex items-center justify-center gap-2 text-[#FFD700]"
    >
      Favorite
      <FaStar />
    </button>
    </div>

  </div>
  )
}

export default NoteTitle
