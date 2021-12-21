import { Fragment } from 'react';
import './App.module.css'

import NavBar from "./components/NavBar/NavBar.js";
import Lessons from "./components/Lessons/Lessons.js";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Lessons />
    </Fragment>
  );
}

export default App;
