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
          <div>link</div>
          <div>link</div>
          <div>login</div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
