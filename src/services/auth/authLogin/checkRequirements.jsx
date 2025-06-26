export const checkRequirement = (
  values,
  setEmailError,
  setPasswordError,
  setEmployeeIDError
) => {
  const { email, password, employeeID } = values;
  if (!email) {
    setEmailError("Please enter your email address");
    return false;
  } else {
    setEmailError("");
  }
  if (!employeeID) {
    setEmployeeIDError("Please enter your employee ID");
    return false;
  } else {
    setEmployeeIDError("");
  }
  if (!password) {
    setPasswordError("Please enter your password");
    return false;
  } else {
    setPasswordError("");
  }

  return true;
};
