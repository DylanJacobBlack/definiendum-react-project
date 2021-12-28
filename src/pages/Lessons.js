import { useState, useEffect } from "react";

import classes from "./Lessons.module.css";
import LessonCard from "../components/Lessons/LessonCard";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchLessonData() {
      setIsLoading(true);
      console.log('Loading!')
      const response = await fetch("http://localhost:3000/api/v1/lessons");
      const data = await response.json();
      setLessons(data);
      setIsLoading(false);
      console.log('Done loading!')
    }
    fetchLessonData();
  }, []);

  return (
    <div className={classes.lessons}>
      {isLoading && <h1>Lessons loading!!!</h1>}
      {!isLoading &&
        lessons.map((lesson) => <LessonCard title={lesson.title} />)}
    </div>
  );
};

export default Lessons;
