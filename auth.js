import cookies from "js-cookie";
import cookie from "cookie";

export const setTokens = ({ accessToken, refreshToken }) => {
  cookies.set("accessToken", accessToken);
  cookies.set("refreshToken", refreshToken);

  location.reload();
};

export const getRefreshToken = () => {
  return cookies.get("refreshToken");
};

export const removeTokens = () => {
  cookies.remove("accessToken");
  cookies.remove("refreshToken");

  location.reload();
};

export const parseCookies = (req, options = {}) => {
  return cookie.parse(
    req ? req.headers.cookie || "" : document.cookie,
    options
  );
};
