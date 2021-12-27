import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import './App.module.css'

import NavBar from "./components/NavBar/NavBar";
import Lessons from "./pages/Lessons";
import Lesson from './pages/Lesson';

function App() {
  return (
    <Fragment>
      <NavBar />
      <Route path="/lessons">
        <Lessons />
      </Route>
      <Route path="/lesson/:lessonId">
        <Lesson />
      </Route>
    </Fragment>
  );
}

export default App;
