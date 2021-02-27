export const setBtnName = (component) => {
  const btnName =
    component === "Login"
      ? "Регистрация"
      : component === "Register"
      ? "Войти"
      : component === "Main"
      ? "Выйти"
      : "Войти";
  return btnName;
};

export const setRedirectPath = (component) => {
  const path = component === "Login" ? "/signup" : "signin";
  return path;
};
