import { useRef, useState } from "react";

import Form from "../components/UI/Form";
import classes from "./NewLesson.module.css";

const NewLesson = (props) => {
  const titleInputRef = useRef();
  const textInputRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);
  const [formTouched, setFormTouched] = useState(false)
  const [enteredTitleBlurred, setEnteredTitleBlurred] = useState(false);
  const [enteredTextBlurred, setEnteredTextBlurred] = useState(false);

  const submitLessonHandler = (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredText = textInputRef.current.value;

    if (enteredTitle.trim() === "" || enteredText.trim() === "") {
      setFormIsValid(false);
      return;
    }

    props.onAddLesson(enteredTitle, enteredText);
  };

  const onBlurHandler = (event) => {
    if (event.target.id === "title") {
      setFormTouched(true);
      setEnteredTitleBlurred(true);
    }
    if (event.target.id === "text") {
      setFormTouched(true);
      setEnteredTextBlurred(true);
    }
  };

  const onFocusHandler = (event) => {
    setFormIsValid(true);
  }

  return (
    <Form>
      <form onSubmit={submitLessonHandler} className={classes.controls}>
        <div className={classes.control}>
          <label>Title</label>
          <input
            id="title"
            type="text"
            ref={titleInputRef}
            className={(!formIsValid && enteredTitleBlurred) ? classes.invalid : ''}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
          />
        </div>
        <div className={classes.control}>
          <label>Text</label>
          <textarea
            id="text"
            type="text"
            ref={textInputRef}
            className={(!formIsValid && enteredTextBlurred) ? classes.invalid : ''}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
          />
        </div>
        <button type="˝submit">Save Lesson</button>
        {!formIsValid && formTouched && (
          <p className={classes.warning}>
            Please enter all the required information.
          </p>
        )}
      </form>
    </Form>
  );
};

export default NewLesson;
