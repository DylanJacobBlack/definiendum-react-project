import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import classes from "./Lesson.module.css";
import SideBar from "../components/Lesson/SideBar";
import LessonDisplay from "../components/Lesson/LessonDisplay";

const Lesson = () => {
  const params = useParams();
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLessonData() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `http://localhost:3000/api/v1/lessons/${params.lessonId}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        const data = await response.json();
        setLesson(data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }
    fetchLessonData();
  }, [params.lessonId]);

  let status = "No lesson found.";

  if (lesson !== null) {
    status = "";
  }

  if (error) {
    status = error;
  }

  if (isLoading) {
    status = "Lesson loading...";
  }

  return (
    <div className={classes.lesson}>
      {status !== "" && <h1>{status}</h1>}
      {!isLoading && status === "" && (
        <SideBar title={lesson.title} isLoading={isLoading} status={status} />
      )}
      {!isLoading && status === "" && (
        <LessonDisplay
          text={lesson.text}
          isLoading={isLoading}
          status={status}
        />
      )}
    </div>
  );
};

export default Lesson;
