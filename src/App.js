import "./App.css";
import { Fragment, useContext, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./shared/components/navigation/NavBar";
import Places from "./places/pages/Places";
import NewPlace from "./places/pages/NewPlace";
import Users from "./users/pages/Users";
import LogIn from "./users/pages/LogIn";
import UpdatePlace from "./places/pages/UpdatePlace";
import authContext from "./store/authContext";

function App() {
  const { loggingInHandler, loggingOutHandler } = useContext(authContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    if (token) {
      const tokenExpTime = parseInt(localStorage.getItem("tokenExpTime"));
      if (Date.now() >= tokenExpTime) loggingOutHandler();
      else loggingInHandler(userID, token);
    }
  }, []);
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/api/places" element={<Outlet />}>
          <Route path="user/:userID" element={<Places />} />
          <Route path="" element={<NewPlace />} />
          <Route path=":placeID" element={<UpdatePlace />} />
        </Route>
        <Route path="/api/users" element={<Outlet />}>
          <Route path="" element={<Users />} />
          <Route path="auth" element={<LogIn />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
