import Form from "../components/UI/Form";
import classes from "./Forms.module.css";

const NewLesson = () => {
  return (
    <Form>
      <form className={classes.controls}>
        <div className={classes.control}>
          <label>Title</label>
          <input type="text" />
        </div>
        <div className={classes.control}>
          <label>Text</label>
          <textarea type="text" />
        </div>
        <button type="˝submit">Save Lesson</button>
      </form>
    </Form>
  );
};

export default NewLesson;
