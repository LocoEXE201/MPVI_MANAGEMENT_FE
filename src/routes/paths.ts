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
  dashboard: "/dashboard",
  category: "/category",
  order: "/order",
  supplier: "/supplier",
  report: "/report",
  delivery: "/delivery",
  deliveryDetail: (deliveryLogId: number) =>
    `/delivery/DeliveryDetail/${deliveryLogId}`,
  users: "/users",
  notification: "/notification"
};
