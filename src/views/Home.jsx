import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
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
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const fetchNotes = async () => {
    const noteResponse = await axios.get("/api/v1/note", {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    return noteResponse.data.data;
  };

  const sortNotes = (notes) => {
    if (sortOrder === "newest") {
      return notes.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (sortOrder === "oldest") {
      return notes.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    } else {
      return notes.sort((a, b) => {
        if (a.pinned && !b.pinned) {
          return -1;
        } else if (!a.pinned && b.pinned) {
          return 1;
        } else {
          return new Date(b.created_at) - new Date(a.created_at);
        }
      });
    }
  };

  const filterNotes = (notes) => {
    if (searchTerm) {
      return notes.filter((note) =>
        note.note_title
          .toLowerCase()
          .trim()
          .includes(searchTerm.toLowerCase().trim())
      );
    }
    if (filter === "starred") {
      return notes.filter((note) => note.pinned);
    } else if (filter === "unstarred") {
      return notes.filter((note) => !note.pinned);
    } else if (filter === "all") {
      return notes.sort((a, b) => {
        if (a.pinned && !b.pinned) {
          return -1;
        } else if (!a.pinned && b.pinned) {
          return 1;
        } else {
          return new Date(b.created_at) - new Date(a.created_at);
        }
      });
    }
    return notes;
  };

  const { execute: getAllNotes, isLoading, error } = useLoading(fetchNotes);

  const getNotes = () => {
    getAllNotes()
      .then((data) => {
        let filteredNotes = filterNotes(data);
        let sortedNotes = sortNotes(filteredNotes);
        setNotes(sortedNotes);
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
    getNotes();
  }, [filter, sortOrder, searchTerm]);

  useEffect(() => {
    isChanged && getNotes();
  }, [isChanged]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (newFilter === "all") {
      setSortOrder("default");
    }
  };

  const handleSortOrderChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setFilter("none");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="px-5 sm:px-12 mt-5 flex flex-col gap-6 sm:gap-12">
      <div className="search-area flex sm:flex-row flex-col items-center justify-between w-full sm:w-auto">
        <div className="flex sm:flex-row flex-col items-center justify-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <input
              className="pl-10 peer text-sm sm:text-base w-full sm:w-auto transition-all group-first focus:placeholder-white bg-transparent border-2 border-[#A899D9] rounded-[15px] py-2 pr-4 focus:outline-none placeholder-[#A899D9] font-semibold text-white"
              placeholder="Search for a note"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-[#A899D9] peer-focus:text-white" />
            </div>
          </div>

          <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center gap-3 text-sm sm:text-base border-2 border-[#A899D9] sm:border-0  text-white rounded-[15px] py-2 px-4 w-full"
            >
              <IoFilterSharp />
              Filter
            </button>
            {isDropdownOpen && (
              <div className="absolute text-sm sm:text-base mt-2 w-48 border border-[#A899D9] bg-[#33126E] text-white shadow-lg rounded-md z-10">
                <button
                  onClick={() => {
                    handleFilterChange("all");
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:text-[#A899D9]"
                >
                  All Notes
                </button>
                <button
                  onClick={() => {
                    handleFilterChange("starred");
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:text-[#A899D9]"
                >
                  Starred
                </button>
                <button
                  onClick={() => {
                    handleSortOrderChange("newest");
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:text-[#A899D9]"
                >
                  Newest to oldest
                </button>
                <button
                  onClick={() => {
                    handleSortOrderChange("oldest");
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:text-[#A899D9]"
                >
                  Oldest to newest
                </button>
                <button
                  onClick={() => {
                    handleFilterChange("unstarred");
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:text-[#A899D9]"
                >
                  Unstarred
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-full sm:w-auto mt-4 sm:mt-0">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-[15px] text-white py-2 px-3 font-semibold flex items-center justify-center gap-2 border-2 border-[#A899D9] w-full sm:w-auto text-sm sm:text-base"
          >
            <IoIosCopy />
            New Note
          </button>
        </div>
      </div>

      <div className="sm:w-full grid grid-cols-12 xl:gap-24 sm:gap-12 lg:gap-6 gap-8">
        {isLoading ? (
          <div className="w-screen h-[calc(100vh-250px)] ml-[-30px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : notes?.length > 0 ? (
          notes.map((note) => (
            <NoteCard key={note.id} note={note} setIsChanged={setIsChanged} />
          ))
        ) : (
        <div className="text-white text-2xl text-center col-span-12">
            No notes found.
          </div>
        )}
          
      </div>
      <Modal
        setIsChanged={setIsChanged}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      ></Modal>
    </div>
  );
};

export default Home;
