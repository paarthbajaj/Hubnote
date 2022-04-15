import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { makeServer } from "./server";
import { NotesContextProvider } from "./backend/context/NotesContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotesContextProvider>
        <App />
      </NotesContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
