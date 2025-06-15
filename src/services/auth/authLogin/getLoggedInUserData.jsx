export const getLoggedInUserAndCheckRequirements = (
  setEmailError,
  setPasswordError,
  values
) => {
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
