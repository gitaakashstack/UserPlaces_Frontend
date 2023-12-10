import { useState } from "react";
import authContext from "./authContext";

const AuthProvider = function (props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);

  function loggingInHandler(loggedInUserID, token) {
    setIsLoggedIn(true);
    setUserID(loggedInUserID);
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("userID", JSON.stringify(loggedInUserID));
    if (localStorage.getItem("tokenExpTime")) {
      const storedTokenExpTime = parseInt(localStorage.getItem("tokenExpTime"));
      setTimeout(loggingOutHandler, storedTokenExpTime - Date.now());
    } else {
      const tokenExpTime = Date.now() + 20 * 1000;
      localStorage.setItem("tokenExpTime", JSON.stringify(tokenExpTime));
      setTimeout(loggingOutHandler, 20 * 1000);
    }
  }

  function loggingOutHandler() {
    setIsLoggedIn(false);
    setUserID(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("tokenExpTime");
  }

  return (
    <authContext.Provider
      value={{ isLoggedIn, userID, token, loggingInHandler, loggingOutHandler }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
