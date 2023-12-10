import { Fragment, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Backdrop from "../ui/Backdrop";
import MainNav from "./MainNav";
import "./NavBar.css";
import SideNav from "./SideNav";

const NavBar = function () {
  const [showSideNav, setShowSideNav] = useState(false);

  function showSideNavHandler() {
    setShowSideNav(true);
  }

  function hideSideNavHandler() {
    setShowSideNav(false);
  }
  const hamMenu = (
    <div className="ham-menu" onClick={showSideNavHandler}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
  return (
    <Fragment>
      {showSideNav && <Backdrop onClick={hideSideNavHandler} />}
      <CSSTransition
        in={showSideNav}
        timeout={400}
        classNames="show"
        mountOnEnter
        unmountOnExit
      >
        <SideNav onCancelClick={hideSideNavHandler} />
      </CSSTransition>

      <nav className="top-nav">
        {hamMenu}
        <h1>YourPlaces</h1>
        <MainNav />
      </nav>
    </Fragment>
  );
};

export default NavBar;
