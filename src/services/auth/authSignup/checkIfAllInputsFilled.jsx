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

export const checkIfAllInputsFilled = (values, setErrors) => {
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

export const isAllValuesAdded = (values) => {
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
  const allValuesAdded =
    fullname.length > 0 &&
    email.length > 0 &&
    contact.length > 0 &&
    identification.length > 0 &&
    age.length > 0 &&
    sex.length > 0 &&
    nationality.length > 0 &&
    employeeID.length > 0 &&
    password.length > 0;
  return allValuesAdded;
};
