import classes from "./SideBar.module.css";
import dummyPic from "../Lessons/card-left.jpg";

const SideBar = (props) => {
  return (
    <div className={classes.sidebar}>
      <div className={classes["lesson-pic"]}>
        <img src={dummyPic} alt="dummy-pic" />
      </div>
      <h3>{props.title}</h3>
    </div>
  );
};

export default SideBar;
