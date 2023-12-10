import { useRef, useState } from "react";
import { useEffect } from "react/cjs/react.production.min";
import Button from "./Button";
import "./ImageInput.css";

const ImageInput = function (props) {
  const imageInputRef = useRef();
  const [imgUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [isTouched, setIsTouched] = useState(false);

  const isFileInputInvalid = isTouched && !!file;

  function imagePickHandler(event) {
    event.preventDefault();

    imageInputRef.current.click();
  }

  function imageInputBlurHandler() {
    setIsTouched(true);
  }

  function imageInputChangeHandler() {
    if (
      !imageInputRef.current.files ||
      imageInputRef.current.files.length !== 1
    )
      return;
    const uploadedImage = imageInputRef.current.files[0];
    props.onImageUpload(uploadedImage);
    setFile(uploadedImage);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.onload = function () {
      setImageUrl(fileReader.result);
    };

    fileReader.onerror = function () {
      setFile(null);
    };
  }

  return (
    <div className="image-input--container">
      <div className="image-input--element">
        <input
          ref={imageInputRef}
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={imageInputChangeHandler}
        />
      </div>
      <div className="image-preview--container">
        <div className="preview-image">
          {imgUrl ? (
            <img src={imgUrl} alt="Preview Image" />
          ) : (
            <div className="image-text">Your Image will appear here</div>
          )}
        </div>
        <Button className="image-picker--btn" onClick={imagePickHandler}>
          PICK ME
        </Button>
      </div>
    </div>
  );
};

export default ImageInput;
