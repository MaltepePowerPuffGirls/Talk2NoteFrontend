import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Modal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    noteType: "",
    description: ""
  })

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNoteSave = () => {
    onClose();
    navigate('/create-note/1')
  }

  return createPortal(
    <div className="fixed z-[10] top-0 left-0 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden">
      <div className="modal-container bg-[#440182] rounded text-white mx-auto my-[6%] p-[30px] py-5 w-[400px] relative flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">Create Note</h2>
          <IoCloseCircleOutline
            onClick={onClose}
            className="w-[1.7em] h-[1.7em] cursor-pointer"
          />
        </div>
        <div className="inputs flex flex-col gap-6">
          <input
            placeholder="Title"
            className="bg-transparent border border-white rounded px-3 py-2 focus:outline-none"
            name= "title"
            id= "title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <select
            name="priority"
            id="priority"
            className="bg-transparent border border-white rounded px-3 py-2 pr-12 focus:outline-none"
            value={formData.priority}
            onChange={handleInputChange}
          >
            <option selected>Choose a priorty</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <select
            name="noteType"
            id="noteType"
            className="bg-transparent border border-white rounded px-3 py-2 pr-12 focus:outline-none "
            value={formData.noteType}
            onChange={handleInputChange}
          >
            <option >Choose a note type</option>
            <option value="DEVELOPER">Developer</option>
            <option value="MATHEMATICIAN">Mathematician</option>
            <option value="HISTORIAN">Historian</option>
          </select>
          <textarea
            placeholder="Description"
            className="bg-transparent h-36 resize-none border border-white rounded px-3 py-2 focus:outline-none"
            name= "description"
            id= "description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleNoteSave} className="w-full border rounded border-white py-2 hover:">
          Create
        </button>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
