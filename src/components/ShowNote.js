import { useNotes } from "../context/NotesContext";

export const ShowNote = () => {
  const {
    notesList,
    deleteNote,
    achiveNote,
    selectedNote,
    setSelectedNote,
    updateNote,
    setCounter,
    notePropDispatch,
    notePropState,
  } = useNotes();
  let notesArray =
    notePropState.searchValue == ""
      ? notesList.notes
      : notePropState.searchResult;

  return (
    <>
      <div className="notes-list flex-row mt-1 pb-1 g-1">
        {notesArray?.length > 0 ? (
          notesArray?.map((noteItem) => (
            <div
              className={`show-note m-radius bg${noteItem.color}`}
              key={noteItem._id}
            >
              <h3 className="note-title">{noteItem.title}</h3>
              <div className="note-body">{noteItem.body}</div>
              {noteItem.tags.length > 0 &&
                noteItem.tags.map((labelName) => (
                  <span className="note-label l-radius" key={labelName}>
                    {labelName}
                  </span>
                ))}
              <div className="btn-box position-absolute flex-row g-1 m-radius">
                <i
                  className="fal fa-palette cursor-pointer"
                  onClick={() => {
                    notePropDispatch({ type: "OPEN_PALLETE" });
                    setSelectedNote(() => noteItem);
                  }}
                />
                <i
                  className="fal fa-edit cursor-pointer"
                  onClick={() => {
                    notePropDispatch({ type: "OPEN_MODAL" });
                    setSelectedNote(() => noteItem);
                  }}
                />
                <i
                  className="fal fa-tag cursor-pointer"
                  onClick={() => {
                    notePropDispatch({ type: "OPEN_TAG_POPUP" });
                    setSelectedNote(() => noteItem);
                    setCounter((counter) => counter + 1);
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
          ))
        ) : (
          <div className="info-message">
            {notePropState.searchResult?.length == 0 &&
            notePropState.searchValue !== "" ? (
              <span>No notes found for the given search result</span>
            ) : (
              <span>Start adding notes!</span>
            )}
          </div>
        )}
      </div>

      {notePropState?.isModalOpen == true ? (
        <div className="overlay flex-column align-center justify-center">
          <div className="edit-note-container m-radius">
            <form className="flex-column">
              <input
                className="card-input"
                placeholder="Title"
                onChange={(e) =>
                  setSelectedNote(() => ({
                    ...selectedNote,
                    title: e.target.value,
                  }))
                }
                defaultValue={selectedNote.title}
              ></input>
              <textarea
                className="card-input"
                placeholder="Take a note"
                rows="4"
                onChange={(e) =>
                  setSelectedNote(() => ({
                    ...selectedNote,
                    body: e.target.value,
                  }))
                }
                defaultValue={selectedNote.body}
              ></textarea>
              <button type="submit" onClick={updateNote}>
                Save
              </button>
              <button
                type="reset"
                onClick={() => notePropDispatch({ type: "CLOSE_MODAL" })}
              >
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
