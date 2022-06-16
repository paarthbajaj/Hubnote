import { useNotes } from "../context/NotesContext";
import "./NoteCard.css";

export const TagsPopup = () => {
  const {
    addLabel,
    notesList,
    addMultiLabel,
    listOfLabel,
    selectedNote,
    notePropDispatch,
    notePropState,
    setSelectedNote,
  } = useNotes();
  let labelList = [];
  (() => {
    notesList?.notes?.forEach((i) => {
      labelList = labelList.concat(i?.tags);
    });
  })();
  return (
    <>
      {notePropState?.isTagPopupOpen && (
        <div className="overlay">
          <div className="add-tag flex-column l-radius">
            Add Label{" "}
            <form onSubmit={addLabel}>
              <input
                placeholder="Enter label name"
                className="card-input"
                onChange={(e) => {
                  setSelectedNote(() => ({
                    ...selectedNote,
                    tags: [e.target.value],
                  }));
                  notePropDispatch({
                    type: "SET_LABEL",
                    payload: e.target.value,
                  });
                }}
              />
              <div className="inp-subtext">Press enter to add the label ↵</div>
            </form>
            {listOfLabel?.length > 0 &&
              listOfLabel.map((i) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    value={i}
                    onClick={(e) => {
                      addMultiLabel(e);
                    }}
                  />
                  <span>{i}</span>
                </label>
              ))}
            <i
              className="fal fa-times close-btn position-absolute cursor-pointer"
              onClick={() => notePropDispatch({ type: "CLOSE_TAG_POPUP" })}
            />
          </div>
        </div>
      )}
    </>
  );
};
