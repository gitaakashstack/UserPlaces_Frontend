import { NavLink } from "react-router-dom";
import { useContext } from "react";
import "./NavLinks.css";
import authContext from "../../../store/authContext";
const NavLinks = function (props) {
  const { isLoggedIn, userID, loggingOutHandler } = useContext(authContext);

  const activeClassFunc = ({ isActive }) => (isActive ? "navlink-active" : "");
  return (
    <ul className={`${props.className} navlinks`}>
      <li>
        <NavLink to="/api/users" end className={activeClassFunc}>
          All Users
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink
            to={`/api/places/user/${userID}`}
            className={activeClassFunc}
          >
            My Places
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/api/places" end className={activeClassFunc}>
            New Place
          </NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/api/users/auth" className={activeClassFunc}>
            Authenticate
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink
            to="/api/users/auth"
            className="logout-link"
            onClick={loggingOutHandler}
          >
            Log Out
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
