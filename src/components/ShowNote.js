import { useNotes } from "../context/NotesContext";

export const ShowNote = () => {
  const { notesList } = useNotes();
  return (
    <div className="notes-list flex-row mt-1 pb-1 g-1">
      {notesList &&
        notesList.map((noteItem) => (
          <div className="show-note m-radius" key={noteItem._id}>
            <h3 className="note-title">{noteItem.title}</h3>
            <div className="note-body">{noteItem.body}</div>
          </div>
        ))}
    </div>
  );
};
