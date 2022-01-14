import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { useContext, Fragment } from "react";
import "./App.module.css";

import NavBar from "./components/NavBar/NavBar";
import Lessons from "./pages/Lessons";
import Lesson from "./pages/Lesson";
import NewLesson from "./pages/NewLesson";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import AuthContext from "./store/auth-context";

function App() {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  async function addLessonHandler(enteredTitle, enteredText) {
    try {
      const response = await fetch("http://localhost:3000/api/v1/lessons", {
        method: "POST",
        body: JSON.stringify({
          title: enteredTitle,
          text: enteredText,
          user_id: 1,
          language_id: 1,
        }),
        headers: { "Content-Type": "application/json" },
      });
      console.log("RESPONSE!!" + response);
    } catch (error) {
      console.log(error);
    }
    history.push("/");
  }

  return (
    <Fragment>
      <NavBar />
      {isLoggedIn && (
        <Switch>
          <Route path="/" exact>
            <Lessons />
          </Route>
          <Route path="/new">
            <NewLesson onAddLesson={addLessonHandler} />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/lessons/:lessonId">
            <Lesson />
          </Route>
          <Route path="/*">
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
      {!isLoggedIn && (
        <Switch>
          <Route path="/" exact>
            <Welcome />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/*">
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </Fragment>
  );
}

export default App;
