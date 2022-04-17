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
  const [isTagPopupOpen, setIsTagPopupOpen] = useState(false);
  const [cardColor, setCardColor] = useState("white");
  const [archivedNotesList, setAchivedNotesList] = useState([]);
  const [noteContent, setNoteContent] = useState({
    title: "",
    body: "",
    in_trash: false,
    color: "white",
    createdAt: "",
    tags: [],
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
    setSelectedNote(() => ({ ...selectedNote, title: e.target.value }));
  };
  const editBody = (e) => {
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
    } catch (err) {
      console.log(err);
    }
  };
  const changeCardColor = async (e) => {
    setIsPalleteOpen(() => false);
    setSelectedNote(() => ({ ...selectedNote, color: e }));
    setCounter((counter) => counter + 1);
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
    } catch (err) {
      console.log(err);
    }
  };
  const editLabel = (e) => {
    console.log({
      ...selectedNote,
      tags: [e.target.value],
    });
    setSelectedNote(() => ({
      ...selectedNote,
      tags: [e.target.value],
    }));
  };
  const addMultiLabel = (e) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    setCounter((counter) => counter + 1);
    console.log({
      ...selectedNote,
      tags: [...selectedNote.tags.concat(e.target.value)],
    });
  };
  const addLabel = async (e) => {
    e.preventDefault();
    setIsTagPopupOpen(() => false);
    setCounter((counter) => counter + 1); //need to reduce update api code repetition
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
        isTagPopupOpen,
        setIsTagPopupOpen,
        editLabel,
        addLabel,
        addMultiLabel,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
export { useNotes, NotesContextProvider };
