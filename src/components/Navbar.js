import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <header className="app-header">
      <nav className="navbar bg-white flex-row align-center">
        <a className="logo black-border rounded-circle" href="index.html">
          HubNote
        </a>
        <Link to="/signin">Login</Link>
      </nav>
    </header>
  );
};
