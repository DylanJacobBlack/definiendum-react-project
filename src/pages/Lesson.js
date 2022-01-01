import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import classes from "./Lesson.module.css";
import SideBar from "../components/Lesson/SideBar";
import LessonDisplay from "../components/Lesson/LessonDisplay";

const Lesson = () => {
  const params = useParams();
  const [lesson, setLesson] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLessonData() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3000/api/v1/lessons/${params.lessonId}`);

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

  if (lesson.nil) {
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
      <SideBar title={lesson.title} status={status} />
      <LessonDisplay text={lesson.text} status={status} />
    </div>
  );
};

export default Lesson;
