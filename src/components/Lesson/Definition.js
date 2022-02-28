import { useContext } from "react";

import AuthContext from "../../store/auth-context";

import Modal from "../UI/Modal";
import classes from "./Definition.module.css";
import loadingSpinner from "../../assets/spinner.jpg";

const Definition = (props) => {
  const authCtx = useContext(AuthContext);

  const addWordHandler = (event) => {
    (async function () {
      try {
        const response = await fetch("http://localhost:3000/api/v1/words", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: props.phrase,
            translation: props.translation,
            known: "1",
            language: "",
            home_language: "en",
          }),
        });
        if (!response.ok) console.log("Authentication failed.");
      } catch (error) {
        console.log(error);
      }
    })();
  };

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
        <button className={classes.btn} onClick={addWordHandler}>
          Add to dictionary
        </button>
      </div>
    </Modal>
  );
};

export default Definition;
