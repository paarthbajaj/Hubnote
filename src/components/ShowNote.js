import { useNotes } from "../backend/context/NotesContext";

const ShowNote = () => {
  const { notesList } = useNotes();
  console.log(notesList);
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
export default ShowNote;
