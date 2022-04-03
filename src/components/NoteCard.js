import React from "react";
import "./NoteCard.css";

const NoteCard = () => {
  return (
    <div className="note-card flex-column g-1 m-radius">
      <input className="card-input" type="text" placeholder="Title" />
      <div className="card-input" contenteditable="true"></div>
      <i class="fal fa-thumbtack position-absolute cursor-pointer" />
      <div className="btn-container position-absolute flex-row g-1 m-radius">
        <i className="fal fa-tag cursor-pointer" />
        <i className="fal fa-archive cursor-pointer" />
        <i className="fal fa-trash-alt cursor-pointer" />
      </div>
    </div>
  );
};

export default NoteCard;
