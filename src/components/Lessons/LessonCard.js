import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

import classes from "./LessonCard.module.css";

const Lesson = (props) => {
  const truncate = () => {
    if (props.text?.length > 500) {
      return `${props.text.substr(0, props.text.lastIndexOf(" ", 500))}...`;
    }
    return props.text;
  };

  const getLevel = (level) => {
    if (level === "1") {
      return "Newbie";
    }
    if (level === "2") {
      return "Beginner";
    }
    if (level === "3") {
      return "Intermediate";
    }
    if (level === "4") {
      return "Proficient";
    }
    if (level === "5") {
      return "Advanced";
    }
    if (level === "6") {
      return "Technical";
    }
  };

  return (
    <div className={classes.lesson}>
      <Link to={`/lessons/${props.id}`}>
        <Image
          cloudName="dqlx6iqqt"
          publicId="https://res.cloudinary.com/dqlx6iqqt/image/upload/v1642902680/development/18ahxq2hrhcohrfetnmh7m9e1215.jpg"
        />
        <h3 className={`${classes.level} ${classes[`level${props.level}`]}`}>
          {getLevel(props.level)}
        </h3>
      </Link>
      <Link to={`/lessons/${props.id}`}>
        <div className={classes.info}>
          <h3>{props.title}</h3>
          <p className={classes.description}>{truncate(props.text)}</p>
        </div>
      </Link>
    </div>
  );
};

export default Lesson;
