import { useState } from "react";
import "../uniqueStyles/auth.css";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";

import {
  checkIfAllInputsFilled,
  isAllValuesAdded,
} from "../services/auth/authSignup/checkIfAllInputsFilled";
import { createUserDataArrayAndStoreInLocalStorage } from "../services/auth/authSignup/createDataArray";
import { comparePasswords } from "../services/auth/authSignup/comparePassword";
import {
  isLowerCaseAdded,
  isNumsAdded,
  isPasswordLengthOk,
  isPasswordValid,
  isSymbolsAdded,
  isUpperCaseAdded,
} from "../services/passwordStrength/passwordStrength";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    contact: "",
    identification: "",
    age: "",
    sex: "",
    nationality: "",
    employeeID: Math.floor(Math.random() * 10000000000).toString(),
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    nameError: "",
    signEmailError: "",
    signPasswordError: "",
    cormfirmPasswordError: "",
    contactError: "",
    identificationError: "",
    ageError: "",
    sexError: "",
    nationalityError: "",
    employeeIDError: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!checkIfAllInputsFilled(values, setErrors)) return;
    if (!isAllValuesAdded(values)) return;
    createUserDataArrayAndStoreInLocalStorage(values, setValues);
    navigate("/login");
    toast.success("Sign up successfully!");
  };

  return (
    <div className="clean-auth-container">
      <div className="auth-card">
        <h2 className="clean-auth-title">Create New Account</h2>

        <form className="clean-auth-form" onSubmit={onSubmitHandler}>
          {/* Full Name */}
          <div className="clean-form-group">
            {errors.nameError && (
              <p className="clean-error-message">{errors.nameError}</p>
            )}
            <label htmlFor="signupName" className="clean-form-label">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={values.fullname}
              onChange={handleChange}
              id="signupName"
              className={`clean-form-input ${
                errors.nameError ? "clean-input-error" : ""
              }`}
              placeholder="munir ahmed"
            />
          </div>

          {/* Email Address */}
          <div className="clean-form-group">
            {errors.signEmailError && (
              <p className="clean-error-message">{errors.signEmailError}</p>
            )}
            <label htmlFor="signupEmail" className="clean-form-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="signupEmail"
              className={`clean-form-input ${
                errors.signEmailError ? "clean-input-error" : ""
              }`}
              placeholder="munir@example.com"
            />
          </div>

          {/* Contact Number */}
          <div className="clean-form-group">
            {errors.contactError && (
              <p className="clean-error-message">{errors.contactError}</p>
            )}
            <label htmlFor="signupContact" className="clean-form-label">
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              value={values.contact}
              onChange={handleChange}
              id="signupContact"
              className={`clean-form-input ${
                errors.contactError ? "clean-input-error" : ""
              }`}
              placeholder="123-456-7890"
            />
          </div>

          {/* Identification Number */}
          <div className="clean-form-group">
            {errors.identificationError && (
              <p className="clean-error-message">
                {errors.identificationError}
              </p>
            )}
            <label htmlFor="signupIdentification" className="clean-form-label">
              Identification Number
            </label>
            <input
              type="text"
              name="identification"
              value={values.identification}
              onChange={handleChange}
              id="signupIdentification"
              className={`clean-form-input ${
                errors.identificationError ? "clean-input-error" : ""
              }`}
              placeholder="123456789"
            />
          </div>

          {/* Age */}
          <div className="clean-form-group">
            {errors.ageError && (
              <p className="clean-error-message">{errors.ageError}</p>
            )}
            <label htmlFor="signupAge" className="clean-form-label">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={values.age}
              onChange={handleChange}
              id="signupAge"
              className={`clean-form-input ${
                errors.ageError ? "clean-input-error" : ""
              }`}
              placeholder="18"
            />
          </div>

          {/* Sex */}
          <div className="clean-form-group">
            {errors.sexError && (
              <p className="clean-error-message">{errors.sexError}</p>
            )}
            <label htmlFor="signupSex" className="clean-form-label">
              Sex
            </label>
            <select
              name="sex"
              value={values.sex}
              onChange={handleChange}
              id="signupSex"
              className={`clean-form-input ${
                errors.sexError ? "clean-input-error" : ""
              }`}>
              <option value="">Select your sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Nationality */}
          <div className="clean-form-group">
            {errors.nationalityError && (
              <p className="clean-error-message">{errors.nationalityError}</p>
            )}
            <label htmlFor="signupNationality" className="clean-form-label">
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              value={values.nationality}
              onChange={handleChange}
              id="signupNationality"
              className={`clean-form-input ${
                errors.nationalityError ? "clean-input-error" : ""
              }`}
              placeholder="Your nationality"
            />
          </div>

          {/* Employee ID */}
          <div className="clean-form-group">
            {errors.employeeIDError && (
              <p className="clean-error-message">{errors.employeeIDError}</p>
            )}
            <label htmlFor="signupEmployeeID" className="clean-form-label">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeID"
              value={values.employeeID}
              onChange={handleChange}
              id="signupEmployeeID"
              className={`clean-form-input ${
                errors.employeeIDError ? "clean-input-error" : ""
              }`}
              placeholder="Your Employee ID"
            />
          </div>

          {/* Password */}
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
                  errors.signPasswordError ? "clean-input-error" : ""
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
            {errors.signPasswordError && (
              <p className="clean-error-message">{errors.signPasswordError}</p>
            )}
          </div>

          {/* Password Checks */}
          <div
            className="passwordCheck"
            style={{ marginBottom: "var(--space-md)" }}>
            <p className="check">
              {isLowerCaseAdded(values.password) ? "✅" : "❌"} a-z
            </p>
            <p className="check">
              {isUpperCaseAdded(values.password) ? "✅" : "❌"} A-Z
            </p>
            <p className="check">
              {isNumsAdded(values.password) ? "✅" : "❌"} 0-9
            </p>
            <p className="check">
              {isSymbolsAdded(values.password) ? "✅" : "❌"} !-&
            </p>
            <p className="check">
              {isPasswordLengthOk(values.password) ? "✅" : "❌"} Strong
            </p>
          </div>

          {/* Confirm Password */}
          <div className="clean-form-group" style={{ position: "relative" }}>
            <label htmlFor="confirmPassword" className="clean-form-label">
              Confirm Password
            </label>
            <div className="clean-password-wrapper">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={handleChange}
                className={`clean-form-input ${
                  errors.confirmPassword ? "clean-input-error" : ""
                }`}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              {showConfirmPassword ? (
                <IoEye
                  className="clean-password-toggle"
                  onClick={() => setShowConfirmPassword(false)}
                  aria-label="Hide password"
                  role="button"
                />
              ) : (
                <IoEyeOffSharp
                  className="clean-password-toggle"
                  onClick={() => setShowConfirmPassword(true)}
                  aria-label="Show password"
                  role="button"
                />
              )}
            </div>
            {errors.confirmPassword && (
              <p className="clean-error-message">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" className="clean-auth-submit-button">
            Create Account
          </button>

          <div className="clean-auth-footer">
            Already have an account?
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="clean-auth-signup-link">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
