import classes from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={classes.welcome}>
      <div className={classes.header} alt="girl reading"></div>
      <div className={classes["text-box"]}>
        <h2 className={classes.slogan1}>Learn languages</h2>
        <h2 className={classes.slogan2}>the easy way</h2>
      </div>
    </div>
  );
};

export default Welcome;
