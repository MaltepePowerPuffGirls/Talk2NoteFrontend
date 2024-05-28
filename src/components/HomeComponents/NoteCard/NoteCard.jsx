import axios from '../../../services/api';
import React, { useEffect } from 'react'
import { FaStar, FaTrash } from 'react-icons/fa'

import { useNavigate } from 'react-router-dom';

const NoteCard = ({ note, setIsChanged }) => {
  const today = new Date();
  const modifiedDate = new Date(note.modified_at);
  const differenceInTime = today.getTime() - modifiedDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  const modifiedText = differenceInDays === 0 ? "Today" : `${differenceInDays} days ago`;
  const navigate = useNavigate();

  useEffect(()=>{
    setIsChanged(false);
  }, [])
  return (
    <div onClick={()=>navigate(`/notes/${note.id}`)}  className=" note-card col-span-12 flex items-center justify-center cursor-pointer sm:col-span-3 relative bg-transparent border-2 border-[#A899D9] text-white rounded-[20px] px-5 py-20 " style={{
    }}>
      <div className='front absolute flex flex-col items-center gap-2 p-5'>
        <h2 className="text-lg font-bold text-white">{note.note_title}</h2>
        <p className="font-bold text-xs text-[#A899D9]">{modifiedText}</p>
      </div>
      <div className='back absolute flex flex-col items-center gap-2 p-5'>
        <p>{note.description}</p>
      </div>
      <div className='absolute top-5 right-5 flex items-center justify-center gap-2'>
        <FaStar className='w-[1.2em] h-[1.2em]' style={{
          color: note.pinned ? "#FFD700" : "#A899D9"
        }}
        />

      </div>
      </div>
  )
}

export default NoteCard
