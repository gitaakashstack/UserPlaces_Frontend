import "./AuthCard.css";

const AuthCard = function (props) {
  const combinedClassName = props.className
    ? props.className + " " + "auth-card-container"
    : "auth-card-container";
  return <div className={combinedClassName}>{props.children}</div>;
};

export default AuthCard;
