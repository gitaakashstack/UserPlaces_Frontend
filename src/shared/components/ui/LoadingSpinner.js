import { createPortal } from "react-dom";
import "./LoadingSpinner.css";

const LoadingSpinner = function () {
  const loadingSpinnerJSX = (
    <main className="loading-spinner">
      <div className="circle-container">
        <div className="circle"></div>
      </div>
      <div className="circle-container">
        <div className="circle"></div>
      </div>
      <div className="circle-container">
        <div className="circle"></div>
      </div>
      <div className="circle-container">
        <div className="circle"></div>
      </div>
      <div className="circle-container">
        <div className="circle"></div>
      </div>
      <div className="circle-container">
        <div className="circle"></div>
      </div>
      <div className="circle-container">
        <div className="circle"></div>
      </div>
      <div className="circle-container">
        <div className="circle"></div>
      </div>
    </main>
  );
  return createPortal(loadingSpinnerJSX, document.body);
};

export default LoadingSpinner;
