import { NavLink, Link, useHistory } from "react-router-dom";
import { useContext, useState, Fragment } from "react";
import Select from "react-select";

import AuthContext from "../../store/auth-context";
import LangContext from "../../store/lang-context";
import classes from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faBars,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const isLoggedIn = authCtx.isLoggedIn;

  const options = [
    { value: "zh", label: "Chinese" },
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "es", label: "Spanish" },
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
          if (event.value) {
            langCtx.changeLanguage(event.value);
            history.replace("/lessons");
          }
        };

        const defaultValue = options.findIndex(
          (language) => language.value === langCtx.language
        );

        const customStyles = {
          control: (provided) => ({
            ...provided,
            backgroundColor: "rgb(207, 207, 207)",
            padding: ".2rem",
            cursor: "pointer",
            border: ".1rem solid black",
            color: "black",
            fontSize: "larger",
          }),
          option: (provided, state) => ({
            ...provided,
            // border: "1rem solid purple",
            // color: state.isSelected ? "red" : "blue",
            // padding: 20,
          }),
        };

        return (
          <Fragment>
            <nav className={classes["nav-backdrop"]}>
              <div className={classes.menu}>
                <div className={classes["select-box"]}>
                  <Select
                    defaultValue={options[defaultValue]}
                    options={options}
                    onChange={selectLanguageHandler}
                    styles={customStyles}
                    menuColor="purple"
                    isDisabled={!langCtx.disabled}
                  />
                </div>
                <div className={classes.grower}>
                  <div className={classes.message}>
                    {!langCtx.language && (
                      <p>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        &nbsp;&nbsp;Select a language to get started!
                      </p>
                    )}
                  </div>
                  <div className={classes["logo-text-box"]}>
                    <div className={classes["logo-text"]}>
                      <h1>
                        <FontAwesomeIcon icon={faLanguage} />
                      </h1>
                      <h1>definiens</h1>
                    </div>
                  </div>
                  {/* <h1>{langCtx.language}</h1> */}
                  <div></div>
                </div>
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
