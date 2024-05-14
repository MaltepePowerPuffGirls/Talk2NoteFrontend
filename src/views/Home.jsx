import React, { useState } from "react";
import { FaSearch, FaStar, FaTrash } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosCopy } from "react-icons/io";
import Modal from "../components/HomeComponents/Modal/Modal";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-12 mt-5 flex flex-col gap-5">
      <div className="search-area flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-4">
          <div className="relative">
            <input
              className="pl-10 bg-[rgba(0,0,0,0.3)] rounded-[15px] py-2 pr-4 focus:outline-none placeholder-[#A9A9A9] font-semibold text-white"
              placeholder="Search for a note"
            />
            <div
              class="absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none"
            >
              <FaSearch className="text-[#B1B1B1]" />
            </div>
          </div>

          <button className="flex items-center justify-center gap-3 text-lg text-white">
            <IoFilterSharp />
            Filter
          </button>
        </div>
        <div>
          <button
          onClick={()=>setIsOpen(true)}
          className="rounded-[15px] text-white py-2 px-3 font-semibold text-lg flex items-center justify-center gap-2"
            style={{
              background:
                "linear-gradient(to right, #12C2E9 0%, #C471ED 46%, #F64F59 100%)",
            }}
          >
            <IoIosCopy/>
            New Note
          </button>
        </div>
      </div>

      <div className="note-area w-full grid grid-cols-12 gap-12">
        <div className="col-span-12 cursor-pointer sm:col-span-4 relative bg-white rounded-[20px]  px-5 flex flex-col py-20 text-[#4D008A] items-center justify-center gap-3" style={{
          background: 'linear-gradient(to top right, #C8A2C8 7%, #D8BFD8 94%)',
      }}>
          <div className="icons cursor-pointer absolute top-5 right-5 flex items-center justify-center gap-6 ">
            <FaStar className="w-[1.5em] h-[1.5em]"/>
            <FaTrash className="w-[1.5em] h-[1.5em]"/>
          </div>
          <h2 className="text-2xl font-bold">Note Name 1</h2>
          <p className="font-bold text-sm text-[#76009F]">Lorem ipsum...</p>
        </div>
        <div className="col-span-12 cursor-pointer sm:col-span-4 relative bg-white rounded-[20px]  px-5 flex flex-col py-20 text-[#4D008A] items-center justify-center gap-3" style={{
          background: 'linear-gradient(to top right, #C8A2C8 7%, #D8BFD8 94%)',
      }}>
          <div className="icons cursor-pointer absolute top-5 right-5 flex items-center justify-center gap-6 ">
            <FaStar className="w-[1.5em] h-[1.5em]"/>
            <FaTrash className="w-[1.5em] h-[1.5em]"/>
          </div>
          <h2 className="text-2xl font-bold">Note Name 2</h2>
          <p className="font-bold text-sm text-[#76009F]">Lorem ipsum...</p>
        </div>
        <div className="col-span-12 cursor-pointer sm:col-span-4 relative bg-white rounded-[20px]  px-5 flex flex-col py-20 text-[#4D008A] items-center justify-center gap-3" style={{
          background: 'linear-gradient(to top right, #C8A2C8 7%, #D8BFD8 94%)',
      }}>
          <div className="icons cursor-pointer absolute top-5 right-5 flex items-center justify-center gap-6 ">
            <FaStar className="w-[1.5em] h-[1.5em]"/>
            <FaTrash className="w-[1.5em] h-[1.5em]"/>
          </div>
          <h2 className="text-2xl font-bold">Note Name 3</h2>
          <p className="font-bold text-sm text-[#76009F]">Lorem ipsum...</p>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}></Modal>

    </div>
  );
};

export default Home;
  