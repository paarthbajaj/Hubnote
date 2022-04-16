import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <Link to="/">
          <li className="stack-list-item">
            <i className="mr-1 fal fa-house"></i>Home
          </li>
        </Link>
        <li className="stack-list-item">
          <i className="mr-1 fal fa-tag"></i>Labels
        </li>
        <Link to="/archive">
          <li className="stack-list-item">
            <i className="mr-1 fal fa-archive"></i> Archive
          </li>
        </Link>

        <Link to="/trash">
          <li className="stack-list-item">
            <i className="mr-1 fal fa-trash-alt"></i>Trash
          </li>
        </Link>
        <li className="stack-list-item">
          <i className="mr-1 fal fa-user-circle"></i>Profile
        </li>
      </ul>
    </aside>
  );
};
