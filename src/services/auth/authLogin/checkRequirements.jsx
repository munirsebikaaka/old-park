export const checkRequirement = (values, setEmailError, setPasswordError) => {
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
