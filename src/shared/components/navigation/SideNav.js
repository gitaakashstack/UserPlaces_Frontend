import NavLinks from "./NavLinks";
import "./SideNav.css";

const SideNav = function (props) {
  return (
    <aside className="side-nav">
      <p className="cross-icon">
        <span onClick={props.onCancelClick}>
          <i className="fas fa-times"></i>
        </span>
      </p>
      <NavLinks className="side-navlinks" />
    </aside>
  );
};

export default SideNav;
