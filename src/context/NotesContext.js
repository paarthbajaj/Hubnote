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
  const [archivedNotesList, setAchivedNotesList] = useState([]);
  const [noteContent, setNoteContent] = useState({
    title: "",
    body: "",
    in_trash: false,
  });
  const deleteNote = async (noteItem) => {
    console.log(noteItem);
    try {
      const res = await axios.delete(`/api/notes/${noteItem._id}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      console.log(res);
      // setNoteContent((note) => ({ ...note, in_trash: true }));

      setCounter((counter) => counter + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const achiveNote = async (noteItem) => {
    try {
      const res = await axios.post(
        `/api/notes/archives/${noteItem._id}`,
        {
          note: noteContent,
        },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      console.log("archived", res);
      setCounter((counter) => counter + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const noteData = await axios.get("/api/notes", {
          headers: {
            authorization: encodedToken,
          },
        });
        setNotesList(() => noteData.data);
        console.log(noteData);
      } catch (err) {
        console.log(err);
      }
    })();
    (async () => {
      try {
        const archivedNoteData = await axios.get("/api/archives", {
          headers: {
            authorization: encodedToken,
          },
        });
        setAchivedNotesList(() => archivedNoteData.data);
        console.log(archivedNoteData);
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
      value={{
        noteDispatch,
        encodedToken,
        notesList,
        setCounter,
        deleteNote,
        noteContent,
        setNoteContent,
        achiveNote,
        archivedNotesList,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
export { useNotes, NotesContextProvider };
