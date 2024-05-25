import { useContext } from "react";
import NoteContext from "../context/NoteProvider";

const useNote = () => {
    return useContext(NoteContext);
}

export default useNote;