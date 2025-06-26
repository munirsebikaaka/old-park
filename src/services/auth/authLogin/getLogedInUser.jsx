export const getLogedInUser = (values, setUser, setShowApp) => {
  const { email, password, employeeID } = values;
  const users = JSON.parse(localStorage.getItem("userData")) || [];
  const logedInUser = users.find(
    (user) =>
      user.email === email &&
      user.employeeID === employeeID &&
      user.password === password
  );

  if (logedInUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(logedInUser));
    setUser(logedInUser);
    setShowApp(true);
  }
};
