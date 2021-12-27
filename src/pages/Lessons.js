import { useState, useEffect } from "react";

import classes from "./Lessons.module.css";
import LessonCard from "../components/Lessons/LessonCard";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/lessons")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLessons(data);
      });
  }, []);

  return (
    <div className={classes.lessons}>
      {lessons.map(lesson => <LessonCard title={lesson.title}/>)}
    </div>
  );
};

export default Lessons;
