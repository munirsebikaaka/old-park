import { useState } from "react";
import "../uniqueStyles/auth.css";
import { NavLink } from "react-router-dom";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";

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

  const checkRequirement = (values) => {
    const { email, password } = values;
    if (!email) {
      setEmailError("Please enter your email address");
      return false;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Please enter your password");
      return false;
    } else {
      setPasswordError("");
    }
    return true;
  };

  const checkUserData = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      setEmailError("No user data found. Please sign up first.");
      return false;
    }
    return true;
  };

  const getLoggedInUserAndCheckRequirements = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      setEmailError("No user data found. Please sign up first.");
      return false;
    }
    const user = userData.find((user) => user.email === values.email);
    if (!user) {
      setEmailError("Invalid email");
      return false;
    }
    if (user.password !== values.password) {
      setPasswordError("Wrong password!");
      return false;
    }
    return true;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!checkRequirement(values)) return;
    if (!checkUserData()) return;
    if (!getLoggedInUserAndCheckRequirements()) return;

    localStorage.setItem("managerCode", managerCode);
    localStorage.setItem("logedInEmail", user.email);
    localStorage.setItem("accountID", user.accountID);

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
