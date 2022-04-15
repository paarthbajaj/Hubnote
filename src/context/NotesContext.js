import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const NotesContext = createContext();
const useNotes = () => useContext(NotesContext);

const NotesContextProvider = ({ children }) => {
  const encodedToken = localStorage.getItem("key");
  const [notesList, setNotesList] = useState([]);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const noteData = await axios.get("/api/notes", {
          headers: {
            authorization: encodedToken,
          },
        });
        setNotesList(() => noteData.data.notes);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [counter]);
  const notesReducer = (state, action) => {
    console.log({ ...state });
  };
  const [noteState, noteDispatch] = useReducer(notesReducer, {
    notes: [],
    archived: [],
    singleNote: { title: "", body: "" },
  });
  return (
    <NotesContext.Provider
      value={{ noteDispatch, encodedToken, notesList, setCounter }}
    >
      {children}
    </NotesContext.Provider>
  );
};
export { useNotes, NotesContextProvider };
