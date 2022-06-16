import { React, useState } from "react";
import axios from "axios";
import "./NoteCard.css";
import { useNotes } from "../context/NotesContext";

export const AddNote = () => {
  const {
    encodedToken,
    setCounter,
    colorArr,
    changeCardColor,
    selectedNote,
    noteDispatch,
    noteState,
    notePropState,
  } = useNotes();
  const [txtareaHeight, setTxtareaHeight] = useState(1);

  const saveClickHandler = async () => {
    noteDispatch({ type: "CLEAR_NOTE" });
    setTxtareaHeight(() => 1);
    setCounter((counter) => counter + 1);
    try {
      const noteRes = await axios.post(
        "/api/notes",
        {
          note: { ...noteState, createdAt: new Date().toLocaleString() },
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
        value={noteState.title}
        onChange={(e) =>
          noteDispatch({ type: "EDIT_TITLE", payload: e.target.value })
        }
      />
      <textarea
        className="card-input ok"
        placeholder="Take a note"
        rows={txtareaHeight}
        value={noteState.body}
        onChange={(e) => {
          noteDispatch({ type: "EDIT_BODY", payload: e.target.value });
          setTxtareaHeight(e.target.value.length / 50 + 2);
        }}
      ></textarea>
      <div className="btn-box position-absolute">
        <button className="app-pri-btn" onClick={saveClickHandler}>
          Save
        </button>
      </div>
      {notePropState?.isPalleteOpen && (
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
