import React, { useEffect, useState } from "react";
import { FaSearch, FaStar, FaTrash } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosCopy } from "react-icons/io";
import Modal from "../components/HomeComponents/Modal/Modal";
import NoteCard from "../components/HomeComponents/NoteCard/NoteCard";
import axios from "../services/api";
import useNote from "../hooks/useNote";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import LoadingSpinner from "../components/CommonComponents/Loading/Loading";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notes, setNotes } = useNote();
  const { auth } = useAuth();
  const [isChanged, setIsChanged] = useState();

  const fetchNotes = async () => {
    const noteResponse = await axios.get("/api/v1/note", {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    return noteResponse.data.data;
  };

  const { execute: getAllNotes, isLoading, error } = useLoading(fetchNotes);

  const getNotes = () => {
    getAllNotes()
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    if (notes.length < 1) {
      getNotes();
    }
  }, []);

  useEffect(() => {
    isChanged && getNotes();
  }, [isChanged]);

  return (
    <div className="px-12 mt-5 flex flex-col gap-5">
      <div className="search-area flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-4">
          <div className="relative">
            <input
              className="pl-10 peer text-base transition-all group-first focus:placeholder-white bg-transparent border-2 border-[#A899D9] rounded-[15px] py-2 pr-4 focus:outline-none placeholder-[#A899D9] font-semibold text-white"
              placeholder="Search for a note"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-[#A899D9] peer-focus:text-white" />
            </div>
          </div>

          <button className="flex items-center justify-center gap-3 text-base text-white">
            <IoFilterSharp />
            Filter
          </button>
        </div>
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-[15px] text-white py-2 px-3 font-semibold text-base flex items-center justify-center gap-2 border-2 border-[#A899D9]"
          >
            <IoIosCopy />
            New Note
          </button>
        </div>
      </div>

      <div className="note-area w-full grid grid-cols-12 gap-12">
        {isLoading ? (
          <div className="w-screen h-[calc(100vh-250px)] ml-[-30px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) :
        (
          notes?.map((note)=>(
            <NoteCard key={note.id} note={note} setIsChanged={setIsChanged}/>
          ))
        )
      }
      </div>
      <Modal setIsChanged={setIsChanged} isOpen={isOpen} onClose={() => setIsOpen(false)}></Modal>
    </div>
  );
};

export default Home;
