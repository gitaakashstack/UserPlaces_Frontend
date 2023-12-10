import "./Input.css";

const Input = function (props) {
  const {
    type,
    id,
    label,
    element,
    rows,
    cols,
    onChange,
    onBlur,
    value = "",
    errorMsg,
  } = props;
  const inputElement =
    element === "textarea" ? (
      <textarea
        id={id}
        rows={rows ? rows : "4"}
        cols={cols ? cols : "50"}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    ) : (
      <input
        type={type}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    );

  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      {inputElement}
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
};

export default Input;
