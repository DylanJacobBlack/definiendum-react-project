import dummyPic from "../components/Lessons/card-left.jpg";
import classes from "./Lesson.module.css";
import SideBar from "../components/Lesson/SideBar"
import LessonDisplay from "../components/Lesson/LessonDisplay"

const Lesson = () => {
  return (
    <div class={classes.lesson}>
      <SideBar />
      <LessonDisplay />
    </div>
  );
};

export default Lesson;
