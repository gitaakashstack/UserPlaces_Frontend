import { createContext } from "react";

const authContext = createContext({
  userID: null,
  token: null,
  isLoggedIn: null,
  loggingInHandler: () => {},
  loggingOutHandler: () => {},
});

export default authContext;
