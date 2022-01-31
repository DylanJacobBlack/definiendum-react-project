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
          langCtx.changeLanguage(event.value);
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
          singleValue: (provided, state) => {
            const opacity = state.isDisabled ? .5 : 1;
            const transition = "opacity 300ms";

            return { ...provided, opacity, transition };
          },
        };

        return (
          <Fragment>
            <nav className={classes["nav-backdrop"]}>
              <div className={classes.menu}>
                <Select
                  defaultValue={options[defaultValue]}
                  options={options}
                  onChange={selectLanguageHandler}
                  styles={customStyles}
                  menuColor="purple"
                  isDisabled={!langCtx.disabled}
                />
                <div className={classes.grower}></div>
                <div className={classes["logo-text"]}>
                  <h1>
                    <FontAwesomeIcon icon={faLanguage} />
                  </h1>
                  <h1>definiens</h1>
                </div>
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
