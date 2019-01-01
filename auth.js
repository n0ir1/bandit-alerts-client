import cookies from "js-cookie";
import cookie from "cookie";

export const setToken = token => {
  cookies.set("token", token);
  location.reload();
};

export const removeToken = () => {
  cookies.remove("token");
  location.reload();
};

export const parseCookies = (req, options = {}) => {
  return cookie.parse(
    req ? req.headers.cookie || "" : document.cookie,
    options
  );
};
