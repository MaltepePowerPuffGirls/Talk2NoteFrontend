import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useLoading from '../hooks/useLoading';
import useAuth from '../hooks/useAuth';
import axios from "../services/api";

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note,setNote] = useState();
  const { auth } = useAuth();

  const fetchNote = async () => {
    const noteResponse = await axios.get(`/api/v1/note/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    return noteResponse.data.data;
  };

  const { execute: getNote, isLoading, error } = useLoading(fetchNote);

  const getOneNote = () => {
    getNote()
      .then((data) => {
        setNote(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    getOneNote();
  }, []);
  
  return (
    <div>
        { id }
        <button onClick={()=>navigate(`/notes/create/${id}`)}>
            Edit
        </button>
    </div>
  )
}

export default NoteDetails
