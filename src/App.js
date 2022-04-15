import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Signin from "./components/Signin";
import { HomePage } from "./pages/HomePage";
// import Signup from "./components/Signup";
import { Navbar, Signin, Signup } from "../src/index";
import MockmanEs from "mockman-js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mock" element={<MockmanEs />} />
      </Routes>
    </div>
  );
}

export default App;
