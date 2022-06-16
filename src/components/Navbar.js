import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const location = useLocation();
  return (
    <header className="app-header">
      <nav className="navbar bg-white flex-row align-center">
        <a className="logo black-border rounded-circle" href="index.html">
          HubNote
        </a>
        <Link to="/">
          {location.pathname == "/" || location.pathname == "/signup" ? (
            <span>Login</span>
          ) : (
            <span onClick={() => localStorage.clear()}>Logout</span>
          )}
        </Link>
      </nav>
    </header>
  );
};
