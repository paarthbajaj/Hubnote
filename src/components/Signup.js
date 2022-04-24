import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Auth.css";
export const Signup = () => {
  const { authDispatch, signupClickHandler } = useAuth();
  return (
    <div className="signin-page">
      <img
        className="auth-img"
        src="/assets/images/Notes-Image.svg"
        alt="notes-image"
      />
      <h1 className="txt-center">Sign Up to HubNote</h1>
      <form className="auth-form flex-column g-1 align-center justify-center">
        <label className="log-input">
          <input
            className="input log-input req-input"
            type="text"
            placeholder="Name"
            required
            onChange={(e) =>
              authDispatch({ type: "EDIT_NAME", payload: e.target.value })
            }
          />
          <span className="error">Please enter your name</span>
        </label>
        <label className="log-input">
          <input
            className="input log-input req-input"
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
            className="input log-input req-input"
            type="password"
            placeholder="Password"
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
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
        <label className="log-input">
          <input
            className="input log-input req-input"
            type="password"
            placeholder="Confirm Password"
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            required
            onChange={(e) =>
              authDispatch({
                type: "EDIT_CONFIRM_PASSWORD",
                payload: e.target.value,
              })
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
          onClick={signupClickHandler}
        >
          Sign Up
        </button>
        <span className="or-divider">OR</span>
        <Link to="/">
          <button type="button" className="btn btn-secondary">
            Sign In
          </button>
        </Link>
      </form>
    </div>
  );
};
