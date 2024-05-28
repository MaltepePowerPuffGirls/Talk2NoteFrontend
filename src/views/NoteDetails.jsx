import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLoading from "../hooks/useLoading";
import useAuth from "../hooks/useAuth";
import axios from "../services/api";
import LoadingSpinner from "../components/CommonComponents/Loading/Loading";
import NoteTitle from "../components/NoteComponents/NoteTitle/NoteTitle";
import { IoMdArrowBack } from "react-icons/io";
import { FaStar, FaTrash } from "react-icons/fa";
import NoteDetailTop from "../components/NoteComponents/NoteDetailTop/NoteDetailTop";
import MDBlock from "../components/NoteComponents/MDBlock/MDBlock";
import NoteBlock from "../components/NoteComponents/NoteBlock/NoteBlock";

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState();
  const { auth } = useAuth();
  const [active, setActive] = useState("md");
  const [isNoteChanged, setIsNoteChanged] = useState();

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

  useEffect(() => {
    isNoteChanged && getOneNote();
  }, [isNoteChanged]);

  return (
    <div className="px-12 mt-5 flex flex-col gap-5 text-white pb-12">
      {isLoading ? (
        <div className="w-full h-[calc(100vh-85px)] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
        <NoteDetailTop setIsNoteChanged={setIsNoteChanged} note={note} id={id} active={active} setActive={setActive}/>
        {
          active === "md" ? <MDBlock markdownText={note?.markdown_text} /> : active === "meaningful" ?
          note?.text_blocks.map((block)=>(
            <NoteBlock text={block.meaningful_text}/>
          ))
          : active === "raw" ?       note?.text_blocks.map((block)=>(
            <NoteBlock text={block.raw_text}/>
          )) : ""
        }
        </>
      )}
    </div>
  );
};

export default NoteDetails;
