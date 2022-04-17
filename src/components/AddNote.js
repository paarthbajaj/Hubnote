import { React, useEffect, useState } from "react";
import axios from "axios";
import "./NoteCard.css";
import { useNotes } from "../context/NotesContext";

export const AddNote = () => {
  const {
    encodedToken,
    setCounter,
    noteContent,
    setNoteContent,
    isPalleteOpen,
    setIsPalleteOpen,
    colorArr,
    setCardColor,
    changeCardColor,
    selectedNote,
    setSelectedNote,
    updateNote,
  } = useNotes();
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
    setTxtareaHeight(() => 1);
    setCounter((counter) => counter + 1);
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
        {/* <i
          className="fal fa-palette cursor-pointer"
          onClick={() => setIsPalleteOpen(() => true)}
        /> */}
        <i className="fal fa-tag cursor-pointer" />
      </div>
      {console.log(selectedNote)}
      {isPalleteOpen && (
        <div className="overlay">
          <div className="color-pallete flex-row l-radius">
            Choose color for the note:
            {colorArr.map((c) => (
              <span
                key={c}
                className={`color-item rounded-circle cursor-pointer bg${c}`}
                onClick={() => changeCardColor(c)}
              ></span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
