import classes from "./Lesson.module.css";
import dummyPic from './card-left.jpg'
import Card from '../UI/Card'


const Lesson = () => {
  return (
    <Card className={classes.lesson}>
      <img src={dummyPic} alt="dummy-pic" />
      <div className={classes.info}>
        <h2>Lesson Title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
    </Card>
  );
};

export default Lesson;
