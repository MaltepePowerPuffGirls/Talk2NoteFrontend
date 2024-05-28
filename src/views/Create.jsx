import React, { useState, useEffect } from "react";
import { FaMicrophone, FaSquare, FaStar } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useSpeechToText from "../hooks/useSpeechToText";
import useLoading from "../hooks/useLoading";
import useAuth from "../hooks/useAuth";
import axios from "../services/api";
import NoteTitle from "../components/NoteComponents/NoteTitle/NoteTitle";
import RecordBlock from "../components/NoteComponents/RecordBlock/RecordBlock";
import NoteBlock from "../components/NoteComponents/NoteBlock/NoteBlock";
import LoadingSpinner from "../components/CommonComponents/Loading/Loading";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("");
  const [note, setNote] = useState();
  const { id } = useParams();
  const { auth } = useAuth();
  const [blockData, setBlockData] = useState([]);
  const [isEdited, setIsEdited] = useState(false);

  const {
    isListening,
    interimTranscript,
    finalTranscript,
    startListening,
    stopListening,
    setFinalTranscript,
    saveValue,
  } = useSpeechToText({
    continuous: true,
    lang: "tr-TR",
  });

  useEffect(() => {
    setValue(finalTranscript + interimTranscript);
  }, [interimTranscript, finalTranscript]);

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
    if (finalTranscript.length > 100) {
      saveValue();
      const newBlock = { text: finalTranscript };
      setBlockData((prevBlockData) => {
        const blockAlreadyExists = prevBlockData.some(block => block.text === finalTranscript);
        if (!blockAlreadyExists) {
          saveBlockData(finalTranscript);
          return [...prevBlockData, newBlock];
        }
        return prevBlockData;
      });
      setFinalTranscript(""); 
      changeStatus("STOPPED")
      setIsEdited(false);
    }
  }, [finalTranscript]); 

  const changeStatus = async (status) => {
    try {
      const response = await axios.put(
        `/api/v1/note/${id}`,
        {
          pinned: note.pinned,
          note_title: note.note_title,
          priority: note.priority,
          description: note.description,
          note_status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setNote({ ...note, note_status: status });
    } catch (error) {
      console.log(error);
      toast.error(
        `An error occured in note ${note.note_title} while changing to status`
      );
    }
  };

  useEffect(() => {
    if (isEdited) {
      changeStatus("RECORDING");
    } else {
      changeStatus("STOPPED");
    }
  }, [isEdited]);

  const saveBlockData = async (blockText) => {
    try {
      const response = await axios.post(
        `/api/v1/note/${id}/block`,
        {
          modified: false,
          raw_text: blockText,
          md_text: "",
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      console.log(response.data.data);
    } catch (err) {
      toast.error("An error occured while saving block data", err);
    }
  };

  const startStopListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="px-12 mt-5 flex flex-col gap-5 text-white pb-12">
      {isLoading ? (
        <div className="w-full h-[calc(100vh-85px)] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <NoteTitle
            noteStatus={note?.note_status}
            changeStatus={changeStatus}
            title={note?.note_title}
            id={note?.id}
          />
          <RecordBlock
            isListening={isListening}
            value={value}
            setValue={setValue}
            startStopListening={startStopListening}
            saveValue={saveValue}
            setIsEdited={setIsEdited}
          />
          {blockData.map((bData, index) => (
            <NoteBlock key={index} text={bData.text} />
          ))}
        </>
      )}
    </div>
  );
};

export default Create;
