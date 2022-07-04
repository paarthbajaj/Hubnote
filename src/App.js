import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Signin from "./components/Signin";
import { HomePage } from "./pages/HomePage";
// import Signup from "./components/Signup";
import { Navbar, Signin, Signup } from "../src/index";
import MockmanEs from "mockman-js";
import { TrashPage } from "./pages/TrashPage";
import { ArchivePage } from "./pages/ArchivePage";
import { Toast } from "./components/Toast";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Toast />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/trash" element={<TrashPage />} />
        <Route path="/mock" element={<MockmanEs />} />
      </Routes>
    </div>
  );
}

export default App;
