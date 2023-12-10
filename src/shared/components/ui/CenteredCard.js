import "./CenteredCard.css";

const CenteredCard = function (props) {
  return (
    <div className="center-container">
      <p className="center">{props.children}</p>
    </div>
  );
};

export default CenteredCard;
