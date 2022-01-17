import Modal from "../UI/Modal";
import classes from "./Definition.module.css";
import loadingSpinner from "../../assets/spinner.jpg";

const Definition = (props) => {
  console.log(props.isLoading);
  return (
    <Modal onHide={props.onHide}>
      <div className={classes.translation}>
        <div>
          {props.isLoading && (
            <img src={loadingSpinner} alt="loading spinner" />
          )}
          <div>Phrase: {props.phrase}</div>
          <div>Definition: {props.translation}</div>
        </div>
      </div>
    </Modal>
  );
};

export default Definition;
