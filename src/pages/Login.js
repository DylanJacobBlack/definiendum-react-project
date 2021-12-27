import Form from "../components/UI/Form";
import classes from "./Forms.module.css";

const Login = () => {
  return (
    <Form>
      <form className={classes.controls}>
        <div className={classes.control}>
          <label>Email</label>
          <input type="text" />
        </div>
        <div className={classes.control}>
          <label>Password</label>
          <input type="password" />
        </div>
        <button type="˝submit">Login</button>
      </form>
    </Form>
  );
};

export default Login;
