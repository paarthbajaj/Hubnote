import { Sidebar } from "../index";
import { useNotes } from "../context/NotesContext";

export const TrashPage = () => {
  const { notesList } = useNotes();

  return (
    <div className="trash-container pt-1">
      <Sidebar />
      <div className="notes-list flex-row mt-1 pb-1 g-1">
        This feature will launch soon.
      </div>
    </div>
  );
};
