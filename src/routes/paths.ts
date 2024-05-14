function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOT = "/";

export const PATH_AUTH = {
  login: "/login",
  register: "/register",
  loginForgotPassword: (email: string) => `/login/forgotPassword/${email}`,
};

export const PATH_MAIN = {
  root: "/",
  category: "/category",
  order: "/order",
  supplier: "/supplier",
};
