import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { makeServer } from "./server";
import { NotesContextProvider } from "./context/NotesContext";
import { AuthContextProvider } from "./context/AuthContext";

export { AddNote } from "./components/AddNote";
export { Navbar } from "./components/Navbar";
export { Searchbar } from "./components/Searchbar";
export { ShowNote } from "./components/ShowNote";
export { Sidebar } from "./components/Sidebar";
export { Signin } from "./components/Signin";
export { Signup } from "./components/Signup";
export { ColorPallete } from "./components/ColorPalete";
export { TagsPopup } from "./components/TagsPopup";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <NotesContextProvider>
          <App />
        </NotesContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
