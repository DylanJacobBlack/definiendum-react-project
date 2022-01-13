import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../../store/auth-context";
import classes from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <nav className={classes["nav-backdrop"]}>
      <div className={classes.menu}>
        <div className={classes["logo-text"]}>
          <h1>
            <FontAwesomeIcon icon={faLanguage} />
          </h1>
          <h1>definiens</h1>
        </div>
        <div className={classes.grower}></div>
        <div className={classes.links}>
          {isLoggedIn && (
            <NavLink activeClassName={classes.active} to="/">
              lessons
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink activeClassName={classes.active} to="/new">
              new lesson
            </NavLink>
          )}
          {!isLoggedIn && (
            <NavLink activeClassName={classes.active} to="/welcome">
              welcome
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink activeClassName={classes.active} to="/profile">
              profile
            </NavLink>
          )}
        </div>
        {!isLoggedIn && (
          <Link to="/login">
            <button className={classes.login}>login</button>
          </Link>
        )}
        {isLoggedIn && (
          <button className={classes.active} onClick={logoutHandler}>
            logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
