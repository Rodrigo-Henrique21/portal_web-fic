import Cookies from "js-cookie";

export const logout = () => {
  Cookies.remove("authToken");
  window.location.href = "/login";
};