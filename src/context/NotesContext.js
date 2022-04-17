import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";
const colorArr = [
  "ffffff",
  "f28b82",
  "fbbc04",
  "fff475",
  "ccff90",
  "a7ffeb",
  "fdcfe8",
  "e6c9a8",
  "e8eaed",
];

const NotesContext = createContext();
const useNotes = () => useContext(NotesContext);

const NotesContextProvider = ({ children }) => {
  const encodedToken = localStorage.getItem("key");
  const [notesList, setNotesList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [selectedNote, setSelectedNote] = useState(); //need to convert these into useReducer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPalleteOpen, setIsPalleteOpen] = useState(false);
  const [cardColor, setCardColor] = useState("white");
  const [archivedNotesList, setAchivedNotesList] = useState([]);
  const [noteContent, setNoteContent] = useState({
    title: "",
    body: "",
    in_trash: false,
    color: "white",
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
  const editNote = async (noteItem) => {
    console.log(noteItem);
    setIsModalOpen(() => true);
    setSelectedNote(() => noteItem);
  };
  const editTitle = (e) => {
    console.log(e.target.value);
    console.log({ ...selectedNote, title: e.target.value });
    setSelectedNote(() => ({ ...selectedNote, title: e.target.value }));
  };
  const editBody = (e) => {
    console.log(e.target.value);
    setSelectedNote(() => ({ ...selectedNote, body: e.target.value }));
  };
  const updateNote = async (e) => {
    e.preventDefault();
    setCounter((counter) => counter + 1);
    setIsPalleteOpen(() => false);
    setIsModalOpen(() => false);
    try {
      const updatedNoteRes = await axios.post(
        `/api/notes/${selectedNote._id}`,
        {
          note: selectedNote,
        },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      console.log(updatedNoteRes);
    } catch (err) {
      console.log(err);
    }
  };
  const changeCardColor = async (e) => {
    console.log(e);
    setIsPalleteOpen(() => false);
    console.log({ ...selectedNote, color: e });
    setSelectedNote(() => ({ ...selectedNote, color: e }));
    setCounter((counter) => counter + 1);
    console.log(selectedNote._id);
    console.log(selectedNote);
    try {
      const updatedNoteRes = await axios.post(
        `/api/notes/${selectedNote._id}`,
        {
          note: { ...selectedNote, color: e },
        },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      console.log("updatedNote", updatedNoteRes);
    } catch (err) {
      console.log(err);
    }
  };

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
        editNote,
        isModalOpen,
        setIsModalOpen,
        selectedNote,
        setSelectedNote,
        editTitle,
        editBody,
        updateNote,
        isPalleteOpen,
        setIsPalleteOpen,
        colorArr,
        setCardColor,
        cardColor,
        changeCardColor,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
export { useNotes, NotesContextProvider };
