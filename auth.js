import cookies from "js-cookie";

export const setToken = token => {
  cookies.set("token", token);
  location.reload();
};

export const removeToken = () => {
  cookies.remove("token");
  location.reload();
};
