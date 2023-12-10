import { useState, useCallback, useEffect } from "react";

import { validate } from "../util/validator";

function useInput(validators, inputName, inputDefaultValue = "") {
  const [inputValue, setInputValue] = useState(inputDefaultValue);
  const [isTouched, setIsTouched] = useState(false);
  const [errObj, setErrObj] = useState({ [inputName]: "" });

  console.log(inputValue, inputName);
  //let errObj = {};

  const isInputInvalid = isTouched && !!errObj[inputName];

  const inputChangeHandler = useCallback((e) => {
    setInputValue(e.target.value);
    //setErrorMsgHandler();
  });
  const inputBlurHandler = useCallback(() => {
    setIsTouched(true);
    console.log("touched");
  });
  const reinitializeInput = () => {
    setInputValue(inputDefaultValue);
    setIsTouched(false);
    setErrObj({ [inputName]: "" });
  };

  useEffect(() => {
    if (isTouched) {
      setErrObj(validate(inputValue, validators, inputName));
      // errorMsg = errObj[inputName];
    }
  }, [isTouched, inputValue]);

  return {
    inputValue,
    isInputInvalid,
    inputChangeHandler,
    inputBlurHandler,
    errObj,
    setErrObj,
    setInputValue,
    reinitializeInput,
  };
}

export default useInput;
