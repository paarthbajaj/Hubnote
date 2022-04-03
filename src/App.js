import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Searchbar from "./components/Searchbar";
import NoteCard from "./components/NoteCard";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="app-container pt-1">
        <Sidebar />
        <Searchbar />
        <NoteCard />
      </div>

      <Routes>{/* <Route path="/" element={< />} /> */}</Routes>
    </div>
  );
}

export default App;
