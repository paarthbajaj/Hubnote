import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../backend/db/users";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [toast, setToast] = useState({
    showToast: true,
    type: "",
    message: "",
  });
  let navigate = useNavigate();
  const signupClickHandler = async () => {
    try {
      const signupApiRes = await axios.post("/api/auth/signup", {
        email: authState.email,
        password: authState.password,
        name: authState.name,
        confirm_password: authState.confirm_password,
      });
      localStorage.setItem("key", signupApiRes.data.encodedToken);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  const signinAsGuestHandler = async () => {
    const data = await axios.post("/api/auth/login", {
      email: users[0].email,
      password: users[0].password,
    });
    localStorage.setItem("key", data.data.encodedToken);
  };
  const signinHandler = async () => {
    const data = await axios.post("/api/auth/login", {
      email: authState.email,
      password: authState.password,
    });
    localStorage.setItem("key", data.data.encodedToken);
    navigate("/home");
  };
  const authReducer = (state, action) => {
    switch (action.type) {
      case "EDIT_NAME":
        return { ...state, name: action.payload };
      case "EDIT_EMAIL":
        return { ...state, email: action.payload };
      case "EDIT_PASSWORD":
        return { ...state, password: action.payload };
      case "EDIT_CONFIRM_PASSWORD":
        return { ...state, confirm_password: action.payload };
    }
  };
  const [authState, authDispatch] = useReducer(authReducer, {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        signupClickHandler,
        navigate,
        signinAsGuestHandler,
        signinHandler,
        toast,
        setToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthContextProvider };
