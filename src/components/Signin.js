import axios from "axios";
import { Link } from "react-router-dom";
import "./Auth.css";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export const Signin = () => {
  const {
    signinAsGuestHandler,
    signinHandler,
    authDispatch,
    authState,
    toast,
    setToast,
  } = useAuth();
  useEffect(() => {
    authDispatch({ type: "EDIT_EMAIL", payload: "" });
    authDispatch({ type: "EDIT_PASSWORD", payload: "" });
  }, []);
  return (
    <div className="signin-page">
      <img
        className="auth-img"
        src="/assets/images/addNotes.svg"
        alt="notes-image"
      />
      <form className="auth-form flex-column g-1 align-center justify-center">
        <h1 className="txt-center">Login to your account</h1>
        <label className="log-input">
          <input
            className="input log-input"
            type="email"
            placeholder="Email"
            required
            onChange={(e) =>
              authDispatch({ type: "EDIT_EMAIL", payload: e.target.value })
            }
          />
          <span className="error">Please enter your email</span>
        </label>
        <label className="log-input">
          <input
            className="input log-input"
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              authDispatch({ type: "EDIT_PASSWORD", payload: e.target.value })
            }
          />
          <span className="error">
            Password must contain eight characters, at least one letter, one
            number and one special character
          </span>
        </label>
        <button
          className="app-pri-btn cursor-pointer"
          type="submit"
          onClick={() => {
            authState.email == "" || authState.password == ""
              ? setToast({
                  ...toast,
                  showToast: true,
                  type: "alert-warning",
                  message: "Please fill the fields",
                })
              : signinHandler();
          }}
        >
          Sign In
        </button>
        <Link to="/home">
          <span onClick={signinAsGuestHandler}>Sign In As Guest</span>
        </Link>
        <span className="or-divider">OR</span>
        <Link to="/signup">
          <button type="button" className="btn btn-secondary">
            Sign Up
          </button>
        </Link>
      </form>
    </div>
  );
};
