import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import Button from "../../shared/components/ui/Button";
import Input from "../../shared/components/ui/Input";
import useInput from "../../shared/hooks/use-input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validator";
import "./AddPlaceForm.css";

const UpdatePlaceForm = function (props) {
  let { backendError } = props;

  let {
    inputValue: titleValue,
    isInputValid: isTitleInputInvalid,
    inputChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    errObj: titleErrorObj,
    setErrObj: setTitleErrObj,
  } = useInput([VALIDATOR_REQUIRE()], "title", props.oldFormData.title);

  let {
    inputValue: descriptionValue,
    isInputValid: isDescriptionInputInvalid,
    inputChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    errObj: descriptionErrorObj,
    setErrObj: setDescriptionErrObj,
  } = useInput(
    [VALIDATOR_REQUIRE()],
    "description",
    props.oldFormData.description
  );

  console.log(titleErrorObj, descriptionErrorObj, "in update place form");

  useEffect(() => {
    if (!backendError) return;

    const obj = {
      title: setTitleErrObj,
      description: setDescriptionErrObj,
    };
    const { formValidationErrors = {} } = backendError;
    for (let inputName in formValidationErrors) {
      if (obj[inputName])
        obj[inputName]({ [inputName]: formValidationErrors[inputName].msg });
    }
    console.log("in use effect");
  }, [backendError]);

  const isFormInvalid = isTitleInputInvalid || isDescriptionInputInvalid;

  function sendUpdatedPlaceData(event) {
    event.preventDefault();

    props.updatePlaceHandler({
      title: titleValue,
      description: descriptionValue,
    });
  }

  return (
    <form className="add-place-form" onSubmit={sendUpdatedPlaceData}>
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
      </div>
      <Button className="add-place-btn">UPDATE PLACE</Button>
    </form>
  );
};

export default UpdatePlaceForm;
