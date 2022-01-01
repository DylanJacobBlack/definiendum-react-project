

import classes from "./LessonDisplay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const LessonDisplay = (props) => {
  // const pages = props.text.split('.').map((page)=>{
  //   return (<div className={classes.page}>

  //   </div>)
  // });

  return (
    <div className={classes.lesson}>
      <button className={classes.button}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className={classes.page}>{props.text}</div>
      <button className={classes.button}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default LessonDisplay;
