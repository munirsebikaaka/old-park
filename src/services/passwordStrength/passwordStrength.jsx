export const isLowerCaseAdded = (value) => {
  const lowerCase = "abcdefghijklmnopqrstuvwxyz".split("");
  const isLowerCaseAdded = lowerCase.some((el) => value.includes(el));
  return isLowerCaseAdded;
};
export const isUpperCaseAdded = (value) => {
  const lowerCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const isLowerCaseAdded = lowerCase.some((el) => value.includes(el));
  return isLowerCaseAdded;
};
export const isNumsAdded = (value) => {
  const nums = "1234567890".split("");
  const isNumsAdded = nums.some((el) => value.includes(el));
  return isNumsAdded;
};
export const isSymbolsAdded = (value) => {
  const symbols = `!@#$%^&*()-_=+/.,<>'";:?/|`.split("");
  const isSymbols = symbols.some((el) => value.includes(el));
  return isSymbols;
};

export const isPasswordLengthOk = (value) => value.length >= 6;

export const isPasswordValid = (values) => {
  const isPasswordValid =
    isLowerCaseAdded(values.password) &&
    isUpperCaseAdded(values.password) &&
    isNumsAdded(values.password) &&
    isSymbolsAdded(values.password) &&
    isPasswordLengthOk(values.password);
  return isPasswordValid;
};
