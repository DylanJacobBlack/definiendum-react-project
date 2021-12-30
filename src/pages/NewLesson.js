import { useRef } from "react";

import Form from "../components/UI/Form";
import classes from "./Forms.module.css";

const NewLesson = (props) => {
  const titleInputRef = useRef();
  const textInputRef = useRef();

  const submitLessonHandler = (event) => {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value
    const enteredText = textInputRef.current.value

    props.onAddLesson(enteredTitle, enteredText);
  };

  return (
    <Form>
      <form onSubmit={submitLessonHandler} className={classes.controls}>
        <div className={classes.control}>
          <label>Title</label>
          <input id="title" type="text" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label>Text</label>
          <textarea id="text" type="text" ref={textInputRef} />
        </div>
        <button type="˝submit">Save Lesson</button>
      </form>
    </Form>
  );
};

export default NewLesson;
