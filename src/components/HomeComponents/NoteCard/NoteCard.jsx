import axios from '../../../services/api';
import React, { useEffect } from 'react'
import { FaStar, FaTrash } from 'react-icons/fa'
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const NoteCard = ({ note, setIsChanged }) => {
  const today = new Date();
  const modifiedDate = new Date(note.modified_at);
  const differenceInTime = today.getTime() - modifiedDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  const modifiedText = differenceInDays === 0 ? "Today" : `${differenceInDays} days ago`;
  const { auth } = useAuth();

  const addToFavs = async () => {
    try {
      const response = await axios.put(`/api/v1/note/${note.id}`, {
        pinned: !note.pinned,
        note_title: note.note_title,
        priority: note.priority,
        description: note.description,
        note_status: note.note_status
      },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    setIsChanged(true)
    } catch (error) {
      console.log(error)
      toast.error(`An error occured in note ${note.note_title} while adding to favs`)
    }

  }

  const deleteNote = async () => {
    try {
      const response = await axios.delete(`/api/v1/note/${note.id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setIsChanged(true)
    } catch (error) {
      console.log(error)
      toast.error(`An error occured in note ${note.note_title} while trying to delete`)
    }
  };
  
  useEffect(()=>{
    setIsChanged(false);
  }, [])
  return (
    <div className=" note-card col-span-12 flex items-center justify-center cursor-pointer sm:col-span-3 relative bg-transparent border-2 border-[#A899D9] text-white rounded-[20px] px-5 py-20 " style={{
    }}>
      <div className='front absolute flex flex-col items-center gap-2'>
        <h2 className="text-lg font-bold text-white">{note.note_title}</h2>
        <p className="font-bold text-xs text-[#A899D9]">{modifiedText}</p>
      </div>
      <div className='back absolute flex flex-col items-center gap-2'>
        <p>{note.description}</p>
      </div>
      <div className='absolute top-5 right-5 flex items-center justify-center gap-2'>
        <FaStar className='w-[1.2em] h-[1.2em] hover:scale-125 transition-all' style={{
          color: note.pinned ? "#FFD700" : "#A899D9"
        }}
        onClick={addToFavs}
        />
        <FaTrash className='w-[1.2em] h-[1.2em] text-[#A899D9]  hover:scale-125 transition-all'
        onClick={deleteNote}
        />
      </div>
      </div>
  )
}

export default NoteCard
