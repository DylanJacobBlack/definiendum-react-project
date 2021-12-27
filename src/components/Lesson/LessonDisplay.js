import classes from "./LessonDisplay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const LessonDisplay = () => {
  return (
    <div className={classes.lesson}>
      <button className={classes.button}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className={classes.page}>Lesson text goes here.</div>
      <button className={classes.button}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default LessonDisplay;
