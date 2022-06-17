import { Sidebar } from "../index";
import { useNotes } from "../context/NotesContext";

export const ArchivePage = () => {
  const { archivedNotesList } = useNotes();

  return (
    <div className="app-container archive-page pt-1">
      <Sidebar />
      {archivedNotesList.archives.length > 0 ? (
        <div className="notes-list flex-row mt-1 pb-1 g-1">
          {archivedNotesList.archives &&
            archivedNotesList.archives.map((noteItem) => (
              <div
                className={`show-note m-radius bg${noteItem.color}`}
                key={noteItem._id}
              >
                <h3 className="note-title">{noteItem.title}</h3>
                <div className="note-body">{noteItem.body}</div>
              </div>
            ))}
        </div>
      ) : (
        <span>No notes in the archive</span>
      )}
    </div>
  );
};
