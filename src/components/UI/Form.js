import classes from "./Form.module.css";

const Form = (props) => {
  return (
    <div class={classes.container}>
      <div class={classes.form}>{props.children}</div>
    </div>
  );
};

export default Form;
