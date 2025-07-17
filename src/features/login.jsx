import { useState } from "react";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import "../uniqueStyles/auth.css";

import { checkRequirement } from "../services/auth/authLogin/checkRequirements";
import { checkUserData } from "../services/auth/authLogin/checkUserData";
import { getLoggedInUserAndCheckRequirements } from "../services/auth/authLogin/getLoggedInUserData";
import { getLogedInUser } from "../services/auth/authLogin/getLogedInUser";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field on input change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Reset errors first
    setErrors({ email: "", password: "" });

    // Validate using your existing logic:
    const isRequirementsOk = checkRequirement(
      values,
      (msg) => setErrors((prev) => ({ ...prev, email: msg })),
      (msg) => setErrors((prev) => ({ ...prev, password: msg }))
    );
    if (!isRequirementsOk) return;

    const isUserDataOk = checkUserData((msg) =>
      setErrors((prev) => ({ ...prev, email: msg }))
    );
    if (!isUserDataOk) return;

    const isLoggedInUserOk = getLoggedInUserAndCheckRequirements(
      (msg) => setErrors((prev) => ({ ...prev, email: msg })),
      (msg) => setErrors((prev) => ({ ...prev, password: msg })),
      values
    );
    if (!isLoggedInUserOk) return;

    getLogedInUser(values, setUser);
    setValues({ email: "", password: "" });
    toast.success("Login successfully!");
    navigate("/app");
  };

  return (
    <div className="clean-auth-container">
      <h2 className="clean-auth-title">Login to Your Account</h2>
      <form className="clean-auth-form" onSubmit={onSubmitHandler} noValidate>
        <div className="clean-form-group">
          <label htmlFor="email" className="clean-form-label">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={`clean-form-input ${
              errors.email ? "clean-input-error" : ""
            }`}
            placeholder="munir@example.com"
            autoComplete="username"
          />
          {errors.email && (
            <p className="clean-error-message">{errors.email}</p>
          )}
        </div>

        <div className="clean-form-group" style={{ position: "relative" }}>
          <label htmlFor="password" className="clean-form-label">
            Password
          </label>
          <div className="clean-password-wrapper">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              className={`clean-form-input ${
                errors.password ? "clean-input-error" : ""
              }`}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {showPassword ? (
              <IoEye
                className="clean-password-toggle"
                onClick={() => setShowPassword(false)}
                aria-label="Hide password"
                role="button"
              />
            ) : (
              <IoEyeOffSharp
                className="clean-password-toggle"
                onClick={() => setShowPassword(true)}
                aria-label="Show password"
                role="button"
              />
            )}
          </div>
          {errors.password && (
            <p className="clean-error-message">{errors.password}</p>
          )}
        </div>

        <button type="submit" className="clean-auth-submit-button">
          Login
        </button>

        <p className="clean-auth-footer">
          Don't have an account?{" "}
          <button
            type="button"
            className="clean-auth-signup-link"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
