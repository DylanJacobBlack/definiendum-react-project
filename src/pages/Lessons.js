import classes from "./Lessons.module.css";
import Lesson from "../components/Lessons/Lesson";

const Lessons = () => {
  return (
    <div className={classes.lessons}>
      <Lesson />
      <Lesson />
      <Lesson />
      <Lesson />
      <Lesson />
      <Lesson />
    </div>
  );
};

export default Lessons;
