import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./NoteCard.css";
import { useNotes } from "../backend/context/NotesContext";

const AddNote = () => {
  const { encodedToken, setCounter } = useNotes();
  const [noteContent, setNoteContent] = useState({
    title: "",
    body: "",
  });
  const [txtareaHeight, setTxtareaHeight] = useState(1);

  const addCardTitle = (e) => {
    setNoteContent((i) => ({ ...i, title: e.target.value }));
  };
  const addCardBody = (e) => {
    setNoteContent((i) => ({ ...i, body: e.target.value }));
    setTxtareaHeight(e.target.value.length / 50 + 2);
  };
  const saveClickHandler = async () => {
    setNoteContent((i) => ({ ...i, title: "", body: "" }));
    setCounter((counter) => counter + 1);
    console.log(noteContent);
    try {
      const noteRes = await axios.post(
        "/api/notes",
        {
          note: noteContent,
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
  return (
    <div className="note-card flex-column g-1 m-radius">
      <input
        className="card-input"
        type="text"
        placeholder="Title"
        value={noteContent.title}
        onChange={addCardTitle}
      />
      <textarea
        className="card-input ok"
        placeholder="Take a note"
        rows={txtareaHeight}
        value={noteContent.body}
        onChange={addCardBody}
      ></textarea>
      <button onClick={saveClickHandler}>Save</button>
      <i className="fal fa-thumbtack position-absolute cursor-pointer" />
      <div className="btn-container position-absolute flex-row g-1 m-radius">
        <i className="fal fa-tag cursor-pointer" />
        <i className="fal fa-archive cursor-pointer" />
        <i className="fal fa-trash-alt cursor-pointer" />
      </div>
    </div>
  );
};

export default AddNote;
