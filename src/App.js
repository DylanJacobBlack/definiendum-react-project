import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.module.css";

import NavBar from "./components/NavBar/NavBar";
import Lessons from "./pages/Lessons";
import Lesson from "./pages/Lesson";
import NewLesson from "./pages/NewLesson";
import Login from "./pages/Login";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Switch>
        <Route path="/lessons" exact>
          <Lessons />
        </Route>
        <Route path="/lessons/:lessonId">
          <Lesson />
        </Route>
        <Route path="/new">
          <NewLesson />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
