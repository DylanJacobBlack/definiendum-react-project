import { Route, Switch, useHistory} from "react-router-dom";
import "./App.module.css";

import NavBar from "./components/NavBar/NavBar";
import Lessons from "./pages/Lessons";
import Lesson from "./pages/Lesson";
import NewLesson from "./pages/NewLesson";
import Profile from "./pages/Profile"
import Login from "./pages/Login";
import { AuthContextProvider } from "./store/auth-context"

function App() {
  const history = useHistory();

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
      console.log("REPONSE!!" + response);
    } catch (error) {
      console.log(error);
    }
    history.push("/lessons");
  }

  return (
    <AuthContextProvider>
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
        <Route path="/login">
          <Profile />
        </Route>
      </Switch>
    </AuthContextProvider>
  );
}

export default App;
