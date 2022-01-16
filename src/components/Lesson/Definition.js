import Modal from "../UI/Modal";

const Definition = (props) => {
  return <Modal onHide={props.onHide}>{props.translation}</Modal>;
};

export default Definition;
