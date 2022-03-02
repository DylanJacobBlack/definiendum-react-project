import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

// import AuthContext from "../store/auth-context";
import LangContext from "../store/lang-context";

import classes from "./Lessons.module.css";
import LessonCard from "../components/Lessons/LessonCard";
import loadingSpinner from "../assets/spinner.jpg";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const authCtx = useContext(AuthContext);
  // const isLoggedIn = authCtx.isLoggedIn;
  const langCtx = useContext(LangContext);
  const history = useHistory();

  useEffect(() => {
    langCtx.enable();
  }, [langCtx]);

  useEffect(() => {
    if (langCtx.language !== null) {
      (async function () {
        try {
          setIsLoading(true);
          setError(null);
          const response = await fetch(
            "http://localhost:3000/api/v1/lessons"
          );

          if (!response.ok) {
            throw new Error("Something went wrong.");
          }
          const data = await response.json();
          const filteredLessons = data.lessons.filter(
            (lesson) => lesson.language.name === langCtx.language
          );
          setLessons(filteredLessons);
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
      })();
    } else (
      history.push("/")
    )
  }, [langCtx.language, history]);

  let status = "";

  if (error) {
    status = error;
  }

  return (
    <div className={classes.lessons}>
      {isLoading && (
        <div className="spinner-container">
          <img className="spinner" src={loadingSpinner} alt="Loading spinner" />
        </div>
      )}
      {status !== "" && (
        <div className={classes["status-container"]}>
          <div className={classes.message}>
            <h1>{status}</h1>
          </div>
        </div>
      )}
      {!isLoading &&
        langCtx.language !== null &&
        lessons.length > 0 &&
        lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            id={lesson.id}
            title={lesson.title}
            text={lesson.text}
            level={lesson.diff_lev}
            url={lesson.url}
          />
        ))}
    </div>
  );
};

export default Lessons;
