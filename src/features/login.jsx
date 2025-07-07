import { useState } from "react";
import "../uniqueStyles/auth.css";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";

import { checkRequirement } from "../services/auth/authLogin/checkRequirements";
import { checkUserData } from "../services/auth/authLogin/checkUserData";
import { getLoggedInUserAndCheckRequirements } from "../services/auth/authLogin/getLoggedInUserData";

import { useUser } from "../contexts/UserContext";
import { getLogedInUser } from "../services/auth/authLogin/getLogedInUser";
import { toast } from "react-toastify";

const LoginForm = ({ setShowApp, setShowSignUp }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    employeeID: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [employeeIDError, setEmployeeIDError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !checkRequirement(
        values,
        setEmailError,
        setPasswordError,
        setEmployeeIDError
      )
    )
      return;
    if (!checkUserData(setEmailError)) return;
    if (
      !getLoggedInUserAndCheckRequirements(
        setEmailError,
        setPasswordError,
        values
      )
    )
      return;

    getLogedInUser(values, setUser, setShowApp);
    setValues({ email: "", password: "" });
    toast.success("Login successfully!");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login to Your Account</h2>

        <form className="auth-form" onSubmit={onSubmitHandler}>
          <div className="form-group">
            <p className="login-email-error">{emailError}</p>
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
                  ? { border: "1px solid  #dc2626" }
                  : { border: "1px solid #d1d5db" }
              }
            />
          </div>

          <div className="form-group">
            <p className="login-employeeID-error">{employeeIDError}</p>
            <label htmlFor="employeeID" className="form-label">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeID"
              onChange={handleChange}
              value={values.employeeID}
              id="employeeID"
              className="form-input"
              placeholder="2561234567890"
              style={
                employeeIDError.length > 0
                  ? { border: "1px solid  #dc2626" }
                  : { border: "1px solid #d1d5db" }
              }
            />
          </div>

          <div className="form-group">
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
                  ? { border: "1px solid  #dc2626" }
                  : { border: "1px solid #d1d5db" }
              }
            />
          </div>

          <button type="submit" className="auth-button primary">
            Login
          </button>

          {/* Sign up link */}
          <div className="auth-footer">
            Don't have an account?
            <a
              href="#"
              onClick={() => setShowSignUp(true)}
              className="auth-link"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
