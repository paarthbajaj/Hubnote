import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="app-header">
      <nav className="navbar bg-white flex-row align-center">
        <a className="logo black-border rounded-circle" href="index.html">
          HubNote
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
