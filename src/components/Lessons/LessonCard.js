import { Link } from "react-router-dom";

import classes from "./LessonCard.module.css";
import dummyPic from "./card-left.jpg";
import Card from "../UI/Card";

const Lesson = (props) => {
  const truncate = () => {
    if (props.text?.length > 150) {
    return `${props.text.substr(0, props.text.lastIndexOf(' ', 150))}...`;
    }
    return props.text
  };

  return (
    <Card className={classes.lesson}>
      <Link to={`/lessons/${props.id}`}>
        <img src={dummyPic} alt="dummy-pic" />
      </Link>
      <Link to={`/lessons/${props.id}`}>
        <div className={classes.info}>
          <h3>{props.title}</h3>
          <p>{truncate(props.text)}</p>
        </div>
      </Link>
    </Card>
  );
};

export default Lesson;
