import Backdrop from "./Backdrop";
import Button from "./Button";
import Modal from "./Modal";

const ErrorModal = function (props) {
  return (
    <>
      <Backdrop />
      <Modal
        modalHeader="Error"
        modalFooter={
          <Button className="okay-btn" onClick={props.onClick}>
            Okay
          </Button>
        }
      >
        {props.children}
      </Modal>
    </>
  );
};

export default ErrorModal;
