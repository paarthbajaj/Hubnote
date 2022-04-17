import { useNotes } from "../context/NotesContext";

export const ColorPallete = () => {
  const { colorArr, setIsPalleteOpen, isPalleteOpen } = useNotes();
  return (
    <>
      <div className="flex-row">
        <i
          className="fal fa-palette cursor-pointer"
          onClick={() => setIsPalleteOpen(() => true)}
        />
      </div>
      {isPalleteOpen && (
        <div className="color-pallete flex-row l-radius">
          {colorArr.map((c) => (
            <span
              key={c}
              style={{ backgroundColor: c }}
              className="color-item rounded-circle cursor-pointer"
              onClick={() => setIsPalleteOpen(() => false)}
            ></span>
          ))}
        </div>
      )}
    </>
  );
};
