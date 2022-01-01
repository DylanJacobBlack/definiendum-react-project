import { useState, useEffect } from "react";

import classes from "./LessonDisplay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const LessonDisplay = (props) => {
  const [lessonPages, setLessonPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (props.isLoading === false && props.status === "") {
      setLessonPages(props.text.split("."));
    }
  }, [props.text, props.isLoading, props.status]);

  const pageBackHandler = (event) => {
    console.log("hello")
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const pageForwardHandler = (event) => {
    console.log("hello");
    if (currentPage < lessonPages.length -1 ) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={classes.lesson}>
      <button className={classes.button} onClick={pageBackHandler}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className={classes.page}>
        {!props.isLoading &&
          props.status === "" &&
          lessonPages !== null &&
          lessonPages[currentPage]}
      </div>
      <button className={classes.button} onClick={pageForwardHandler}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default LessonDisplay;
