import AuthCard from "../../shared/components/ui/AuthCard";
import Button from "../../shared/components/ui/Button";
import Input from "../../shared/components/ui/Input";
import "./SignIn.css";
import "../../index.css";
import { useState, useEffect, useContext } from "react";
import authContext from "../../store/authContext";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validator";
import useInput from "../../shared/hooks/use-input";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import Backdrop from "../../shared/components/ui/Backdrop";
import Modal from "../../shared/components/ui/Modal";
import { useNavigate } from "react-router-dom";
import useHttp from "../../shared/hooks/use-http";
import ImageInput from "../../shared/components/ui/ImageInput";

const SignIn = function () {
  const { loggingInHandler } = useContext(authContext);
  const [isLoading, backendError, sendHttpRequest, clearError] = useHttp();
  const [openModal, setOpenModal] = useState(false);
  const [onLogInPage, setOnLogInPage] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const {
    inputValue: nameValue,
    isInputValid: isNameInputInvalid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    errObj: nameErrorObj,
    setErrObj: setNameErrorObj,
    setInputValue: setNameValue,
    reinitializeInput: reinitializeName,
  } = useInput([VALIDATOR_REQUIRE()], "name");

  const {
    inputValue: emailValue,
    isInputValid: isEmailInputInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    errObj: emailErrorObj,
    setErrObj: setEmailErrorObj,
    setInputValue: setEmailValue,
    reinitializeInput: reinitializeEmail,
  } = useInput([VALIDATOR_REQUIRE()], "email");

  const {
    inputValue: passwordValue,
    isInputValid: isPasswordInputInvalid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    errObj: passwordErrorObj,
    setErrObj: setPasswordErrorObj,
    setInputValue: setPasswordValue,
    reinitializeInput: reinitializePassword,
  } = useInput([VALIDATOR_MINLENGTH(4)], "password");

  const {
    inputValue: cnfPasswordValue,
    isInputValid: isCnfPasswordInputInvalid,
    inputChangeHandler: cnfPasswordChangeHandler,
    inputBlurHandler: cnfPasswordBlurHandler,
    errObj: cnfPasswordErrorObj,
    setErrObj: setCnfPasswordErrorObj,
    setInputValue: setCnfPasswordValue,
    reinitializeInput: reinitializeCnfPassword,
  } = useInput([VALIDATOR_REQUIRE()], "cnfpassword");

  useEffect(() => {
    if (!backendError) return;
    const obj = {
      name: setNameErrorObj,
      email: setEmailErrorObj,
      password: setPasswordErrorObj,
      cnfpassword: setCnfPasswordErrorObj,
    };
    const { formValidationErrors = {} } = backendError;
    for (let inputName in formValidationErrors) {
      if (obj[inputName])
        obj[inputName]({ [inputName]: formValidationErrors[inputName].msg });
    }
  }, [backendError]); // only when httperror changes, should the backend errors of input be set for each of them. And the http error will change only when form is submitted..otherwise frontend error validation will take over

  function switchSignInPageHandler(event) {
    if (
      (event.target.value.toLowerCase() === "signin" && onLogInPage) ||
      (event.target.value.toLowerCase() === "signup" && !onLogInPage)
    )
      return;
    //We may click on Sign In even after being on Sign In page or Sign Up even after being on Sign Up, so that click should not trigger switching mode
    if (event.target.value.toLowerCase() === "signin") setOnLogInPage(true);
    else if (event.target.value.toLowerCase() === "signup") {
      reinitializeName();
      reinitializeCnfPassword();
      setOnLogInPage(false);
    }
    clearError();
    reinitializeEmail();
    reinitializePassword();
    setNameErrorObj({ name: "" });
    setCnfPasswordErrorObj({ "confirm password": "" });
  }

  function closeModalHandler() {
    setOpenModal(false);
    setOnLogInPage(true);
    clearError();
  }

  function loggingInAndRedirectHandler(userID, token) {
    loggingInHandler(userID, token);
    navigate("/api/users");
  }

  async function onSignInHandler(event) {
    event.preventDefault();
    const receivedUserData = {
      email: emailValue,
      password: passwordValue,
    };
    sendHttpRequest(
      "http://localhost:5000/api/users/signin",
      "POST",
      receivedUserData,
      {
        "Content-Type": "application/json",
      }
    )
      .then((responseData) =>
        loggingInAndRedirectHandler(responseData.data, responseData.token)
      )
      .catch((err) => {});
  }

  function onSignUpHandler(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.set("name", nameValue);
    formData.set("email", emailValue);
    formData.set("password", passwordValue);
    formData.set("cnfpassword", cnfPasswordValue);
    formData.set("userImage", imageFile);

    sendHttpRequest("http://localhost:5000/api/users/signup", "POST", formData)
      .then(() => setOpenModal(true))
      .catch((err) => {});
  }

  const successfulSignUpModal = (
    <Modal
      modalHeader="SIGN UP SUCCESSFUL"
      modalFooter={
        <Button className="okay-btn" onClick={closeModalHandler}>
          Okay
        </Button>
      }
    >
      You Are Ready To Sign In...
    </Modal>
  );

  return (
    <AuthCard className="auth-card-container-2">
      {isLoading && <Backdrop />}
      {isLoading && <LoadingSpinner />}
      {!isLoading && openModal && <Backdrop onClick={closeModalHandler} />}
      {!isLoading && openModal && successfulSignUpModal}

      <h3>Please Log In To Continue</h3>
      <div className="lower-border" />
      <div className="top-auth-links" onClick={switchSignInPageHandler}>
        <Button
          className={"signin-link" + (onLogInPage ? " auth-link-active" : "")}
          value="signin"
        >
          Sign In
        </Button>
        <Button
          className={"signup-link" + (onLogInPage ? "" : " auth-link-active")}
          value="signup"
        >
          Sign Up
        </Button>
      </div>
      <form className="signin-form">
        {backendError && (
          <div className="err-msg-container">{backendError.message}</div>
        )}
        {!onLogInPage && (
          <Input
            id="name"
            type="text"
            label="Name"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            errorMsg={nameErrorObj["name"]}
          />
        )}
        {!onLogInPage && <ImageInput onImageUpload={setImageFile} />}
        <Input
          id="email"
          type="email"
          label="E-Mail"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          errorMsg={emailErrorObj["email"]}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          errorMsg={passwordErrorObj["password"]}
        />
        {!onLogInPage && (
          <Input
            id="cnfpassword"
            type="password"
            label="Confirm Password"
            value={cnfPasswordValue}
            onChange={cnfPasswordChangeHandler}
            onBlur={cnfPasswordBlurHandler}
            errorMsg={cnfPasswordErrorObj["cnfpassword"]}
          />
        )}
        <Button
          className="signin-btn"
          onClick={onLogInPage ? onSignInHandler : onSignUpHandler}
        >{`${onLogInPage ? "SIGN IN" : "SIGN UP"}`}</Button>
      </form>
    </AuthCard>
  );
};

export default SignIn;
