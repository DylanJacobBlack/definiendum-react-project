import { useState, useRef, useContext } from "react";

import AuthContext from "../store/auth-context";
import Form from "../components/UI/Form";
import classes from "./Login.module.css";

const Login = () => {
  const [createMode, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [passwordConfIsValid, setPasswordConfIsValid] = useState(true);
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    setUsernameIsValid(true);
    setEmailIsValid(true);
    setPasswordIsValid(true);
    setPasswordConfIsValid(true);

    let enteredData;
    if (createMode) {
      enteredData = {
        user: {
          username: usernameInputRef.current.value.trim(),
          email: emailInputRef.current.value.trim(),
          password: passwordInputRef.current.value.trim(),
        },
      };
    } else {
      enteredData = {
        authentication: {
          email: emailInputRef.current.value.trim(),
          password: passwordInputRef.current.value.trim(),
        },
      };
    }

    // Validation

    if (createMode && enteredData.user.username === "") {
      setUsernameIsValid(false);
      setFeedbackMessage("Username cannot be empty.");
      return;
    }
    if (createMode && enteredData.user.username.length < 6) {
      setUsernameIsValid(false);
      setFeedbackMessage("Username must be at least 6 characters.");
      return;
    }
    if (
      createMode &&
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        enteredData.user.email
      )
    ) {
      setEmailIsValid(false);
      setFeedbackMessage("Invalid email.");
      return;
    }
    if (createMode && enteredData.user.password === "") {
      setPasswordIsValid(false);
      setFeedbackMessage("Password cannot be empty.");
      return;
    }
    if (createMode && enteredData.user.password.length < 6) {
      setPasswordIsValid(false);
      setFeedbackMessage("Password must be at least 6 characters.");
      return;
    }
    if (
      createMode &&
      enteredData.user.password === passwordConfInputRef.current.value.trim()
    ) {
      setPasswordConfIsValid(false);
      setFeedbackMessage("Password confirmation must match.");
      return;
    }

    (async function (enteredData) {
      let url;
      if (createMode) {
        url = "https://definiens-api.herokuapp.com/users";
      } else {
        url = "https://definiens-api.herokuapp.com/auth/login";
      }
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enteredData),
        });
        setIsLoading(false);
        if (response.ok && createMode) {
          setFeedbackMessage("Success! You are now able to login.");
          setCreateMode(false);
        } else if (response.ok) {
          const data = await response.json();
          const expirationTime = new Date(data.exp);
          authCtx.login(data.token, expirationTime);
        } else {
          setFeedbackMessage("Authentication failed!");
        }
      } catch (error) {
        console.log(error);
        setFeedbackMessage("Problem encountered.");
      }
    })(enteredData);
  };

  const switchHandler = (event) => {
    event.preventDefault();

    setUsernameIsValid(true);
    setEmailIsValid(true);
    setPasswordIsValid(true);
    setPasswordConfIsValid(true);

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";

    setFeedbackMessage("");
    setCreateMode((prevState) => !prevState);
  };

  let switchMessage = "Create new account";
  let submitMessage = "Login";

  if (createMode) {
    switchMessage = "Login to existing account";
    submitMessage = "Create";
  }

  return (
    <Form>
      <form className={classes.controls}>
        {createMode && (
          <div className={classes.control}>
            <label>Username</label>
            <input
              classtype="text"
              ref={usernameInputRef}
              className={usernameIsValid ? "" : classes.invalid}
            />
          </div>
        )}
        <div className={classes.control}>
          <label>Email</label>
          <input
            type="text"
            ref={emailInputRef}
            className={emailIsValid ? "" : classes.invalid}
          />
        </div>
        <div className={classes.control}>
          <label>Password</label>
          <input
            type="password"
            ref={passwordInputRef}
            className={passwordIsValid ? "" : classes.invalid}
          />
        </div>
        {createMode && (
          <div className={classes.control}>
            <label>Password confirmation</label>
            <input
              type="password-confirmation"
              ref={passwordConfInputRef}
              className={passwordConfIsValid ? "" : classes.invalid}
            />
          </div>
        )}
        <button type="submit" onClick={submitHandler}>
          {submitMessage}
        </button>
      </form>
      <button className={classes.switch} onClick={switchHandler}>
        {switchMessage}
      </button>
      {feedbackMessage && <p className={classes.warning}>{feedbackMessage}</p>}
      {isLoading && <p>Please wait...</p>}
    </Form>
  );
};

export default Login;
