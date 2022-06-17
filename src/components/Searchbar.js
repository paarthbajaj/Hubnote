import React from "react";
import { useNotes } from "../context/NotesContext";
import "./Searchbar.css";

export const Searchbar = () => {
  const { notePropState, notePropDispatch, notesList } = useNotes();
  return (
    <div className="searchbar">
      <form className="searchbar-form flex-row m-radius">
        <i className="fal fa-search"></i>
        <input
          typeof="submit"
          className="searchbar-input"
          placeholder="Search"
          value={notePropState.searchValue}
          required
          onChange={(e) => {
            let searchResult = [];
            let notesListCopy = notesList.notes;
            for (let i = 0; i < notesList.notes?.length - 1; i++) {
              let flag = notesListCopy.find(
                (note) =>
                  note.title.toLowerCase().search(notePropState.searchValue) !=
                  -1
              );
              if (flag) {
                notesListCopy = notesListCopy.filter((i) => i._id !== flag._id);
                searchResult.push(flag);
              }
            }
            notePropDispatch({
              type: "SET_SEARCH",
              payload: { value: e.target.value, result: searchResult },
            });
          }}
        />
      </form>
    </div>
  );
};
