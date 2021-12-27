import { Link } from "react-router-dom";

import classes from "./LessonCard.module.css";
import dummyPic from "./card-left.jpg";
import Card from "../UI/Card";

const Lesson = (props) => {
  return (
    <Card className={classes.lesson}>
      <Link to="/lessons/test">
        <img src={dummyPic} alt="dummy-pic" />
      </Link>
      <div className={classes.info}>
        <h2>{props.title}</h2>
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
