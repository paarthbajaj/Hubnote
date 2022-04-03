import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li className="stack-list-item">
          <i className="mr-1 fal fa-house"></i>Home
        </li>
        <li className="stack-list-item">
          <i className="mr-1 fal fa-tag"></i>Labels
        </li>
        <li className="stack-list-item">
          <i className="mr-1 fal fa-archive"></i> Archive
        </li>
        <li className="stack-list-item">
          <i className="mr-1 fal fa-trash-alt"></i>Trash
        </li>
        <li className="stack-list-item">
          <i className="mr-1 fal fa-user-circle"></i>Profile
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
