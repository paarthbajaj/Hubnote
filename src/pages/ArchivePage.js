import { Sidebar } from "../index";
import { useNotes } from "../context/NotesContext";

export const ArchivePage = () => {
  const { archivedNotesList } = useNotes();

  return (
    <div className="archive-container pt-1">
      {console.log(archivedNotesList)}
      <Sidebar />
      <div className="notes-list flex-row mt-1 pb-1 g-1">
        {archivedNotesList.archives &&
          archivedNotesList.archives.map((noteItem) => (
            <div className="show-note m-radius" key={noteItem._id}>
              <h3 className="note-title">{noteItem.title}</h3>
              <div className="note-body">{noteItem.body}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
