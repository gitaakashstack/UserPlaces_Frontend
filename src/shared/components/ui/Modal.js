import { createPortal } from "react-dom";
import "./Modal.css";

const Modal = function (props) {
  const modalJSX = (
    <div className="modal-content">
      <header className="modal-header">{props.modalHeader}</header>
      <p className="modal-text">{props.children}</p>
      <footer className="modal-footer">{props.modalFooter}</footer>
    </div>
  );

  return createPortal(modalJSX, document.body);
};

export default Modal;
