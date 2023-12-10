import "./Backdrop.css";
import ReactDOM from "react-dom";

const Backdrop = function (props) {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.body
  );
};

export default Backdrop;
