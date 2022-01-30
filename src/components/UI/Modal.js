import { Fragment } from "react";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHide} />;
};

const ModalOverlay = (props) => { 
  return (
    <div className={`${classes.modal} ${props.topClick && classes["top-click"]}`}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop onHide={props.onHide} />
      <ModalOverlay topClick={props.topClick}>{props.children}</ModalOverlay>
    </Fragment>
  );
};

export default Modal;
