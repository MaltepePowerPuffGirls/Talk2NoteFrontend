import React from 'react'
import { FaStar } from 'react-icons/fa'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const NoteTitle = ({title, noteStatus, id}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
    <div className="flex items-center justify-center gap-6">
      <IoMdArrowBack
        onClick={() => navigate(`/notes/${id}`)}
        className="w-[1.5em] h-[1.5em] cursor-pointer"
      />
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
    {noteStatus}
  
  </div>
  )
}

export default NoteTitle
