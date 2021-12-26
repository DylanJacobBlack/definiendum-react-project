import classes from "./SideBar.module.css";
import dummyPic from "../Lessons/card-left.jpg";

const SideBar = () => {
  return (
    <div class={classes.sidebar}>
      <div class={classes["lesson-pic"]}><img src={dummyPic} alt="dummy-pic" /></div>
      <h3>Title Goes Here</h3>
    </div>
  );
};

export default SideBar;
