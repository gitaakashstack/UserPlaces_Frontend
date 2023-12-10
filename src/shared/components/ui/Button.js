import { NavLink } from "react-router-dom";
import "./Button.css";

const Button = function (props) {
  if (props.to)
    return (
      <NavLink
        to={props.to}
        className={props.className}
        onClick={props.onClick}
      >
        {props.children}
      </NavLink>
    );
  else
    return (
      <button
        className={props.className}
        onClick={props.onClick}
        value={props.value}
      >
        {props.children}
      </button>
    );
};

export default Button;
