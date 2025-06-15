export const checkUserData = (setEmailError) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    setEmailError("No user data found. Please sign up first.");
    return false;
  }
  return true;
};
