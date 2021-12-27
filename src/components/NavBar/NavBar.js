import { NavLink } from "react-router-dom";

import classes from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
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
          <NavLink activeClassName={classes.active} to="/lessons">
            lessons
          </NavLink>
          <NavLink activeClassName={classes.active} to="/new">
            new lesson
          </NavLink>
          <NavLink activeClassName={classes.active} to="/login">
            login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
