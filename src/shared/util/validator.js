const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";

const EMAIL_REGEX = /./; //for time being

const ERROR_OBJECT = {
  title: null,
  description: null,
  address: null,
  name: null,
};

const checkRequireValidity = (val) => val.trim().length > 0;
const checkMinLengthValidity = (val, minlen) => val.trim().length >= minlen;
const checkMaxLengthValidity = (val, maxlen) => val.trim().length <= maxlen;
const checkMinValueValidity = (val, minval) => +val >= minval;
const checkMaxValueValidity = (val, maxval) => +val <= maxval;
const checkEmailValidity = (val) => EMAIL_REGEX.test(val);

export const VALIDATOR_REQUIRE = () => ({
  type: VALIDATOR_TYPE_REQUIRE,
  validationCheck: checkRequireValidity,
  errMsg: " cannot be left empty",
});
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
  validationCheck: checkMinLengthValidity,
  errMsg: ` must be at least ${val} characters long`,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
  validationCheck: checkMaxLengthValidity,
  errMsg: ` cannot be more than ${val} characters long`,
});
export const VALIDATOR_MIN = (val) => ({
  type: VALIDATOR_TYPE_MIN,
  val: val,
  validationCheck: checkMinValueValidity,
});
export const VALIDATOR_MAX = (val) => ({
  type: VALIDATOR_TYPE_MAX,
  val: val,
  validationCheck: checkMaxValueValidity,
});
export const VALIDATOR_EMAIL = () => ({
  type: VALIDATOR_TYPE_EMAIL,
  validationCheck: checkEmailValidity,
});

export const validate = (inputValue, validators, inputName) => {
  let isValid = true;
  let errMsg = "";
  for (const validator of validators) {
    isValid = isValid && validator.validationCheck(inputValue, validator.val);
    if (!isValid) {
      errMsg =
        inputName[0].toUpperCase() + inputName.slice(1) + validator.errMsg;
      break;
    }
  }
  //Keeping the format of error object same as .mapped version of express validator
  return { [inputName]: errMsg };
};
