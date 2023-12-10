import { CSSTransition } from "react-transition-group";
import { useContext, useState, useEffect } from "react";
import Button from "../../shared/components/ui/Button";
import Input from "../../shared/components/ui/Input";
import useHttp from "../../shared/hooks/use-http";
import useInput from "../../shared/hooks/use-input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validator";
import authContext from "../../store/authContext";
import "./AddPlaceForm.css";
import { useNavigate } from "react-router-dom";
import Backdrop from "../../shared/components/ui/Backdrop";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import ImageInput from "../../shared/components/ui/ImageInput";

const AddPlaceForm = function () {
  const [isLoading, backendError, sendHttpRequest] = useHttp();
  const { userID, token } = useContext(authContext);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const {
    inputValue: titleValue,
    isInputValid: isTitleInputInvalid,
    inputChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    errObj: titleErrorObj,
    setErrObj: setTitleErrObj,
  } = useInput([VALIDATOR_REQUIRE()], "title");

  const {
    inputValue: descriptionValue,
    isInputValid: isDescriptionInputInvalid,
    inputChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    errObj: descriptionErrorObj,
    setErrObj: setDescriptionErrObj,
  } = useInput([VALIDATOR_MAXLENGTH(200)], "description");

  const {
    inputValue: addressValue,
    isInputValid: isAddressInputInvalid,
    inputChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    errObj: addressErrorObj,
    setErrObj: setAddressErrObj,
  } = useInput([VALIDATOR_REQUIRE()], "address");

  let isFormInvalid =
    isTitleInputInvalid || isDescriptionInputInvalid || isAddressInputInvalid;
  console.log(titleErrorObj);
  useEffect(() => {
    if (!backendError) return;
    const obj = {
      title: setTitleErrObj,
      description: setDescriptionErrObj,
      address: setAddressErrObj,
    };
    const { formValidationErrors = {} } = backendError;

    for (let inputName in formValidationErrors) {
      if (obj[inputName])
        obj[inputName]({ [inputName]: formValidationErrors[inputName].msg });
    }
  }, [backendError]); // only when backendError changes, should the backend errors of input be set for each of them. And the http error will change only when form is submitted..otherwise frontend error validation will take over

  function addPlaceHandler(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.set("title", titleValue);
    formData.set("description", descriptionValue);
    formData.set("address", addressValue);
    formData.set("creator", userID);
    formData.set("placeImage", imageFile);

    sendHttpRequest("http://localhost:5000/api/places", "POST", formData, {
      Authorization: "Bearer " + token,
    })
      .then((responseData) => navigate(`user/${userID}`))
      .catch(() => {});
  }
  return (
    <>
      {isLoading && <Backdrop />}
      {isLoading && <LoadingSpinner />}

      <form className="add-place-form" onSubmit={addPlaceHandler}>
        <div className="all-inputs-wrapper">
          <Input
            type="text"
            id="title"
            label="Title"
            value={titleValue}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            errorMsg={titleErrorObj["title"]}
          ></Input>
          <Input
            element="textarea"
            id="description"
            label="Description"
            value={descriptionValue}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            errorMsg={descriptionErrorObj["description"]}
          ></Input>
          <Input
            type="text"
            id="address"
            label="Address"
            value={addressValue}
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
            errorMsg={addressErrorObj["address"]}
          ></Input>
        </div>
        <ImageInput onImageUpload={setImageFile} />
        <Button className="add-place-btn">ADD PLACE</Button>
      </form>
    </>
  );
};

export default AddPlaceForm;

/*
        <div className="warning-msg-container">
          <CSSTransition
            in={isFormInvalid}
            timeout={400}
            classNames="warning_block"
            mountOnEnter
            unmountOnExit
          >
            <p className="warning-msg">
              {titleErrorMsg || descriptionErrorMsg || addressErrorMsg}
            </p>
          </CSSTransition>
        </div>
*/
