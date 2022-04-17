import { useNotes } from "../context/NotesContext";
import "./NoteCard.css";

export const TagsPopup = () => {
  const {
    isTagPopupOpen,
    setIsTagPopupOpen,
    editLabel,
    addLabel,
    notesList,
    addMultiLabel,
  } = useNotes();
  let labelList = [];
  (() => {
    notesList?.notes?.forEach((i) => {
      labelList = labelList.concat(i?.tags);
    });
  })();
  return (
    <>
      {isTagPopupOpen && (
        <div className="overlay">
          <div className="add-tag flex-column l-radius">
            Add Label{" "}
            <form onSubmit={addLabel}>
              <input
                placeholder="Enter label name"
                className="card-input"
                onChange={editLabel}
              />
              <div className="inp-subtext">Press enter to add the label ↵</div>
            </form>
            {labelList?.length > 0 &&
              labelList.map((i) => (
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
              onClick={() => setIsTagPopupOpen(() => false)}
            />
          </div>
        </div>
      )}
    </>
  );
};
