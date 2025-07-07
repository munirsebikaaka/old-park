export const createUserDataArrayAndStoreInLocalStorage = (
  values,
  setValues,
  randomNuber
) => {
  const {
    fullname,
    email,
    contact,
    identification,
    age,
    sex,
    nationality,

    password,
  } = values;
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
    employeeID: randomNuber,
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
