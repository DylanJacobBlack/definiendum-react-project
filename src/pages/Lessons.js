import { useState, useEffect, useContext } from "react";

import AuthContext from "../store/auth-context";
import classes from "./Lessons.module.css";
import LessonCard from "../components/Lessons/LessonCard";
import loadingSpinner from "../assets/spinner.jpg";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  useEffect(() => {
    if (isLoggedIn) {
      (async function () {
        try {
          setIsLoading(true);
          setError(null);
          const response = await fetch(
            "https://definiens-api.herokuapp.com/api/v1/lessons"
          );

          if (!response.ok) {
            throw new Error("Something went wrong.");
          }
          const data = await response.json();
          setLessons(data.lessons);
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
      })();
    }
  }, [isLoggedIn]);

  let status = "";

  if (error) {
    status = error;
  }

  return (
    <div className={classes.lessons}>
      {status !== "" && <h1>{status}</h1>}
      {isLoading && (
        <img className="spinner" src={loadingSpinner} alt="Loading spinner" />
      )}
      {!isLoading &&
        lessons.length > 0 &&
        lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            id={lesson.id}
            title={lesson.title}
            text={lesson.text}
            level={lesson.diff_lev}
          />
        ))}
    </div>
  );
};

export default Lessons;
