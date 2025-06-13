import { useState } from "react";
import "../uniqueStyles/auth.css";
import { IoCloseSharp, IoEye, IoEyeOffSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import {
  isLowerCaseAdded,
  isSymbolsAdded,
  isUpperCaseAdded,
  isNumsAdded,
} from "../services/passwordStrength/passwordStrength";

const SignupForm = () => {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    contact: "",
    identification: "",
    age: "",
    sex: "",
    nationality: "",
    employeeID: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const isPasswordLengthOk = values.password.length >= 6;
  const isPasswordValid =
    isLowerCaseAdded(values.password) &&
    isUpperCaseAdded(values.password) &&
    isNumsAdded(values.password) &&
    isSymbolsAdded(values.password) &&
    isPasswordLengthOk;

  const checkFilds = (value, setErrors, allFilled, error, message) => {
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [error]: message || "This field is required",
      }));
      allFilled = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [error]: "",
      }));
    }
  };

  const checkIfAllInputsFilled = () => {
    const {
      fullname,
      email,
      password,
      confirmPassword,
      contact,
      identification,
      age,
      sex,
      nationality,
      employeeID,
    } = values;

    let allFilled = true;
    checkFilds(
      fullname,
      setErrors,
      allFilled,
      "nameError",
      "Please enter your full name"
    );
    checkFilds(
      email,
      setErrors,
      allFilled,
      "signEmailError",
      "Please enter your email address"
    );
    checkFilds(
      password,
      setErrors,
      allFilled,
      "signPasswordError",
      "Please enter your password"
    );
    checkFilds(
      confirmPassword,
      setErrors,
      allFilled,
      "cormfirmPasswordError",
      "Please confirm your password"
    );
    checkFilds(
      contact,
      setErrors,
      allFilled,
      "contactError",
      "Please enter your contact number"
    );
    checkFilds(
      identification,
      setErrors,
      allFilled,
      "identificationError",
      "Please enter your identification number"
    );
    checkFilds(age, setErrors, allFilled, "ageError", "Please enter your age");
    checkFilds(sex, setErrors, allFilled, "sexError", "Please select your sex");
    checkFilds(
      nationality,
      setErrors,
      allFilled,
      "nationalityError",
      "Please enter your nationality"
    );
    checkFilds(
      employeeID,
      setErrors,
      allFilled,
      "employeeIDError",
      "Please enter your employee ID"
    );

    return allFilled;
  };

  const createUserDataArrayAndStoreInLocalStorage = () => {
    const {
      fullname,
      email,
      contact,
      identification,
      age,
      sex,
      nationality,
      employeeID,
      password,
    } = values;
    if (!checkIfAllInputsFilled()) return;

    let userData = [];
    userData = JSON.parse(localStorage.getItem("userData")) || [];
    userData.push({
      fullname: fullname,
      email: email,
      contact: contact,
      identification: identification,
      age: age,
      sex: sex,
      nationality: nationality,
      employeeID: employeeID,
      password: password,
    });
    localStorage.setItem("userData", JSON.stringify(userData));
    setValues({
      fullname: "",
      email: "",
      contact: "",
      identification: "",
      age: "",
      sex: "",
      nationality: "",
      employeeID: "",
      password: "",
      confirmPassword: "",
    });
  };

  const comparePasswords = () => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cormfirmPasswordError: "Passwords do not match",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cormfirmPasswordError: "",
      }));
      return true;
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!comparePasswords()) return;
    createUserDataArrayAndStoreInLocalStorage();
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create New Account</h2>

        <form className="auth-form" onSubmit={onSubmitHandler}>
          {/* {showPassword ? (
            <IoEye
              className="signup-password-eye"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <IoEyeOffSharp
              className="signup-password-eye"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}

          {showConfirmPassword ? (
            <IoEye
              className="signup-confirm-password-eye"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          ) : (
            <IoEyeOffSharp
              className="signup-confirm-password-eye"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          )} */}

          <div className="form-group">
            <p className="namesErr">{errors.nameError}</p>

            <label htmlFor="signupName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={values.fullname}
              onChange={handleChange}
              id="signupName"
              className="form-input"
              placeholder="munir ahmed"
              style={
                errors.nameError.length > 0
                  ? { border: "1px solid  #991b1b" }
                  : { border: "1px solid #d1d5db" }
              }
            />
          </div>

          <div className="form-group">
            <p className="emailErr">{errors.signEmailError}</p>

            <label htmlFor="signupEmail" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="signupEmail"
              className="form-input"
              placeholder="munir@example.com"
              style={
                errors.signEmailError.length > 0
                  ? { border: "1px solid  #991b1b" }
                  : { border: "1px solid #d1d5db" }
              }
            />
          </div>

          <div className="form-group">
            <p className="contactErr">{errors.contactError}</p>
            <label htmlFor="signupContact" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              value={values.contact}
              onChange={handleChange}
              id="signupContact"
              className="form-input"
              placeholder="123-456-7890"
              style={
                errors.contactError.length > 0
                  ? { border: "1px solid  #991b1b" }
                  : { border: "1px solid #d1d5db" }
              }
            />
          </div>

          <div className="form-group">
            <p className="identificationErr">{errors.identificationError}</p>
            <label htmlFor="signupIdentification" className="form-label">
              Identification Number
            </label>
            <input
              type="text"
              name="identification"
              value={values.identification}
              onChange={handleChange}
              id="signupIdentification"
              className="form-input"
              placeholder="123456789"
              style={
                errors.identificationError.length > 0
                  ? { border: "1px solid  #991b1b" }
                  : { border: "1px solid #d1d5db" }
              }
            />
          </div>
          <div className="form-group">
            <p className="ageErr">{errors.ageError}</p>
            <label htmlFor="signupAge" className="form-label">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={values.age}
              onChange={handleChange}
              id="signupAge"
              className="form-input"
              placeholder="18"
              style={
                errors.ageError.length > 0
                  ? { border: "1px solid  #991b1b" }
                  : { border: "1px solid #d1d5db" }
              }
            />
          </div>

          <div className="form-group">
            <p className="sexErr">{errors.sexError}</p>
            <label htmlFor="signupSex" className="form-label">
              Sex
            </label>
            <select
              name="sex"
              value={values.sex}
              onChange={handleChange}
              id="signupSex"
              className="form-input"
              style={
                errors.sexError.length > 0
                  ? { border: "1px solid  #991b1b" }
                  : { border: "1px solid #d1d5db" }
              }
            >
              <option value="">Select your sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <p className="nationalityErr">{errors.nationalityError}</p>
            <label htmlFor="signupNationality" className="form-label">
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              value={values.nationality}
              onChange={handleChange}
              id="signupNationality"
              className="form-input"
              placeholder="Your nationality"
              style={
                errors.nationalityError.length > 0
                  ? { border: "1px solid  #991b1b" }
                  : { border: "1px solid #d1d5db" }
              }
            />
          </div>
          <div className="form-group">
            <p className="employeeIDErr">{errors.employeeIDError}</p>
            <label htmlFor="signupEmployeeID" className="form-label">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeID"
              value={values.employeeID}
              onChange={handleChange}
              id="signupEmployeeID"
              className="form-input"
              placeholder="Your Employee ID"
              style={
                errors.employeeIDError.length > 0
                  ? { border: "1px solid  #991b1b" }
                  : { border: "1px solid #d1d5db" }
              }
            />
          </div>

          <div className="form-group">
            <p className="passwordErr">{errors.signPasswordError}</p>
            <label htmlFor="signupPassword" className="form-label">
              Password
            </label>
            <input
              type={!showPassword ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="signupPassword"
              className="form-input"
              placeholder="••••••••"
              style={
                errors.signPasswordError.length > 0
                  ? { border: "1px solid  #991b1b" }
                  : { border: "1px solid #d1d5db" }
              }
            />
          </div>

          {/* <div className={"passwordCheck"}>
            <div>
              <p className={"check"}>
                {isUpperCaseAdded(values.password) ? (
                  <IoMdCheckmark
                    style={{
                      color: "#00ff00",
                    }}
                  />
                ) : (
                  <IoCloseSharp
                    style={{
                      color: "#fc4747",
                    }}
                  />
                )}
                one capital letter
              </p>
              <p className={"check"}>
                {isLowerCaseAdded(values.password) ? (
                  <IoMdCheckmark
                    style={{
                      color: "#00ff00",
                    }}
                  />
                ) : (
                  <IoCloseSharp
                    style={{
                      color: "#fc4747",
                    }}
                  />
                )}
                one small letter
              </p>
              <p className={"check"}>
                {isLowerCaseAdded(values.password) &&
                isUpperCaseAdded(values.password) ? (
                  <IoMdCheckmark
                    style={{
                      color: "#00ff00",
                    }}
                  />
                ) : (
                  <IoCloseSharp
                    style={{
                      color: "#fc4747",
                    }}
                  />
                )}
                only Latin letters
              </p>
            </div>
            <div>
              <p className={"check"}>
                {isNumsAdded(values.password) ? (
                  <IoMdCheckmark
                    style={{
                      color: "#00ff00",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                ) : (
                  <IoCloseSharp
                    style={{
                      color: "#fc4747",
                    }}
                  />
                )}{" "}
                one digit
              </p>
              <p className={"check"}>
                {isSymbolsAdded(values.password) ? (
                  <IoMdCheckmark
                    style={{
                      color: "#00ff00",
                    }}
                  />
                ) : (
                  <IoCloseSharp
                    style={{
                      color: "#fc4747",
                    }}
                  />
                )}
                one symbol
              </p>
              <p className={"check"}>
                {isPasswordLengthOk ? (
                  <IoMdCheckmark
                    style={{
                      color: "#00ff00",
                    }}
                  />
                ) : (
                  <IoCloseSharp
                    style={{
                      color: "#fc4747",
                    }}
                  />
                )}
                use 6 or more
              </p>
            </div>
          </div> */}

          <div className="form-group">
            <p className="confirmPasswordErr">{errors.cormfirmPasswordError}</p>
            <label htmlFor="signupConfirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              id="signupConfirmPassword"
              className="form-input"
              placeholder="••••••••"
              style={
                errors.cormfirmPasswordError.length > 0
                  ? { border: "1px solid  #991b1b" }
                  : { border: "1px solid #d1d5db" }
              }
            />
          </div>

          <button type="submit" className="auth-button primary">
            Create Account
          </button>

          <div className="auth-footer">
            Already have an account?
            <a href="#" className="auth-link">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
