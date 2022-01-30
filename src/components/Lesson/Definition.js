import Modal from "../UI/Modal";
import classes from "./Definition.module.css";
import loadingSpinner from "../../assets/spinner.jpg";

const Definition = (props) => {
  return (
    <Modal onHide={props.onHide} topClick={props.topClick}>
      <div className={classes.translation}>
        <div>
          {props.isLoading && (
            <img class="spinner" src={loadingSpinner} alt="loading spinner" />
          )}
          {!props.isLoading && <div>Phrase: {props.phrase}</div>}
          {!props.isLoading && <div>Definition: {props.translation}</div>}
        </div>
      </div>
    </Modal>
  );
};

export default Definition;
