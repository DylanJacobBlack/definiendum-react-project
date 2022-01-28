import { useRef, useState } from "react";

import Form from "../components/UI/Form";
import classes from "./NewLesson.module.css";

// import AuthContext from "../store/auth-context";

const NewLesson = (props) => {
  // const authCtx = useContext(AuthContext);
  
  const titleInputRef = useRef();
  const textInputRef = useRef();
  const levelInputRef = useRef();
  const pictureInputRef = useRef();
  // const audioInputRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const [enteredTitleBlurred, setEnteredTitleBlurred] = useState(false);
  const [enteredTextBlurred, setEnteredTextBlurred] = useState(false);
  const [picture, setPicture] = useState(null);

  const submitLessonHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    const enteredTitle = titleInputRef.current.value.trim();
    const enteredText = textInputRef.current.value.trim();
    const enteredLevel = levelInputRef.current.value;

    formData.append("lesson[title]", enteredTitle);
    formData.append("lesson[text]", enteredText);
    formData.append("lesson[diff_lev]", enteredLevel);
    formData.append("lesson[picture]", picture);
    formData.append("lesson[user_id]", 4);
    formData.append("lesson[language_id]", 6);

    console.log(...formData.entries());

    if (enteredTitle === "" || enteredText === "") {
      setFormIsValid(false);
      return;
    }

    props.onAddLesson(formData);
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
  };

  const fileSelectedHandler = (event) => {
    setPicture(event.target.files[0]);
    console.log(picture);
  };

  return (
    <Form>
      <form onSubmit={submitLessonHandler} className={classes.controls}>
        <div className={classes.control}>
          <label>Title</label>
          <input
            id="title"
            type="text"
            ref={titleInputRef}
            className={
              !formIsValid && enteredTitleBlurred ? classes.invalid : ""
            }
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            name="title"
          />
        </div>
        <div className={classes.collapsable}>
          <div>
            <div className={classes.control}>
              <label>Language</label>
              <select
                id="language"
                type="text"
                className={
                  !formIsValid && enteredTitleBlurred ? classes.invalid : ""
                }
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                name="language"
              >
                {/* <option value="chinese">Chinese</option> */}
                <option value="english">English</option>
                {/* <option value="french">French</option>
                <option value="german">German</option>
                <option value="spanish">Spansih</option> */}
              </select>
            </div>
            <div className={classes.control}>
              <label>Difficulty</label>
              <select
                id="language"
                type="text"
                className={
                  !formIsValid && enteredTitleBlurred ? classes.invalid : ""
                }
                ref={levelInputRef}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                name="language"
              >
                <option value="1">Newbie</option>
                <option value="2">Beginner</option>
                <option value="3">Intermediate</option>
                <option value="4">Proficient</option>
                <option value="5">Advanced</option>
                <option value="6">Technical</option>
              </select>
            </div>
          </div>
          <div>
            <div className={classes.control}>
              <label>Picture</label>
              <input
                id="picture"
                type="file"
                ref={pictureInputRef}
                // className={(!formIsValid && enteredTextBlurred) ? classes.invalid : ''}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                onChange={fileSelectedHandler}
                name="picture"
              />
            </div>
            {/* <div className={classes.control}>
              <label>Audio</label>
              <input
                id="audio"
                type="file"
                ref={audioInputRef}
                className={
                  !formIsValid && enteredTextBlurred ? classes.invalid : ""
                }
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
              />
            </div> */}
          </div>
        </div>
        <div className={classes.control}>
          <label>Text</label>
          <textarea
            id="text"
            type="text"
            ref={textInputRef}
            className={
              !formIsValid && enteredTextBlurred ? classes.invalid : ""
            }
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            name="text"
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
