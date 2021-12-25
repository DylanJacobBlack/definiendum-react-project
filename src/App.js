import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import './App.module.css'

import NavBar from "./components/NavBar/NavBar";
import Lessons from "./components/Lessons/Lessons";
import Lesson from './components/Lesson/Lesson';

function App() {
  return (
    <Fragment>
      <NavBar />
      <Route path="/lessons">
        <Lessons />
      </Route>
      <Route path="/lesson">
        <Lesson />
      </Route>
    </Fragment>
  );
}

export default App;
