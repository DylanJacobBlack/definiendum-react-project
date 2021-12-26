import classes from "./LessonDisplay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const LessonDisplay = () => {
  return (
    <div class={classes.lesson}>
      <button class={classes.button}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div class={classes.page}>Lesson text goes here.</div>
      <button class={classes.button}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default LessonDisplay;
