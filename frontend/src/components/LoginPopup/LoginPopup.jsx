import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

function LoginPopup({ setShowLogin }) {
  const [currentState, setCurrentState] = useState("Login");
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="cancel"
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your Name" required />
          )}
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button>
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to Terms of Use and Privacy Policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Don't have an Account ?
            <span onClick={() => setCurrentState("Sign Up")}> Sign Up </span>
          </p>
        ) : (
          <p>
            Already have an Account ?
            <span onClick={() => setCurrentState("Login")}> Login </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
