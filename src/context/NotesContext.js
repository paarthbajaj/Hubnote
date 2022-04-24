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
  const [selectedNote, setSelectedNote] = useState();
  const [cardColor, setCardColor] = useState("white");
  const [listOfLabel, setListOfLabel] = useState([]);
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
    try {
      const res = await axios.delete(`/api/notes/${noteItem._id}`, {
        headers: {
          authorization: encodedToken,
        },
      });
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
  const updateNote = async (e) => {
    e.preventDefault();
    setCounter((counter) => counter + 1);
    notePropDispatch({ type: "CLOSE_MODAL" });
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
    notePropDispatch({ type: "CLOSE_PALLETE" });
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
  const addMultiLabel = async (e) => {
    setCounter((counter) => counter + 1);
    let flag = notesList.notes.filter((i) => i._id == selectedNote._id);
    if (e.target.checked == true) {
      try {
        const updatedNoteRes = await axios.post(
          `/api/notes/${selectedNote._id}`,
          {
            note: {
              ...flag[0],
              tags: [...flag[0].tags.concat(e.target.value)],
            },
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
    } else {
      console.log("nothing");
      try {
        const updatedNoteRes = await axios.post(
          `/api/notes/${selectedNote._id}`,
          {
            note: {
              ...flag[0],
              tags: [...flag[0].tags.filter((i) => i !== e.target.value)],
            },
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
    }
  };
  const addLabel = async (e) => {
    e.preventDefault();
    notePropDispatch({ type: "CLOSE_TAG_POPUP" });
    setListOfLabel(() => listOfLabel.concat(notePropState.label));
    setCounter((counter) => counter + 1);
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
        notePropDispatch({ type: "ADD_NOTE", payload: noteData.data });
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
      } catch (err) {
        console.log(err);
      }
    })();
  }, [counter]);
  const notesReducer = (state, action) => {
    switch (action.type) {
      case "DELETE_NOTE":
        return { ...state };
      case "EDIT_TITLE":
        return { ...state, title: action.payload };
      case "EDIT_BODY":
        return { ...state, body: action.payload };
      case "CLEAR_NOTE":
        return { ...state, title: "", body: "" };
    }
  };
  const notePropReducer = (state, action) => {
    switch (action.type) {
      case "INC_COUNTER":
        return { ...state, counter4: state.counter4 + 1 };
      case "OPEN_MODAL":
        return { ...state, isModalOpen: true };
      case "CLOSE_MODAL":
        return { ...state, isModalOpen: false };
      case "OPEN_PALLETE":
        return { ...state, isPalleteOpen: true };
      case "CLOSE_PALLETE":
        return { ...state, isPalleteOpen: false };
      case "SELECTED_NOTE":
        return { ...state, selectedNote4: action.payload };
      case "SET_LABEL":
        return { ...state, label: action.payload };
      case "OPEN_TAG_POPUP":
        return { ...state, isTagPopupOpen: true };
      case "CLOSE_TAG_POPUP":
        return { ...state, isTagPopupOpen: false };
    }
  };
  const [noteState, noteDispatch] = useReducer(notesReducer, {
    title: "",
    body: "",
    in_trash: false,
    color: "white",
    createdAt: "",
    tags: [],
  });
  const [notePropState, notePropDispatch] = useReducer(notePropReducer, {
    isModalOpen: false,
    isPalleteOpen: false,
    isTagPopupOpen: false,
    label: "",
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
        selectedNote,
        setSelectedNote,
        updateNote,
        colorArr,
        setCardColor,
        cardColor,
        changeCardColor,
        addLabel,
        addMultiLabel,
        listOfLabel,
        noteState,
        notePropState,
        notePropDispatch,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
export { useNotes, NotesContextProvider };
