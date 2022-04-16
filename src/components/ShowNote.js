import { useNotes } from "../context/NotesContext";

export const ShowNote = () => {
  const { notesList, deleteNote, achiveNote } = useNotes();
  return (
    <div className="notes-list flex-row mt-1 pb-1 g-1">
      {notesList.notes &&
        notesList.notes.map((noteItem) => (
          <div className="show-note m-radius" key={noteItem._id}>
            <h3 className="note-title">{noteItem.title}</h3>
            <div className="note-body">{noteItem.body}</div>
            <div className="btn-container position-absolute flex-row g-1 m-radius">
              <i className="fal fa-tag cursor-pointer" />
              <i
                className="fal fa-archive cursor-pointer"
                onClick={() => achiveNote(noteItem)}
              />
              <i
                className="fal fa-trash-alt cursor-pointer"
                onClick={() => deleteNote(noteItem)}
              />
            </div>
          </div>
        ))}
    </div>
  );
};
