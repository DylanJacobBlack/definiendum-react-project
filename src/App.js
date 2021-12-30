import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.module.css";

import NavBar from "./components/NavBar/NavBar";
import Lessons from "./pages/Lessons";
import Lesson from "./pages/Lesson";
import NewLesson from "./pages/NewLesson";
import Login from "./pages/Login";

function App() {
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

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
          <NewLesson onAddLesson={addLessonHandler} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
