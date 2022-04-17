import { useNotes } from "../context/NotesContext";

export const ShowNote = () => {
  const {
    notesList,
    deleteNote,
    achiveNote,
    editNote,
    isModalOpen,
    setIsModalOpen,
    selectedNote,
    setSelectedNote,
    editTitle,
    editBody,
    updateNote,
    isPalleteOpen,
    setIsPalleteOpen,
    colorArr,
    cardColor,
    setIsTagPopupOpen,
    setCounter,
  } = useNotes();

  return (
    <>
      <div className="notes-list flex-row mt-1 pb-1 g-1">
        {notesList.notes &&
          notesList.notes.map((noteItem) => (
            <div
              className={`show-note m-radius bg${noteItem.color}`}
              key={noteItem._id}
            >
              <h3 className="note-title">{noteItem.title}</h3>
              <div className="note-body">{noteItem.body}</div>
              {noteItem.tags.length > 0 && (
                <span className="note-label l-radius">{noteItem.tags[0]}</span>
              )}
              <div className="btn-container position-absolute flex-row g-1 m-radius">
                <i
                  className="fal fa-palette cursor-pointer"
                  onClick={() => {
                    setIsPalleteOpen(() => true);
                    setSelectedNote(() => noteItem);
                  }}
                />
                <i
                  className="fal fa-edit cursor-pointer"
                  onClick={() => editNote(noteItem)}
                />
                <i
                  className="fal fa-tag cursor-pointer"
                  onClick={() => {
                    setIsTagPopupOpen(() => true);
                    setSelectedNote(() => noteItem);
                    // setCounter((counter) => counter + 1);
                  }}
                />
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

      {isModalOpen == true ? (
        <div className="overlay flex-column align-center justify-center">
          <div className="edit-note-container m-radius">
            <form className="flex-column">
              <input
                className="card-input"
                placeholder="Title"
                onChange={editTitle}
                defaultValue={selectedNote.title}
              ></input>
              <textarea
                className="card-input"
                placeholder="Take a note"
                rows="4"
                onChange={editBody}
                defaultValue={selectedNote.body}
              ></textarea>
              <button type="submit" onClick={updateNote}>
                Save
              </button>
              <button type="reset" onClick={() => setIsModalOpen(() => false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
