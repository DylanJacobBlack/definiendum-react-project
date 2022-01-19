import { useState, useRef, useContext } from "react";

import AuthContext from "../store/auth-context";
import Form from "../components/UI/Form";
import classes from "./Login.module.css";

const Login = () => {
  const [createMode, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    let enteredData;
    if (createMode) {
      enteredData = {
        user: {
          username: usernameInputRef.current.value,
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
        },
      };
    } else {
      enteredData = {
        authentication: {
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
        },
      };
    }

    // Add validation

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

    setCreateMode((prevState) => !prevState);
  };

  let switchMessage = "Create a new account";
  let submitMessage = "Login";

  if (createMode) {
    switchMessage = "Login to an existing account";
    submitMessage = "Create";
  }

  return (
    <Form>
      <form className={classes.controls}>
        {createMode && (
          <div className={classes.control}>
            <label>Username</label>
            <input type="text" ref={usernameInputRef} />
          </div>
        )}
        <div className={classes.control}>
          <label>Email</label>
          <input type="text" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label>Password</label>
          <input type="password" ref={passwordInputRef} />
        </div>
        <button type="submit" onClick={submitHandler}>
          {submitMessage}
        </button>
      </form>
      <button className={classes.switch} onClick={switchHandler}>
        {switchMessage}
      </button>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      {isLoading && <p>Please wait...</p>}
    </Form>
  );
};

export default Login;
