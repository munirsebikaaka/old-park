export const comparePasswords = (values, setErrors) => {
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
