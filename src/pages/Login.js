import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../store/auth-context";
import Form from "../components/UI/Form";
import formClasses from "./Forms.module.css";
import classes from "./Login.module.css";

const Login = () => {
  const history = useHistory();
  const [createMode, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState()
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredData = {
      authentication: {
        username: usernameInputRef.current?.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      },
    };

    // Add validation

    (async function (enteredData) {
      let url;
      if (createMode) {
        url = "http://localhost:3000/users";
      } else {
        url = "http://localhost:3000/auth/login";
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
          authCtx.login(data.token);
          setTimeout(function () {
            history.replace("./lessons")
          }, 1500);
          setFeedbackMessage("You have logged in.")
        } else {
          setFeedbackMessage("Authentication failed!");
        }
        console.log(response);
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
      <form className={formClasses.controls}>
        {createMode && (
          <div className={formClasses.control}>
            <label>Username</label>
            <input type="text" ref={usernameInputRef} />
          </div>
        )}
        <div className={formClasses.control}>
          <label>Email</label>
          <input type="text" ref={emailInputRef} />
        </div>
        <div className={formClasses.control}>
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
