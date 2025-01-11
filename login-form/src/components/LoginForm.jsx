import { useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const showHidePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-form-container">
      <div>
        <input type="email" placeholder="Email" className="login-form-input" />
      </div>

      <div className="login-form-password-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="login-form-input"
        />
        <button
          onClick={showHidePassword}
          className="input-form-show-hide-button"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <div>
        <button className="login-form-button">Login</button>
        <button className="login-form-button">Sign up</button>
      </div>
    </div>
  );
};

export default LoginForm;
