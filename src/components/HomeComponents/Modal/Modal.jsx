import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "../../../services/api";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useNote from "../../../hooks/useNote";

export default function Modal({ isOpen, onClose, setIsChanged }) {
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    noteType: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    setIsChanged(false);
  }, []);


  useEffect(() => {
    console.log(formData);
  }, [formData]);

  if (!isOpen) return null;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNoteSave = async () => {
    setLoading(true);
    if (!formData.title) {
      toast.error("Title can not be empty!");
      setLoading(false);
      return;
    }

    if (!formData.description) {
      toast.error("Description can not be empty!");
      setLoading(false);
      return;
    }

    if (!formData.priority && formData.priority !== "Choose a priority") {
      toast.error("Please choose a priority !");
      setLoading(false);
      return;
    }

    if (!formData.noteType && formData.noteType !== "Choose a note type") {
      toast.error("Please choose a note type !");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "/api/v1/note",
        {
          priority: formData.priority,
          description: formData.description,
          note_title: formData.title,
          note_type: formData.noteType,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setFormData({
        title: "",
        priority: "",
        noteType: "",
        description: "",
      });
      setLoading(false);
      setIsChanged(true);
      console.log(lastEl)
      onClose();
      
    } catch (err) {
      toast.error("An error occured");
      setLoading(false);
    }
  };

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
            className="bg-transparent border border-[#A899D9] rounded px-3 py-2 focus:outline-none"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <select
            name="priority"
            id="priority"
            className="bg-transparent border border-[#A899D9] rounded px-3 py-2 pr-12 focus:outline-none"
            value={formData.priority}
            onChange={handleInputChange}
          >
            <option defaultValue>Choose a priorty</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <select
            name="noteType"
            id="noteType"
            className="!bg-transparent !border !border-[#A899D9] rounded px-3 py-2 pr-12 focus:outline-none "
            value={formData.noteType}
            onChange={handleInputChange}
          >
            <option defaultValue>Choose a note type</option>
            <option value="DEVELOPER">Developer</option>
            <option value="MATHEMATICIAN">Mathematician</option>
            <option value="HISTORIAN">Historian</option>
          </select>
          <textarea
            placeholder="Description"
            className="bg-transparent h-36 resize-none border border-[#A899D9] rounded px-3 py-2 focus:outline-none"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <button
          onClick={handleNoteSave}
          className="w-full border rounded border-[#A899D9] hover:bg-[#A899D9] transition-all py-2 hover:"
        >
          Create
        </button>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
