import React, { useEffect } from "react";
import { FaLock, FaPen, FaStar, FaTrash } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "../../../services/api";

const NoteDetailTop = ({ active, setActive, note, id, setIsNoteChanged }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    setIsNoteChanged(false);
  }, []);
  const addToFavs = async () => {
    try {
      const response = await axios.put(
        `/api/v1/note/${note.id}`,
        {
          pinned: !note.pinned,
          note_title: note.note_title,
          priority: note.priority,
          description: note.description,
          note_status: note.note_status,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setIsNoteChanged(true);
    } catch (error) {
      console.log(error);
      toast.error(
        `An error occured in note ${note.note_title} while adding to favs`
      );
    }
  };

  const deleteNote = async () => {
    try {
      const response = await axios.delete(`/api/v1/note/${note.id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      navigate("/notes");
      toast.success("Note deleted succesfully");
    } catch (error) {
      console.log(error);
      toast.error(
        `An error occured in note ${note.note_title} while trying to delete`
      );
    }
  };

  const sealNote = async () => {
    try {
      const response = await axios.put(
        `/api/v1/note/${note.id}`,
        {
          pinned: note.pinned,
          note_title: note.note_title,
          priority: note.priority,
          description: note.description,
          note_status: "SEALED",
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setIsNoteChanged(true);
    } catch (error) {
      console.log(error);
      toast.error(
        `An error occured in note ${note?.note_title} while adding to favs`
      );
    }
  };

  return (
    <div className="text-center text-[#A899D9] border-b border-[#A899D9]">
      <ul className="flex flex-wrap items-end -mb-px">
        <li className="me-2">
          <a
            href="#"
            className="flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-white transition-all"
            style={{}}
          >
            <IoMdArrowBack
              onClick={() => navigate("/notes")}
              className="w-[1.5em] h-[1.5em] cursor-pointer"
            />
          </a>
        </li>
        <li className="flex p-4 me-2 text-white transition-all font-semibold text-lg">
          {note?.note_title}
        </li>
        <li className="ml-auto me-2">
          <a
            href="#"
            className={`${
              active === "md" && "text-white border-white"
            } inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-white hover:border-white transition-all`}
            onClick={() => setActive("md")}
          >
            MD Format
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            className={`${
              active === "raw" && "text-white border-white"
            } inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 transition-all`}
            aria-current="page"
            onClick={() => setActive("raw")}
          >
            Raw Text
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            className={`${
              active === "meaningful" && "text-white border-white"
            } inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 transition-all`}
            onClick={() => setActive("meaningful")}
          >
            Meaningful Text
          </a>
        </li>
        <li className="ml-auto me-2">
          <a
            href="#"
            className="flex p-4 border-b-2 border-transparent rounded-t-lg hover:scale-125 transition-all"
          >
            <FaStar
              onClick={addToFavs}
              className="w-[1.3em] h-[1.3em] "
              style={{
                color: note?.pinned ? "#FFD700" : "#A899D9",
              }}
            />
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            className="flex p-4 border-b-2 border-transparent rounded-t-lg  hover:scale-125 transition-all"
          >
            <FaTrash onClick={deleteNote} className="w-[1.3em] h-[1.3em]" />
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            className={`flex p-4 border-b-2 border-transparent rounded-t-lg ${!(note?.note_status === "SEALED") && 'hover:scale-125'}  transition-all`}
          >
            <FaLock onClick={()=>{
              !(note?.note_status === "SEALED") && sealNote()
            }}  className="w-[1.3em] h-[1.3em]"
            style={{
              color: note?.note_status === "SEALED" ? "#FF0000" : "#A899D9",
            }}
             />
          </a>
        </li>
        {!(note?.note_status === "SEALED") && (
          <li className="me-2">
            <a
              href="#"
              className={`flex p-4 border-b-2 border-transparent rounded-t-lg  hover:scale-125 transition-all`}
            > 
              <FaPen
                onClick={() => navigate(`/notes/create/${id}`)}
                className="w-[1.3em] h-[1.3em]"
              />
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NoteDetailTop;
