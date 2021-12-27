import { useParams } from 'react-router-dom'

import classes from "./Lesson.module.css";
import SideBar from "../components/Lesson/SideBar"
import LessonDisplay from "../components/Lesson/LessonDisplay"

const Lesson = () => {
  const params = useParams();

  return (
    <div className={classes.lesson}>
      <SideBar lessonInfo={params.lessonId}/>
      <LessonDisplay />
    </div>
  );
};

export default Lesson;
