import classes from "./Form.module.css";

const Form = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.form}>{props.children}</div>
    </div>
  );
};

export default Form;
