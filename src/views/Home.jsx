import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosCopy } from "react-icons/io";

const Home = () => {
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
        <div className="col-span-4 bg-white">a</div>
        <div className="col-span-4 bg-red-100">b</div>
        <div className="col-span-4 bg-blue-500">c</div>
      </div>
    </div>
  );
};

export default Home;
  