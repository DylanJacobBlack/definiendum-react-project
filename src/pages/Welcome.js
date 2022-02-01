import { useContext } from "react";
import { useHistory } from "react-router-dom"

import LangContext from "../store/lang-context";

import classes from "./Welcome.module.css";



const Welcome = () => {
  const langCtx = useContext(LangContext)
  const history = useHistory();
  
  if (langCtx.language) history.replace("/lessons")

  return (
    <div className={classes.welcome}>
      <div className={classes.header} alt="girl reading"></div>
      <div className={classes["text-box"]}>
        <h2 className={classes.slogan1}>Learn languages</h2>
        <h2 className={classes.slogan2}>the easy way</h2>
      </div>
    </div>
  );
};

export default Welcome;
