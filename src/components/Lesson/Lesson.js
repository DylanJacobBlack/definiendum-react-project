import classes from "../Lessons/Lesson.module.css";
import dummyPic from "../Lessons/card-left.jpg";
import Card from "../UI/Card";

const Lesson = () => {
  return (
    <Card className={classes.lesson}>
      <img src={dummyPic} alt="dummy-pic" />
      <div className={classes.info}>
        <h2>Lesson Title</h2>
        <p>This is the real lesson page.</p>
      </div>
    </Card>
  );
};

export default Lesson;
