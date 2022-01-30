import { NavLink, Link } from "react-router-dom";
import { useContext, useState, Fragment } from "react";
import Select from "react-select";

import AuthContext from "../../store/auth-context";
import LangContext from "../../store/lang-context";
import classes from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const options = [
    { value: "spanish", label: "Spanish" },
    { value: "english", label: "English" },
  ];

  const [dropdown, setDropdown] = useState(false);

  const logoutHandler = () => {
    authCtx.logout();
  };

  const dropdownHandler = () => {
    setDropdown((prevState) => !prevState);
  };

  return (
    <LangContext.Consumer>
      {(langCtx) => {
        
        const selectLanguageHandler = (event) => {
          console.dir(event);
          // langCtx.changeLanguage(language);
        };

        return (
          <Fragment>
            <nav className={classes["nav-backdrop"]}>
              <div className={classes.menu}>
                <div className={classes["logo-text"]}>
                  <h1>
                    <FontAwesomeIcon icon={faLanguage} />
                  </h1>
                  <h1>definiens</h1>
                </div>
                <div className={classes.grower}></div>
                <Select options={options} onSelect={selectLanguageHandler} />
                {/* <h1>{langCtx.language}</h1> */}
                <div className={classes.grower}></div>
                <div className={classes["dropdown-btn"]}>
                  <FontAwesomeIcon icon={faBars} onClick={dropdownHandler} />
                </div>
                <div className={classes.links}>
                  <NavLink activeClassName={classes.active} to="/lessons">
                    lessons
                  </NavLink>
                  {isLoggedIn && (
                    <NavLink activeClassName={classes.active} to="/new">
                      new lesson
                    </NavLink>
                  )}
                  {/* {isLoggedIn && (
            <NavLink activeClassName={classes.active} to="/profile">
              profile
            </NavLink>
          )} */}
                </div>
                {!isLoggedIn && (
                  <Link to="/login">
                    <button className={`${classes.login} ${classes.btn}`}>
                      login
                    </button>
                  </Link>
                )}
                {isLoggedIn && (
                  <button
                    className={`${classes.active} ${classes.btn}`}
                    onClick={logoutHandler}
                  >
                    logout
                  </button>
                )}
              </div>
            </nav>
            {dropdown && (
              <div className={classes["dropdown-links"]}>
                {!isLoggedIn && (
                  <div className={classes["dropdown-link"]}>
                    <NavLink activeClassName={classes.active} to="/welcome">
                      welcome
                    </NavLink>
                  </div>
                )}
                <div className={classes["dropdown-link"]}>
                  <NavLink activeClassName={classes.active} to="/lessons">
                    lessons
                  </NavLink>
                </div>
                {isLoggedIn && (
                  <div className={classes["dropdown-link"]}>
                    <NavLink activeClassName={classes.active} to="/new">
                      new lesson
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </Fragment>
        );
      }}
    </LangContext.Consumer>
  );
};

export default NavBar;
