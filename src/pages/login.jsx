import { useState } from "react";
import "../uniqueStyles/auth.css";
import { NavLink } from "react-router-dom";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { checkRequirement } from "../services/auth/authLogin/checkRequirements";
import { checkUserData } from "../services/auth/authLogin/checkUserData";
import { getLoggedInUserAndCheckRequirements } from "../services/auth/authLogin/getLoggedInUserData";

const LoginForm = ({ setShowApp }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!checkRequirement(values, setEmailError, setPasswordError)) return;
    if (!checkUserData(setEmailError)) return;
    if (
      !getLoggedInUserAndCheckRequirements(
        setEmailError,
        setPasswordError,
        values
      )
    )
      return;
    setValues({ email: "", password: "" });
    setShowApp(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login to Your Account</h2>

        <form className="auth-form" onSubmit={onSubmitHandler}>
          <p className="login-email-error">{emailError}</p>
          <p className="login-password-error">{passwordError}</p>

          <div className="form-group">
            <label htmlFor="loginEmail" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              id="loginEmail"
              className="form-input"
              placeholder="munir@example.com"
              style={
                emailError.length > 0
                  ? { border: "1px solid  #991b1b" }
                  : { border: "1px solid #d1d5db" }
              }
            />
          </div>

          <div className="form-group">
            {showPassword ? (
              <IoEye
                className="login-password-eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <IoEyeOffSharp
                className="login-password-eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
            <label htmlFor="loginPassword" className="form-label">
              Password
            </label>
            <input
              type={!showPassword ? "password" : "text"}
              name="password"
              onChange={handleChange}
              value={values.password}
              id="loginPassword"
              className="form-input"
              placeholder="••••••••"
              style={
                passwordError.length > 0
                  ? { border: "1px solid  #991b1b" }
                  : { border: "1px solid #d1d5db" }
              }
            />
          </div>

          <button type="submit" className="auth-button primary">
            Login
          </button>

          <div className="auth-footer">
            Don't have an account?
            <NavLink to="/signup" className="auth-link">
              Sign up
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
