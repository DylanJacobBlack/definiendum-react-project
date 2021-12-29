import { useState, useEffect } from "react";

import classes from "./Lessons.module.css";
import LessonCard from "../components/Lessons/LessonCard";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLessonData() {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Loading!");
        const response = await fetch("http://localhost:3000/api/v1/lessons");

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        const data = await response.json();
        setLessons(data);
        console.log("Done loading!");
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }
    fetchLessonData();
  }, []);

  let status = "No lesson found.";

  if (lessons.length > 0) {
    status = "";
  }

  if (error) {
    status = error;
  }

  if (isLoading) {
    status = "Lessons loading...";
  }

  return (
    <div className={classes.lessons}>
      {status !== "" && <h1>{status}</h1>}
      {!isLoading &&
        lessons.length > 0 &&
        lessons.map((lesson) => <LessonCard title={lesson.title} />)}
    </div>
  );
};

export default Lessons;
